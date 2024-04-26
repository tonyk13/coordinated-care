const feedbackModel = require('../models/feedback');

exports.all_feedback = async (req, res, next) => {
    try {
		const feedbackList = await feedbackModel.find({});
        
        if (feedbackList.length === 0) {
            return res.status(200).json({ message: "No feedback found" });
        }
        

        res.status(200).json(feedbackList);

	} catch (error) {
		next(error);
	}
};

exports.add_feedback = async (req, res, next) => {
    try {
        const newFeedback = new feedbackModel({
            summary: req.body.summary,
            details: req.body.details,
            askedBy: req.body.askedBy,
            isReviewed: req.body.isReviewed || false 
        });

        const savedFeedback = await newFeedback.save();
        res.status(201).json(savedFeedback);
    } catch (error) {
        console.error("Error saving feedback:", {
            errorMessage: error.message,
            requestData: {
                summary: req.body.summary,
                details: req.body.details,
                askedBy: req.body.askedBy,
                isReviewed: req.body.isReviewed
            },
            errorStack: error.stack
        });
        next(error); 
    }
};

exports.mark_feedback_reviewed = async (req, res, next) => {
    try {
        const feedbackId = req.params.id;
        const reviewed = req.body.reviewed;
        const updatedFeedback = await feedbackModel.findByIdAndUpdate(
            feedbackId,
            { $set: { isReviewed: reviewed } },
            { new: true }  
        );

        if (!updatedFeedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }

        res.status(200).json(updatedFeedback);
    } catch (error) {
        next(error);  
    }
};

