const express = require("express");
const router = express.Router();
const discussionPostsController = require("../controllers/discussionPostsController");

// GET request for list of all discussion posts
router.get("/discussions/allDiscussionPosts", discussionPostsController.allDiscussionPosts);

// // POST request for creating a discussion post
router.post("/discussions/", discussionPostsController.createDiscussionPost);

// // GET request for retrieving a discussion post
// router.get("/discussions/:_id", discussionPostsController.getDiscussionPost);

// // PUT request for updating a discussion post
// router.put("/discussions/:_id", discussionPostsController.updateDiscussionPost);

module.exports = router;
