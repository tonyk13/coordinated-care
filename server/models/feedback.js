const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
    summary: {
		type: String,
		required: true,
	},

	details: {
		type: String,
		required: true,
	},
	askedBy: {
		type: String,
        ref: 'Employee',
	},
	askedDate: {
		type: Date,
		default: Date.now,
	},
	isReviewed: {
		type: Boolean,
		default: false,
	},
});

const Feedback = mongoose.model("Feedback", FeedbackSchema);

module.exports = Feedback;