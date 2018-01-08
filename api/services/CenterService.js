/**
 * CentersService
 *
 * @author      :: Rishabh Gupta
 * @description :: Server-side logic for Save Centers
 */
import centerObj from '../models/Center';

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
	} 
}