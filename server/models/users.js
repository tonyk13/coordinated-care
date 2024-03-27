// User Document Schema

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

var userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    reputation: {
        type: Number,
        default: 0,
    },
    questions: [
        {
            type: Schema.Types.ObjectId,
            ref: "questionModel",
        },
    ],
    tags: [
        {
            type: Schema.Types.ObjectId,
            ref: "tagsModel",
        },
    ],
    answers: [
        {
            type: Schema.Types.ObjectId,
            ref: "answerModel",
        },
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "commentModel",
        },
    ],
    isAdmin: {
        type: Boolean,
        default: false,
    },
    upvotedQuestions: [
        {
            type: Schema.Types.ObjectId,
            ref: "questionModel",
        },
    ],
    downvotedQuestions: [
        {
            type: Schema.Types.ObjectId,
            ref: "questionModel",
        },
    ],
    upvotedAnswers: [
        {
            type: Schema.Types.ObjectId,
            ref: "answerModel",
        },
    ],
    downvotedAnswers: [
        {
            type: Schema.Types.ObjectId,
            ref: "answerModel",
        },
    ],
    upvotedComments: [
        {
            type: Schema.Types.ObjectId,
            ref: "commentModel",
        },
    ],
    downvotedComments: [
        {
            type: Schema.Types.ObjectId,
            ref: "commentModel",
        },
    ],
});

// userSchema.virtual("url").get(function () {
//     return `posts/answer/_id`;
// });

userSchema.path("questions").default([]);
userSchema.path("answers").default([]);
userSchema.path("comments").default([]);

userSchema.pre("save", async function (next) {
    if (this.isModified("passwordHash")) {
        this.passwordHash = await bcrypt.hash(this.passwordHash, 12);
    }
    next();
});

module.exports = mongoose.model("userModel", userSchema);
