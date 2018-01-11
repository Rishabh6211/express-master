/**
 * StateController
 *
 * @description :: Server-side logic for managing Category
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
import categoryObj from '../models/Category';
module.exports = {
	findCategory : (req,res) =>
	{
	  	categoryObj.find({}).then((category) =>
	  	{
	  		if(!category)
	  		{
	  			res.status(400).json({"message":"data not found"})
	  		}
	  		else
	  		{
	  			res.status(200).json({"data":category})
	  		}
	  	}).catch((err) => {res.json(err)})
	}
};

