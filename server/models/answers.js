// Answer Document Schema

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var answerSchema = new Schema({
    text: { type: String, required: true },
    ans_by: { type: String, required: true },
    ans_date_time: { type: Date, default: Date.now },
    question: { type: Schema.Types.ObjectId, ref: "questionModel" },
    comments: [{ type: Schema.Types.ObjectId, ref: "commentModel" }],
    votes: { type: Number, default: 0 },
});

answerSchema.virtual("url").get(function () {
    return `posts/answer/_id`;
});

module.exports = mongoose.model("answerModel", answerSchema);
