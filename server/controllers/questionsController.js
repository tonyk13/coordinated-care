const questionModel = require("../models/questions");
const commentsModel = require("../models/comments");
const answersModel = require("../models/answers");
const tagsModel = require("../models/tags");
const usersModel = require("../models/users");

exports.questions_list = async (req, res, next) => {
    try {
        const questions = await questionModel.find().exec();

        res.json(questions);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

exports.question_create_post = async (req, res, next) => {
    try {
        const question = new questionModel(req.body);

        await question.save();

        return res.status(201).json(question);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.question_get = async (req, res, next) => {
    try {
        const question = await questionModel.findById(req.params._id).exec();

        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        res.json(question);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

exports.question_update = async (req, res) => {
    try {
        const questionId = req.params._id;
        const { title, summary, text, tags } = req.body;
        const questionBeforeEditing = await questionModel.findById(questionId);
        const questionTagsBeforeEditing = questionBeforeEditing.tags;
        const username = questionBeforeEditing.asked_by;
        const user = await usersModel.findOne({ username: username, questions: questionId });
        const userId = user._id;

        const updatedQuestion = await questionModel.findByIdAndUpdate(
            questionId,
            { title, summary, text, tags },
            { new: true }
        );
        console.log(user);
        //Fix DataBase of edited tags
        for (const tagId of questionTagsBeforeEditing) {
            const questionWithTagCheck = await questionModel.findOne({ tags: tagId });
            if (!questionWithTagCheck) {
                await tagsModel.findByIdAndDelete(tagId);
                await usersModel.findOneAndUpdate({ _id: userId }, { $pull: { tags: tagId } }, { new: true });
            }

            for (const qid of user.questions) {
                const userQuestionsWithTagsCheck = await questionModel.findOne({
                    tags: tagId,
                    asked_by: user.username,
                });

                if (!userQuestionsWithTagsCheck) {
                    usersModel.findOneAndUpdate({ _id: userId }, { $pull: { tags: tagId } }, { new: true });
                }
            }
        }

        if (!updatedQuestion) {
            return res.status(404).json({ message: "Question not found" });
        }

        res.json({ message: "Question updated successfully", updatedQuestion });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.question_upvote = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        const user = await usersModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.reputation < 50) {
            return res.json({ message: "Error: User's reputation is too low to vote (below 50)", success: false });
        }

        const questionId = req.params.questionId;

        const question = await questionModel.findById(questionId);

        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        correspondingUser = question.asked_by;
        console.log("Corresponding user: ", correspondingUser);

        const correspondingUserInModel = await usersModel.findOne({ username: correspondingUser });
        console.log("Corresponding user in model: ", correspondingUserInModel);

        const upvotedQuestionsInUser = user.upvotedQuestions;
        const containsGivenIdInUpvotedQuestions = upvotedQuestionsInUser.includes(req.params.questionId);

        if (containsGivenIdInUpvotedQuestions) {
            return res.json({ message: "Error: User has already upvoted this question", success: false });
        }

        const downvotedQuestionsInUser = user.downvotedQuestions;
        const containsGivenIdInDownvotedQuestions = downvotedQuestionsInUser.includes(req.params.questionId);

        if (containsGivenIdInDownvotedQuestions) {
            await usersModel.findByIdAndUpdate(
                userId,
                { $pull: { downvotedQuestions: req.params.questionId } },
                { new: true }
            );

            const question = await questionModel.findByIdAndUpdate(
                req.params.questionId,
                { $inc: { votes: 1 } },
                { new: true }
            );

            if (!question) {
                return res.status(404).json({ message: "Question not found" });
            }

            await usersModel.findByIdAndUpdate(
                correspondingUserInModel._id,
                { $inc: { reputation: 10 } },
                { new: true }
            );

            console.log("Corresponding user's new reputation: ", correspondingUserInModel.reputation);

            return res.json({ success: true });
        } else {
            await usersModel.findByIdAndUpdate(
                userId,
                { $addToSet: { upvotedQuestions: req.params.questionId } },
                { new: true }
            );

            const question = await questionModel.findByIdAndUpdate(
                req.params.questionId,
                { $inc: { votes: 1 } },
                { new: true }
            );

            if (!question) {
                return res.status(404).json({ message: "Question not found" });
            }

            await usersModel.findByIdAndUpdate(
                correspondingUserInModel._id,
                { $inc: { reputation: 5 } },
                { new: true }
            );

            console.log("Corresponding user's new reputation: ", correspondingUserInModel.reputation);

            return res.json({ success: true });
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

exports.question_downvote = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        const user = await usersModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.reputation < 50) {
            return res.json({ message: "Error: User's reputation is too low to vote (below 50)", success: false });
        }

        const questionId = req.params.questionId;

        const question = await questionModel.findById(questionId);

        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        correspondingUser = question.asked_by;

        const correspondingUserInModel = await usersModel.findOne({ username: correspondingUser });

        const downvotedQuestionsInUser = user.downvotedQuestions;
        const containsGivenIdInDownvotedQuestions = downvotedQuestionsInUser.includes(req.params.questionId);

        if (containsGivenIdInDownvotedQuestions) {
            return res.json({ message: "Error: User has already downvoted this question", success: false });
        }

        const upvotedQuestionsInUser = user.upvotedQuestions;
        const containsGivenIdInUpvotedQuestions = upvotedQuestionsInUser.includes(req.params.questionId);

        if (containsGivenIdInUpvotedQuestions) {
            await usersModel.findByIdAndUpdate(
                userId,
                { $pull: { upvotedQuestions: req.params.questionId } },
                { new: true }
            );

            const question = await questionModel.findByIdAndUpdate(
                req.params.questionId,
                { $inc: { votes: -1 } },
                { new: true }
            );

            if (!question) {
                return res.status(404).json({ message: "Question not found" });
            }

            await usersModel.findByIdAndUpdate(
                correspondingUserInModel._id,
                { $inc: { reputation: -5 } },
                { new: true }
            );

            console.log("Corresponding user's new reputation: ", correspondingUserInModel.reputation);

            return res.json({ success: true });
        } else {
            await usersModel.findByIdAndUpdate(
                userId,
                { $addToSet: { downvotedQuestions: req.params.questionId } },
                { new: true }
            );

            const question = await questionModel.findByIdAndUpdate(
                req.params.questionId,
                { $inc: { votes: -1 } },
                { new: true }
            );

            if (!question) {
                return res.status(404).json({ message: "Question not found" });
            }

            await usersModel.findByIdAndUpdate(
                correspondingUserInModel._id,
                { $inc: { reputation: -10 } },
                { new: true }
            );

            console.log("Corresponding user's new reputation: ", correspondingUserInModel.reputation);

            return res.json({ success: true });
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

exports.getQuestionVotes = async (req, res) => {
    const questionId = req.params._id;

    try {
        const question = await questionModel.findById(questionId);

        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        res.json({ votes: question.votes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getQuestionComments = async (req, res) => {
    try {
        const question = await questionModel.findById(req.params._id).exec();

        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        const commentsInQuestion = question.comments;

        const comments = await commentsModel.find({ _id: { $in: commentsInQuestion } }).exec();

        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.question_add_comment = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        const user = await usersModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.reputation < 50) {
            return res.json({
                message: "Error: User's reputation is too low to add a comment (below 50)",
                success: false,
            });
        }

        if (req.body.text.length > 140) {
            return res.json({ message: "Error: Comment must be less than 140 characters", success: false });
        }

        const comment = new commentsModel(req.body);

        const question = await questionModel.findById(req.params.questionId).exec();

        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        question.comments.push(comment._id);

        await comment.save();
        await question.save();

        return res.status(201).json({ comment, success: true });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.question_view_increment = async (req, res) => {
    try {
        const questionId = req.params._id;
        const question = await questionModel.findById(questionId);
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        question.views += 1;
        await question.save();
    } catch (error) {
        console.error("Error in question_view_increment:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
