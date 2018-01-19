/**
 * Users.js
 *
 * @author      :: Kamal Dolikay
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @email       :: kamaldolikay@gmail.com
 */

const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

const Users = new Schema({
		username: {
			type: String,
			required: true
		},
		name:{
			type: String,
			required: true
		},
		hashedPassword: {
			type: String,
			required: true
		},
		salt: {
			type: String,
			required: true
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
		image:{
  			type: String,
  		},
		created: {
			type: Date,
			default: Date.now
		},
	  	roles: {
            type: String,
            enum: ['SA', 'A','U'],
            default: 'U'
            
        },
	  	isDeleted:{
	  		type: Boolean,
	  		default:false
	  	},
	  	isVerified: {
            type: String,
            enum: ['Y','N'],
            default: 'N'
        },
        code:{
        	type:String
        }
	});

Users.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.hashedPassword;
    delete obj.salt;
    delete obj.__v;
    return obj;
};

Users.methods.encryptPassword = function(password) {
return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
//more secure - return crypto.pbkdf2Sync(password, this.salt, 10000, 512).toString('hex');
};

Users.virtual('userId')
.get(function () {
return this.id;
});

Users.virtual('password')
.set(function(password) {
	this._plainPassword = password;
	this.salt = crypto.randomBytes(32).toString('hex');
			//more secure - this.salt = crypto.randomBytes(128).toString('hex');
			this.hashedPassword = this.encryptPassword(password);
		})
.get(function() { return this._plainPassword; });


Users.methods.checkPassword = function(password) {
return this.encryptPassword(password) === this.hashedPassword;
};

module.exports = mongoose.model('Users', Users, 'Users');
