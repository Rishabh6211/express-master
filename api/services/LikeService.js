/**
 * UsersService
 *
 * @author      :: Rishabh Gupta
 * @description :: Server-side logic for managing Like for centers

 */
import likeObj from '../models/Like';
var FCM = require('fcm-push');

var serverKey = 'AIzaSyDadfRO4w2kulYNEwI03zXOAI1nxsYsvhs';
var fcm = new FCM(serverKey);

var message = {
    to: 'csLTs_MhpLg:APA91bGakF8EUhL0L970DPQByKtDgu3SNfK3_-iJThnGJRnAivRlCySjT-54bM57RVcvDUfs5fUT-fO0I9aAY5b7EisaC4hzO3NaAX3hYZqNfto5EekZoLKKpGBifIAea3EQ3hucA9XE', // required fill with device token or topics
    notification: {
        title: 'Fitness24',
        body: 'hello someone liked your profile'
    }
};
module.exports = {

    profileLike :(req,res) =>{
	let json = {}
	 json.userId = req.body.userId;
	 json.centerId = req.body.centerId;
	
	if(json.userId && json.centerId){
		likeObj.findOne(json)
		.then(likeProduct=>{
			if(likeProduct){

				if(likeProduct.isLiked == false){
						likeObj.update({userId:json.userId, centerId:json.centerId},{isLiked:true})
						.then(success=>{
							res.status(200).json({"message":"successfully like"})
						})
				}else{
					likeObj.update({userId:json.userId, centerId:json.centerId},{isLiked:false})
						.then(success=>{
							res.status(200).json({"message":"successfully dislike"})
						})
				}

				}
			else{
				 likeObj.create(json)
				 .then(success=>{
				 	fcm.send(message).then(function(response){
				 			res.status(200).json({"message":"successfully like"})
					        console.log("Successfully sent with response: ", response);
					}).catch(function(err){
					        console.log("Something has gone wrong!");
					        console.error(err);
					})
					//res.status(200).json({"message":"successfully like"})
				    
				 })
			}
			
		}).catch((err) => {res.status(500).json({"message":"Something went wrong with server", "error":err.toString()})})

	}// end if
	else{
			let message = "product id or user id is missing"
    		console.log("message",message);
		}

	},

	getLike : (req, res) => {

		let centerId = req.param('centerId'); 
		console.log("centerId",centerId);

			likeObj.find({centerId: centerId, isLiked:true}).then((data)=>{
				console.log("data",data);
				if(!data){
					res.status(404).json({"message":"Data not found"})
				}else {
					console.log("else");
					likeObj.findOne({centerId: centerId}).then((result) => {
						console.log("result",result);
						if(!result){
							res.status(404).json({"message":"Data not found"})
						}else if(result.isLiked===true){
							res.status(200).json({"message":"already like","count":data.length})
						}else if(result.isLiked===false){
							res.status(200).json({"message":"already dislike","count":data.length})
						}else{
							res.status(400).json({"message":"bad request"});
						}

					}).catch((err) => {res.status(500).json({"message":"Something went wrong with server", "error":err.toString()})})
				}
			}).catch((err) => {res.status(500).json({"message":"Something went wrong with server", "error":err.toString()})})
			

	}

};