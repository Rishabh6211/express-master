/**
 * CentersService
 *
 * @author      :: Rishabh Gupta
 * @description :: Server-side logic for Save Centers
 */
import centerObj from '../models/Center';
import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport'; 
import mg from 'nodemailer-mailgun-transport';
const Users = require('../models/Users');
import formidable  from 'formidable';
import fs from 'fs';
/*var transport = nodemailer.createTransport(smtpTransport({
    service: "Gmail",
    host: 'smtp.gmail.com',
    sendmail: true,
    //port:557,
    auth: {
        user: "fitness24fitness@gmail.com",
        pass: "Fitness@123"
    }
}));*/
const auth = {    
	auth: {        
		api_key: 'key-84cf44b8353b57ee767ddde9a00a7096',        
		domain: 'sandboxd285cb114f714a2aa17b19203bf8bd22.mailgun.org'    
	}
};
var nodemailerMailgun = nodemailer.createTransport(mg(auth));		
module.exports = {
	SaveCenter: (req,res) => {
		let form = new formidable.IncomingForm();
		form.uploadDir = 'assets/images/center';
		form.keepExtensions = true;
		form.multiples = true;
		form.parse(req, function(err, fields, files) {
			let fileType = files.image.type.split('/').pop();
			let size 	 = files.image.size;
			if(fileType == 'jpg' || fileType == 'png' || fileType == 'jpeg')
			{

				if(size<= 1000000){
					let data	= {};
					data.name	 = fields.name;
					data.title	 = fields.title;
					data.detail	 = fields.detail;
					data.image	 = files.image.name;
					data.discount= fields.discount;
					data.location= fields.location;
					data.address = fields.address;
					data.category= fields.category;
					data.state	 = fields.state;
					data.city	 = fields.city;
					data.services= fields.services;
					data.phone	 = fields.phone;
					data.email	 = fields.email;
					data.fb		 = fields.fb;
					data.instaa	 = fields.instaa;
					data.youtube = fields.youtube;

					if(!data){
						res.status(400).json({"message":"Please enterd missing field"})
					}
					else{
						centerObj.findOne({email:data.email}).then((response) => {
							console.log("response",response)
							if(response){
								res.json({"message":"Center Already Register with this email if any error please contact us"})
							}
							else{
								centerObj(data).save(data).then((result)=>{
						       		if(!data){
						       			res.status(400).json("Something went wrong")
						       		}else{
						           		res.status(200).json({"data":result, "message":"Center Resiteration Successfully"})
						       		}
						       	}).catch((err) => {res.status(500).json({"message":"Something went wrong with server", "error":err.toString()})})
							}
						}).catch((err) => {res.status(500).json({"message":"Something went wrong with server", "error":err.toString()})})
					}
			   		
				}
				else{
					res.status(400).json({"message":"Image size is too large please upload below 15mb"})
				}
			}
			else{
				res.status(400).json({"message":"invalid file extension , Please Upload jpg,jpeg,png"})
			}
			
       	})  
	},
	GetCenter: (req,res) => {
		let state	 = req.body.state;
		let city 	 = req.body.city;
		let category = req.body.category;
		if(!city || typeof city == undefined){
   			res.status(400).json("City is Required")
       	}else if(!category || typeof category == undefined) {
       		res.status(400).json("Category is Required")
       	}else if(!state || typeof state == undefined) {
       		res.status(400).json("state is Required")
       	}else {
			centerObj.find({state:state, city:city, category:category}).then((data)=>{
				if(!data || data == undefined || data.length == 0)
				{
					res.status(404).json({"message":"Data not found"})
				}else {
					res.status(200).json({"data":data})
				}
			}).catch((err) => {res.status(500).json({"message":"Something went wrong with server", "error":err.toString()})})
		}
	},
	SearchCenter: (req,res) => {
		let search = req.query.search;
		let query = {};
		if (search) {
			query.$or = [ 	{ city: { $regex: search, '$options': 'i' } },
			 				{ name: { $regex: search, '$options': 'i' } } 
			 			];
		}
		let aggregateQuery = [{ $match: query }];
		console.log("aggregateQuery",aggregateQuery)
		centerObj.aggregate(aggregateQuery).then((data) =>{
			console.log("data",data)
			if(!data){
				res.status(404).json("Data not found")
			}else {
				res.status(200).json({"data":data})
			}
		}).catch((err) => {res.status(500).json({"message":"Something went wrong with server", "error":err.toString()})})
	},
	DisplayCenter : (req,res) =>{
		let centerId = req.param('centerId');
		if(!centerId || typeof centerId == undefined){
   			res.status(400).json("centerId is Required")
       	}else {
       		centerObj.find({_id:centerId}).then((data)=>{
       			if(!data || data == undefined || data.length == 0){
       				res.status(404).json({"message":"Detail not found"})
       			}else {
       				res.status(200).json({"data":data})
       			}
       		}).catch((err) => {res.status(500).json({"message":"Something went wrong with server", "error":err.toString()})})
       	}
	},
	ContactCenter: (req,res) => {
		var userId = req.body.userId
		var centerId = req.body.centerId;
		let mailOptions = {};
		
		if(!centerId || typeof centerId == undefined){
			res.status(400).json("Center Id is Required")
		}else if(!userId || typeof userId == undefined){
			res.status(400).json("User Id is Required")
		}
		else{
			Users.findOne({_id:userId}).then((result) => {
			
				if(!result || result == undefined || result.length == 0)
				{
					res.status(404).json({"message":"Data not found"})
				}
				else{

					centerObj.findOne({_id:centerId}).then((data)=>{
						
						if(!data || data == undefined || data.length == 0)
						{
						res.status(404).json({"message":"Data not found"})
						}else {

							 mailOptions={
					            from:"fitness24fitness@gmail.com",
					            to : data.email,
					            subject : "Fitness24",
					            html : "Name: "+result.username+"<br>Contact: "+result.phone+"<br>Email: "+result.email+"<br> He is a user of fitness24 and want to contact you.<br>Please Reply him"
		        			}

		        			nodemailerMailgun.sendMail(mailOptions, function (err, info) {

		        				if(err){
		        					res.status(400).json({"message":"Something went wrong with Email, Have you enterd wrong Email", "error":err.toString()})
		        				}
		        				else{
		        					console.log("info",info)
		        					res.status(200).json({"data":info, "message":"Your Contact Request Successfully Sent"})
		        				}
		        			})
						}
					}).catch((err) => {res.status(500).json({"message":"Something went wrong with server", "error":err.toString()})})

				}
			})
			
		}
	},
	ImageUpload : (req, res)  => {
        let form = new formidable.IncomingForm();
            form.uploadDir = 'assets/images/user';
        //form.uploadDir = baseUrl //set upload directory
        form.keepExtensions = true; //keep file extension
        form.multiples = true;
        form.parse(req, function(err, fields, files) {
            console.log("---------------------",files.image.name)
            console.log("fields-***********************",fields)
        let fileType = files.image.type.split('/').pop();
        	console.log("fileType",fileType);
		let size 	 = files.image.size;
		console.log("size",size);
		if(fileType == 'jpg' || fileType == 'png' || fileType == 'jpeg')
		{
			if(size<= 1000000){
		        let data	= {};
				data.name	 = fields.name;
				data.title	 = fields.title;
				data.detail	 = fields.detail;
				data.image	 = files.image.name;
				data.discount= fields.discount;
				data.location= fields.location;
				data.address = fields.address;
				data.category= fields.category;
				data.state	 = fields.state;
				data.city	 = fields.city;
				data.services= fields.services;
				data.phone	 = fields.phone;
				data.email	 = fields.email;
				data.fb		 = fields.fb;
				data.instaa	 = fields.instaa;
				data.youtube = fields.youtube;
				console.log("data",data);
			}
			else{
				res.status(400).json({"message":"file size 1 mb to 10mb"})
			}
		}		
		else{
			res.status(400).json({"message":"invalid file extension or file size 1 mb to 10mb , Please Upload jpg,jpeg,png"})
		}

        });
    }


}