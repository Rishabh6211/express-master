const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ViewSchema = new Schema({
		userId:{
  			type:Schema.Types.ObjectId,
			ref: 'users'
	  	},
	  	centerId:{
	  		type:Schema.Types.ObjectId,
			ref: 'centers'
	  	},
	  	isView:{
  			type:'boolean',
  			defaultsTo:true
  		},
		created: {
			type: Date,
			default: Date.now
		}
	});

var viewObj = mongoose.model('views', ViewSchema);
module.exports = viewObj;