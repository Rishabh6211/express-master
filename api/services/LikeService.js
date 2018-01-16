/**
 * UsersService
 *
 * @author      :: Rishabh Gupta
 * @description :: Server-side logic for managing Like for centers

 */
import likeObj from '../models/Like';
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
					res.status(200).json({"message":"successfully like"})
				    
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