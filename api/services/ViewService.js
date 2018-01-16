/**
 * ViewService
 *
 * @author      :: Rishabh Gupta
 * @description :: Server-side logic for managing View for centers

 */
import viewObj from '../models/View';

module.exports = {

	profileView: (req,res) => {
		let data = {};
		data.centerId = req.param('centerId');
		data.userId = req.param('userId');
		viewObj.find({centerId:data.centerId}).then((result)=> {
			if(!result){
				res.status(400).json({"message":"data not found"})
			}
			else{
				viewObj.findOne({centerId:data.centerId,userId:data.userId}).then((result1) => {
					if(!result1 || result1 == undefined){
						viewObj(data).save(data).then((viewers) =>{
							if(!viewers){
			       			res.json("Something went wrong")
			       			}else{
			           		res.json({"data":result.length, status:200, "message":"Successfully View"})
			       			}
						})
					}
					else{
						res.status(200).json({"message":"already view","data":result.length})
					}
				})
			}
		})

	}
}