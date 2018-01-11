/**
 * StateController
 *
 * @description :: Server-side logic for managing states
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
import stateObj from '../models/State';
module.exports = {

	
	  findStates : (req,res) =>
	  {
	  	stateObj.find({}).then((states) =>
	  	{
	  		if(!states)
	  		{
	  			res.status(400).json({"message":"data not found"})
	  		}
	  		else
	  		{
	  			res.status(200).json({"data":states})
	  			
	  		}
	  	}).catch((err) => {res.json(err.toString())})
	  }
};

