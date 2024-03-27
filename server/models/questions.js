// Question Document Schema

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var questionsSchema = new Schema({
    title: { type: String, required: true },
    summary: { type: String, required: true },
    text: { type: String, required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: "tagModel" }],
    answers: [{ type: Schema.Types.ObjectId, ref: "answerModel" }],
    asked_by: { type: String, required: true },
    ask_date_time: { type: Date, default: Date.now },
    views: { type: Number, default: 0 },
    comments: [{ type: Schema.Types.ObjectId, ref: "commentModel" }],
    votes: { type: Number, default: 0 },
});

questionsSchema.virtual("url").get(function () {
    return `posts/question/_id`;
});

module.exports = mongoose.model("questionModel", questionsSchema);
