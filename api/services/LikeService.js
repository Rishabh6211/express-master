/**
 * UsersService
 *
 * @author      :: Rishabh Gupta
 * @description :: Server-side logic for managing Like for centers

 */
import likeObj from '../models/Like';
import registerObj from '../models/registeration';
module.exports = {

    profileLike :(req,res) =>{
	let json = {}
	 json.userId = req.body.userId;
	 json.centerId = req.body.centerId;
	
	if(json.userId || json.centerId){
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
					message = "product id or user id is missing"
		    		console.log("message",message);
		}

}
};