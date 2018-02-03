/**
 * CentersService
 *
 * @author      :: Rishabh Gupta
 * @description :: Server-side logic for Save Centers
 */
import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport'; 
import trainerObj from '../models/Trainer';
const Users = require('../models/Users');
var transport = nodemailer.createTransport(smtpTransport({
    service: "Gmail",
    host: 'smtp.gmail.com',
    sendmail: true,
    auth: {
        user: "fitness24fitness@gmail.com",
        pass: "Fitness@123"
    }
}));
module.exports = {
	SaveTrainer: (req,res) => {
		let data	= {};
		data.name	 = req.body.name;
		data.title	 = req.body.title;
		data.image	 = req.body.image;
		data.address = req.body.address;
		data.category= req.body.category;
		data.state	 = req.body.state;
		data.city	 = req.body.city;
		data.phone	 = req.body.phone;
		data.email	 = req.body.email;
		data.fb		 = req.body.fb;
		data.instaa	 = req.body.instaa;
		data.youtube = req.body.youtube;
		data.lattitude = req.body.lattitude;
		data.longitude= req.body.longitude;

		if(!data.lattitude || typeof data.lattitude == undefined){
   			res.status(400).json("lattitude is Required")
       	}else if(!data.longitude || typeof data.longitude == undefined) {
       		res.status(400).json("lattitude is Required")
       	}else {
	   		trainerObj(data).save(data).then((data)=>{
	       		if(!data){
	       			res.status(400).json("Something went wrong")
	       		}else{
	           		res.status(200).json({"data":data, "message":"Center Resiteration Successfully"})
	       		}
	       	}).catch((err) => {res.status(500).json({"message":"Something went wrong with server", "error":err.toString()})})
       	}
	},
	GetTrainer: (req,res) => {
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
			trainerObj.find({state:state, city:city, category:category}).then((data)=>{
				if(!data || data == undefined || data.length == 0)
				{
					res.status(404).json({"message":"Data not found"})
				}else {
					res.status(200).json({"data":data})
				}
			}).catch((err) => {res.status(500).json({"message":"Something went wrong with server", "error":err.toString()})})
		}
	},
	SearchTrainer: (req,res) => {
		let search = req.query.search;
		let query = {};
		if (search) {
			query.$or = [ 	{ city: { $regex: search, '$options': 'i' } },
			 				{ name: { $regex: search, '$options': 'i' } } 
			 			];
		}
		let aggregateQuery = [{ $match: query }];
		console.log("aggregateQuery",aggregateQuery)
		trainerObj.aggregate(aggregateQuery).then((data) =>{
			console.log("data",data)
			if(!data){
				res.status(404).json("Data not found")
			}else {
				res.status(200).json({"data":data})
			}
		}).catch((err) => {res.status(500).json({"message":"Something went wrong with server", "error":err.toString()})})
	},
	contactTrainer: (req,res) => {
		var userId = req.body.userId
		var trainerId = req.body.trainerId;

		if(!trainerId || typeof trainerId == undefined){
			res.status(400).json("Traner Id is Required")
		}
		else{
			Users.find({_id:userId}).then((result) => {
				if(!result || result == undefined || result.length == 0)
				{
					res.status(404).json({"message":"Data not found"})
				}
				else{

					trainerObj.find({_id:trainerId}).then((data)=>{
						if(!data || data == undefined || data.length == 0)
						{
						res.status(404).json({"message":"Data not found"})
						}else {

							 mailOptions={
					            from:"fitness24fitness@gmail.com",
					            to : data.email,
					            subject : "Someone Wants to contact you",
					            html : "Name:"+result.name+"Contact:"+result.phone+"Email"+result.email+"<br> he is a user of fitness24 and want to contact you.<br>Please Reply him"
		        			}
						//res.status(200).json({"data":data})

						}
					}).catch((err) => {res.status(500).json({"message":"Something went wrong with server", "error":err.toString()})})

				}
			})
			
		}
	}
}