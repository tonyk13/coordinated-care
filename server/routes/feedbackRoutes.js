const express = require("express");
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// GET request for list of all feedback
router.get("/feedback/all", feedbackController.all_feedback);

// Post route to add new feedback
router.post("/feedback", feedbackController.add_feedback);

// Route to update feedback as reviewed
router.patch("/feedback/:id/review", feedbackController.mark_feedback_reviewed);


module.exports = router;

