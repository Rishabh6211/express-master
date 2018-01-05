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
       			res.json("Something went wrong")
       		}else{
           		res.json({"data":data, status:200, "message":"Center Resiteration Successfully"})
       		}
       	}).catch((err) => {res.json(err)})
       	  
	}
}