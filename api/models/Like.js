const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
		userId:{
  			type:Schema.Types.ObjectId,
			ref: 'users'
	  	},
	  	centerId:{
	  		type:Schema.Types.ObjectId,
			ref: 'centers'
	  	},
	  	isLiked:{
	  		type:'boolean',
	  		defaultsTo:true
	  	},
		created: {
			type: Date,
			default: Date.now
		}
	});

var likeObj = mongoose.model('likes', LikeSchema);
module.exports = likeObj;