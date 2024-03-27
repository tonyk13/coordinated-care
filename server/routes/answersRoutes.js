const express = require("express");
const router = express.Router();
const answersController = require("../controllers/answersController");

// POST request for creating an answer.
router.post("/questions/:_id/answers", answersController.answer_create_post);

// GET request for a question's list of answers.
router.get("/questions/:_id/answers", answersController.answer_list);

// POST request for adding a comment to an answer.
router.post("/questions/:questionId/answers/:answerId/users/:userId/comments", answersController.answer_add_comment);

// GET request for a specific answer.
router.get("/questions/:questionId/answers/:answerId", answersController.get_answer);

// GET request for an answer's commments.
router.get("/questions/:questionId/answers/:answerId/comments", answersController.get_answer_comments);

// PUT request for upvoting an answer.
router.put("/questions/:questionid/answers/:answerId/users/:userId/upvote", answersController.answer_upvote);

// PUT request for downvoting an answer.
router.put("/questions/:questionid/answers/:answerId/users/:userId/downvote", answersController.answer_downvote);

module.exports = router;
