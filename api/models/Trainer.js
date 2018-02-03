
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrainorSchema = new Schema({
  name:{
		type: String,
		required:true
	},
  title:{
  	type: String,
  	required:true
  },
	image:{
		type: String,
		required:true
	},
	location:{
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
  lattitude:{
    type: Number, 
    required:true
  },
  longitude:{
    type: Number,
    required:true
  },
  created: {
  	type: Date,
  	default: Date.now
  }
});

var trainerObj = mongoose.model('trainers', TrainorSchema);
module.exports = trainerObj;