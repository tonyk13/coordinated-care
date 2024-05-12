const discussionPostModel = require("../models/discussionPost");

exports.allDiscussionPosts = async (req, res, next) => {
	try {
		const posts = await discussionPostModel.find().populate("comments");

		console.log("Posts:", posts);

		res.status(200).json(posts);
	} catch (error) {
		next(error);
	}
};

exports.createDiscussionPost = async (req, res, next) => {
	try {
		const { title, summary, text, askedBy } = req.body;

		if (!title || !summary || !askedBy) {
			return res.status(400).json({ message: "Missing required fields: title, summary, and askedBy are required." });
		}

		const newPost = new discussionPostModel({
			title,
			summary,
			text,
			askedBy,
			comments: [],
		});

		await newPost.save();

		res.status(201).json(newPost);
	} catch (error) {
		res(error);
	}
};

exports.addComment = async (req, res, next) => {
	const postId = req.params._id;
	const { text, commentedBy } = req.body;

	if (!text || !commentedBy) {
		return res.status(400).json({ message: "Missing required comment fields: text and commentedBy" });
	}

	try {
		const post = await discussionPostModel.findById(postId);
		if (!post) {
			return res.status(404).json({ message: "Discussion post not found" });
		}

		const newComment = {
			text: text,
			commentedBy: commentedBy,
			commentDateTime: new Date(),
		};

		post.comments.push(newComment);

		await post.save();

		res.status(201).json({ message: "Comment added successfully", post });
	} catch (error) {
		console.error("Failed to add comment:", error);
		next(error);
	}
};
