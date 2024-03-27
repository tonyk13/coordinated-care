// Comment Document Schema

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var commentSchema = new Schema({
    text: { type: String, required: true },
    author: { type: String, required: true },
    votes: { type: Number, default: 0 },
    time: { type: Date, default: Date.now },
    question: { type: Schema.Types.ObjectId, ref: "questionModel" },
    answer: { type: Schema.Types.ObjectId, ref: "answerModel" },
});

// answerSchema.virtual("url").get(function () {
//     return `posts/answer/_id`;
// });

module.exports = mongoose.model("commentModel", commentSchema);
