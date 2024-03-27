const express = require("express");
const router = express.Router();
const questionsController = require("../controllers/questionsController");

// GET request for list of all questions.
router.get("/questions", questionsController.questions_list);

// POST request for creating a question.
router.post("/questions/", questionsController.question_create_post);

// GET request for a question. (this might not be needed)
router.get("/questions/:_id", questionsController.question_get);

// PUT request for a question
router.put("/questions/:_id", questionsController.question_update);

// PUT request for upvoting a question.
router.put("/questions/:questionId/users/:userId/upvote", questionsController.question_upvote);

// PUT request for downvoting a question.
router.put("/questions/:questionId/users/:userId/downvote", questionsController.question_downvote);

// GET request for a question's number of votes.
router.get("/questions/:_id/votes", questionsController.getQuestionVotes);

// GET request for a question's list of comments.
router.get("/questions/:_id/comments", questionsController.getQuestionComments);

// POST request for adding a comment to a question.
router.post("/questions/:questionId/users/:userId/comments", questionsController.question_add_comment);

// PUT request for incrementing a questions views
router.put("/questions/:_id/views", questionsController.question_view_increment);

module.exports = router;
