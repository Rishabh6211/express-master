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
	  	stateObj.find({}).then((err,states) =>
	  	{
	  		if(err)
	  		{
	  			res.status(400).json(err)
	  			//res.json("Something went wrong",err)
	  		}
	  		else
	  		{
	  			res.status(200).json(states)
	  			//res.json({"data":states, status:200})
	  		}
	  	}).catch((err) => {res.json(err)})
	  }
};

