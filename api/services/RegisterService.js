/**
 * UsersService
 *
 * @author      :: Rishabh Gupta
 * @description :: Server-side logic for Register users
 */
import registerObj from '../models/registeration';
module.exports = {

    register: (req, res) => {
       let data = req.body;
       let email = req.body.email;
       	if(!email || typeof email == undefined){
       		res.json("Email is Required")
       	}else if(!data || data == undefined){
       		res.json("Something went Wrong to send data")
       	}else {
	       	registerObj.findOne({email:email}).then((response) => {
				if(response){
					res.json({"message":"Email Already Register ,Please Use Different Email"})
				}
				else{    
			       	registerObj(data).save(data).then((data)=>{
			       		if(!data){
			       			res.json("Something went wrong")
			       		}else{
			           		res.json({"data":data, status:200, "message":"Resiteration Successfully"})
			       		}
			       	}).catch((err) => {res.json(err)})
			    }
		    }).catch((err) => {res.json(err)})
		}
    },

    login: (req,res) => {
    	let data	  = {};
    	data.username = req.body.username;
    	data.email 	  =	req.body.email;
    	data.password = req.body.password;
    	if(!data || data == undefined){
    		res.json({"message":"Email and Password is Required "})
    	}else{
	    	registerObj.findOne(data).then((result) =>{
	    		if(result){
	    			console.log("Successfully Login")
	    			res.json({"data":result,"message":"Successfully Login"})
	    		}
	    		else{
	    			console.log("User is not Register")
	    			res.json({"message":"User is not Register"})
	    		}
	    	}).catch((err) => {res.json(err)})
	    }


    }
};