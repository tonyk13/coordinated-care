const commentsModel = require("../models/comments");
const usersModel = require("../models/users");

// PUT upvote a comment
exports.upvoteComment = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        const user = await usersModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const upvotedCommentsInUser = user.upvotedComments;
        const containsGivenIdInUpvotedComments = upvotedCommentsInUser.includes(req.params.commentId);

        if (containsGivenIdInUpvotedComments) {
            return res.json({ message: "Error: User has already upvoted this comment", success: false });
        }

        const downvotedCommentsInUser = user.downvotedComments;
        const containsGivenIdInDownvotedComments = downvotedCommentsInUser.includes(req.params.commentId);

        if (containsGivenIdInDownvotedComments) {
            await usersModel.findByIdAndUpdate(
                userId,
                { $pull: { downvotedComments: req.params.commentId } },
                { new: true }
            );

            const comment = await commentsModel.findByIdAndUpdate(
                req.params.commentId,
                { $inc: { votes: 1 } },
                { new: true }
            );

            if (!comment) {
                return res.status(404).json({ message: "Comment not found" });
            }

            return res.json({ success: true });
        } else {
            await usersModel.findByIdAndUpdate(
                userId,
                { $addToSet: { upvotedComments: req.params.commentId } },
                { new: true }
            );

            const comment = await commentsModel.findByIdAndUpdate(
                req.params.commentId,
                { $inc: { votes: 1 } },
                { new: true }
            );

            if (!comment) {
                return res.status(404).json({ message: "Comment not found" });
            }

            return res.json({ success: true });
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
};
