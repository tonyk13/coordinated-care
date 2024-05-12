const express = require("express");
const router = express.Router();
const discussionPostsController = require("../controllers/discussionPostsController");

// GET request for list of all discussion posts
router.get("/discussions/allDiscussionPosts", discussionPostsController.allDiscussionPosts);

// POST request for creating a discussion post
router.post("/discussions/", discussionPostsController.createDiscussionPost);

// POST request for adding a comment to a discussion post
router.post("/discussions/:_id/addComment", discussionPostsController.addComment);

module.exports = router;
