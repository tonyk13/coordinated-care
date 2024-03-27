const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/commentsController");

// PUT request to upvote a comment
router.put("/comments/:commentId/users/:userId/upvote", commentsController.upvoteComment);

module.exports = router;
