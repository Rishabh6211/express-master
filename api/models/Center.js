
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CenterSchema = new Schema({
		name:{
  			type: String,
  			required:true
  		},
	    title:{
	    	type: String,
	    	required:true
	    },
  		detail:{
  			type: String,
  			required:true
  		},
  		image:{
  			type: String,
  			required:true
  		},
  		discount:{
  			type: Number,
  			decimal:true,
  			required:true
  		},
  		location:{
  			type: String,
  			required:true
  		},
	    address:{
	        type: String,
	        required:true
	    },
	    category:{
	    	type: String
	    },
	    state:{
	    	type: String
	    },
	    city:{
	    	type: String
	    },
       	services:{
        	type: Array
       	},
       	phone:{
       		type: String
       	},
       	email:{
        	type: String
       	},
       	fb:{
       		type: String
       	},
       	instaa:{
       		type: String
       	},
       	youtube:{
       		type: String
       	},
		created: {
			type: Date,
			default: Date.now
		}
	});

var centerObj = mongoose.model('centers', CenterSchema);
module.exports = centerObj;