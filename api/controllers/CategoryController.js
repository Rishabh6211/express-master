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
	  	categoryObj.find({}).then((err,category) =>
	  	{
	  		if(err)
	  		{
	  			res.status(400).json(err)
	  		}
	  		else
	  		{
	  			res.status(200).json(category)
	  		}
	  	}).catch((err) => {res.json(err)})
	}
};

