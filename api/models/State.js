
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const State = new Schema({
		stateName: {
            type: String,
            required: true
        },
        districts: {
        	type: Array
        },
		created: {
			type: Date,
			default: Date.now
		}
	});

var stateObj = mongoose.model('states', State);
module.exports = stateObj;