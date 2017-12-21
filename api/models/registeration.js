
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegisterUsers = new Schema({
		username: {
			type: String,
			required:true
		},
		password: {
			type: String,
			required:true
		},
		email: {
			type:String,
			unique: true,
			required:true
		},
		age: {
			type:Number
		},
		phone: {
			type:Number
		},
		created: {
			type: Date,
			default: Date.now
		}
	});

var registerObj = mongoose.model('users', RegisterUsers);
module.exports = registerObj;