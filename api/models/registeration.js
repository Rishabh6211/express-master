
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegisterUsers = new Schema({
		username: {
			type: String,
			unique: true
		},
		Password: {
			type: String
		},
		email: {
			type:String
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