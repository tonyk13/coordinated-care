var mongoose = require("mongoose");

var Schema = mongoose.Schema;

const commentSchema = new Schema({
	text: { type: String, required: true },
	commentedBy: { type: String, required: true },
	commentDateTime: { type: Date, default: Date.now },
});

var DiscussionPostSchema = new Schema({
	title: { type: String, required: true },
	summary: { type: String, required: true },
	text: { type: String, required: false },
	askedBy: { type: String, required: true },
	askDateTime: { type: Date, default: Date.now },
	comments: [commentSchema],
});

const DiscussionPost = mongoose.model("DiscussionPost", DiscussionPostSchema);

module.exports = DiscussionPost;
