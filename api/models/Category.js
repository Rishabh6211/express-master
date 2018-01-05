
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema({
		categoryName: {
            type: String,
            required: true
        },
		created: {
			type: Date,
			default: Date.now
		}
	});

var categoryObj = mongoose.model('categorys', Category);
module.exports = categoryObj;