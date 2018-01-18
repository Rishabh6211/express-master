/**
 * UsersService
 *
 * @author      :: Rishabh Gupta
 * @description :: Server-side logic for Register users
 */
//import registerObj from '../models/registeration';
import  bcrypt from 'bcrypt-nodejs';
const Users = require('../models/Users');
const uuid = require('uuid');
const crypto = require('crypto');
import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';
import constant from '../../config/constant'

const auth = {    
  auth: {        
    api_key: constant.api_key,        
    domain:  constant.domain    
  }
};
var nodemailerMailgun = nodemailer.createTransport(mg(auth));
module.exports = {
/*---------------------------------------------
 * @Date:        2-01-18
 * @Method :     ADD User(post)
 * Created By:   Rishabh Gupta
 * Modified On:  -
 * @Purpose:     ADD User with verified mail
 * @using:       Mailgun for send verification link
----------------------------------------------*/
    register: (req, res) => {
      let rand=Math.floor((Math.random() * 100) + 54);
      let link="http://localhost:1337/verify?id="+rand;
      let mailOptions = {};
      let data				    = {};
      let salt     		    = uuid.v4();
      let hashedPassword  = crypto.createHmac('sha1', salt).update(req.body.password).digest('hex');
      data.name           = req.body.username
      data.username		    = req.body.email;
      data.hashedPassword = hashedPassword;
      data.salt			      = salt;
      data.email 			    = data.username;
      data.age				    = req.body.age;
      data.phone			    = req.body.phone;
      data.code           = rand;
       console.log ("data",data)
       	if(!data.email || typeof data.email == undefined){
       		res.json({"message":"Email is Required"})
       	}else if(!data || data == undefined){
       		res.json({"message":"Something went Wrong to send data"})
       	}else {
	       	Users.findOne({email:data.email}).then((response) => {
				if(response){
					res.json({"message":"Email Already Register ,Please Use Different Email"})
				}
				else{    
			       	Users(data).save(data).then((data)=>{
			       		if(!data){
			       			res.json({"message":"Something went wrong"})
			       		}else{
                   mailOptions={
                      from:constant.from,
                      to : data.email,
                      subject : "Fitness24 : Please confirm your account",
                      html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
                  }

                  nodemailerMailgun.sendMail(mailOptions, function (err, info) {

                    if(err){
                      res.status(400).json({"message":"Something went wrong with Email, Have you enterd wrong Email", "error":err.toString()})
                    }
                    else{
      
                      res.json({"data":data, status:200, "message":"Resiteration Successfully","message1":"Your verification request has been sent to your registerd Email Please Verify it"})
                    }
                  })
			           		
			       		}
			       	}).catch((err) => {res.json({"message":err.toString()})})
			    }
		    }).catch((err) => {res.json({"message":err.toString()})})
		  }
    },
/*---------------------------------------------
 * @Date:        17-01-18
 * @Method :     Verify User(post)
 * Created By:   Rishabh Gupta
 * Modified On:  -
 * @Purpose:     Verification of users
----------------------------------------------*/
    verify : (req,res) => {
  
        let code = req.param('id')
        Users.findOne({code:code}).then((data) =>
        {
          Users.update({code:code},{isVerified:'Y'}).then((data) =>
          {
              delete data.code;
              res.send("successfully verified");
          }).catch((err) => {res.json({"message":err.toString()})})
            
        }).catch((err) => {res.json({"message":err.toString()})})
        
    },
/*---------------------------------------------
 * @Date:        17-01-18
 * @Method :     Update User(put)
 * Created By:   Rishabh Gupta
 * Modified On:  -
 * @Purpose:     Update existing users
----------------------------------------------*/
    updateUser : (req,res) => {
      let Id = req.query.userId;

      let data   = {};
      data.$set = { 
                    name      : req.body.name,
                    email     : req.body.email,
                    age       : req.body.age,
                    phone     : req.body.phone                     
                  };

      if(!Id || typeof Id == undefined){
          res.json({"message":"User is Required"})
      }else{
          Users.findByIdAndUpdate(Id, data, {new:true}, (err,result) =>{
            if(err){
              res.status(400).json({"message":"data not updated", "error":err.toString()})
            }
            else{
              res.status(200).json({"message":"data successfully updated"})
            }
          })
      }
    },
/*---------------------------------------------
 * @Date:        18-01-18
 * @Method :     forgot password(post)
 * Created By:   Rishabh Gupta
 * Modified On:  -
 * @Purpose:     reset password Link send to users registerd mail
----------------------------------------------*/
    forgotPassword : (req,res) => {
      let email = req.body.email;
      let mailOptions = {};
      if(!email || typeof email == undefined){
        res.json({"message":"email is Required"})
      }
      else{
        Users.findOne({email:email}).then((data) => {
          if(!data){
            res.status(404).json({"message":"Email not found"})
          }
          else{
            let verifyURL = "http://localhost:1337/resetpassword?userId="+data.id;
            mailOptions={
                  from:constant.from,
                  to : data.email,
                  subject : "Fitness24 : Reset Password",
                  html : "Hello,<br> Please Click on the link to reset your password.<br><a href="+verifyURL+">Click here to Reset</a>"
              }

            nodemailerMailgun.sendMail(mailOptions, function (err, info) {

              if(err){
                res.status(400).json({"message":"Something went wrong with Email, Have you enterd wrong Email", "error":err.toString()})
              }
              else{

                res.status(200).json({"message":"Mail has been sent Successfully"})
              }
            })
          }
        }).catch((err) => {res.json({"message":err.toString()})})
      }

    },
/*---------------------------------------------
 * @Date:        18-01-18
 * @Method :     Reset password(put)
 * Created By:   Rishabh Gupta
 * Modified On:  -
 * @Purpose:     reset password of users
----------------------------------------------*/
    resetPassword:(req,res) => {
      let password = req.body.password;
      let confirmPassword = req.body.confirmPassword;
      if(!password || typeof password == undefined){
        res.status(400).json({"message":"Password is require"})
      }
      else if(!confirmPassword || typeof confirmPassword == undefined) {
        res.status(400).json({"message":"confirm password is require"})
      }
      else if(password !== confirmPassword){
        res.status(400).json({"message":"password and confirm Password does not match"})
      }
      else {
        let Id                = req.query.userId;
        let salt              = uuid.v4();
        let encryptedPassword = crypto.createHmac('sha1', salt).update(password).digest('hex');
        let data = { $set: { hashedPassword: encryptedPassword, salt: salt } };
        Users.findByIdAndUpdate(Id, data, {new:true}, (err,result) =>{
          if(err){
            res.status(400).json({"message":"Password not updated", "error":err.toString()})
          }
          else{
            res.status(200).json({"message":"Password successfully updated"})
          }
        })

      }
    }

};