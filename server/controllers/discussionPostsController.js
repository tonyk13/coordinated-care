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
