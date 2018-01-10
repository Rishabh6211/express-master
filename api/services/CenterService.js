/**
 * CentersService
 *
 * @author      :: Rishabh Gupta
 * @description :: Server-side logic for Save Centers
 */
import centerObj from '../models/Center';
import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport'; 
import registerObj from '../models/registeration';
var transport = nodemailer.createTransport(smtpTransport({
    service: "Gmail",
    host: 'smtp.gmail.com',
    sendmail: true,
    //port:557,*/
    auth: {
        user: "fitness24fitness@gmail.com",
        pass: "Fitness@123"
    }
}));

module.exports = {
	SaveCenter: (req,res) => {
		let data	= {};
		data.name	 = req.body.name;
		data.title	 = req.body.title;
		data.detail	 = req.body.detail;
		data.image	 = req.body.image;
		data.discount= req.body.discount;
		data.location= req.body.location;
		data.address = req.body.address;
		data.category= req.body.category;
		data.state	 = req.body.state;
		data.city	 = req.body.city;
		data.services= req.body.services;
		data.phone	 = req.body.phone;
		data.email	 = req.body.email;
		data.fb		 = req.body.fb;
		data.instaa	 = req.body.instaa;
		data.youtube = req.body.youtube;

   		centerObj(data).save(data).then((data)=>{
       		if(!data){
       			res.status(400).json("Something went wrong")
       		}else{
           		res.status(200).json({"data":data, "message":"Center Resiteration Successfully"})
       		}
       	}).catch((err) => {res.status(500).json({"message":"Something went wrong with server", "error":err.toString()})})
       	  
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
			registerObj.findOne({_id:userId}).then((result) => {
			
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
					            from:"dsvvian.rishabh@gmail.com",
					            to : data.email,
					            subject : "Someone Wants to contact you",
					            html : "Name:"+result.username+"Contact:"+result.phone+"Email"+result.email+"<br> he is a user of fitness24 and want to contact you.<br>Please Reply him"
		        			}

		        			transport.sendMail(mailOptions, function (err, info) {

		        				console.log("hello",err)
		        				if(err){
		        					res.status(400).json({"message":"Something went wrong with Email, Have you enterd wrong Email", "error":err.toString()})
		        				}
		        				else{
		        					console.log("info",info)
		        					res.status(200).json({"data":info, "message":"Your Contact Request Successfully Sent"})
		        				}
		        			})
		        			console.log("mailOptions",mailOptions)
		        		
		        			//console.log("info",info);
						//res.status(200).json({"data":data})

						}
					}).catch((err) => {res.status(500).json({"message":"Something went wrong with server", "error":err.toString()})})

				}
			})
			
		}
	}

}