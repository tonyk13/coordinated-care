const { response } = require("express");
const User = require("../models/users");
const questionsModel = require("../models/questions");
const answersModel = require("../models/answers");
const tagsModel = require("../models/tags");
const commentsModel = require("../models/comments");
const bcrypt = require("bcryptjs");

module.exports.CreateAccount = async (req, res, next) => {
    try {
        const {
            email,
            username,
            passwordHash,
            passwordHashVerification,
            createdAt,
            reputation,
            questions,
            answers,
            comments,
        } = req.body;

        if (!email) {
            return res.json({ message: "Email is required", success: false });
        }
        if (!username) {
            return res.json({ message: "Username is required", success: false });
        }
        if (!passwordHash) {
            return res.json({ message: "Password is required", success: false });
        }
        if (passwordHash.includes(username) || passwordHash.includes(email)) {
            return res.json({ message: "Password cannot contain username or email", success: false });
        }
        if (passwordHashVerification !== passwordHash) {
            return res.json({ message: "Passwords do not match", success: false });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ message: "User account with this email already exists" });
        }
        const user = await User.create({
            email,
            username,
            passwordHash,
            createdAt,
            reputation,
            questions,
            answers,
            comments,
        });
        res.cookie("loggedInUser", user._id, {});
        res.status(201).json({
            message: "User signed in successfully",
            success: true,
            user,
        });
        next();
    } catch (error) {
        console.error(error);
    }
};

module.exports.Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            return res.json({ message: "Email is required", success: false });
        }
        if (!password) {
            return res.json({ message: "Password is required", success: false });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: "There is no account registered with this email", success: false });
        }
        const auth = await bcrypt.compare(password, user.passwordHash);
        if (!auth) {
            return res.json({ message: "Incorrect password", success: false });
        }

        res.cookie("loggedInUser", user._id, {
            httpOnly: false,
            secure: false,
            sameSite: "none",
            domain: "localhost:3000",
            path: "/",
        });

        res.status(201).json({
            message: user.username,
            _id: user._id,
            success: true,
        });

        next();
    } catch (error) {
        console.error(error);
    }
};

module.exports.Logout = async (req, res) => {
    try {
        res.clearCookie("loggedInUser");
        res.status(201).json({ message: "Logged out successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error during logout", success: false });
    }
};

module.exports.LoggedIn = async (req, res) => {
    try {
        const loggedInUserID = req.cookies.loggedInUser;

        if (loggedInUserID) {
            return res.json({ status: true, message: "User is logged in", loggedInUserID });
        } else {
            return res.json({ status: false, message: "User is not logged in" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports.getUsername = async (req, res) => {
    const objectIdString = req.params._id;
    const response = await User.findById(objectIdString);
    const username = response.username;
    return res.json({ username });
};

module.exports.getUserReputation = async (req, res) => {
    const objectIdString = req.params._id;
    const response = await User.findById(objectIdString);
    const reputation = response.reputation;
    return res.json({ reputation });
};

module.exports.getUserDateCreated = async (req, res) => {
    const objectIdString = req.params._id;
    const response = await User.findById(objectIdString);
    const userDateCreated = response.createdAt;
    return res.json({ userDateCreated });
};

module.exports.postQuestiontoUser = async (req, res) => {
    const objectIdString = req.params._id;
    try {
        const responseUser = await User.findById(objectIdString);
        if (!responseUser) {
            return res.status(404).json({ message: "User not found" });
        }
        responseUser.questions.push(req.body._id);
        await responseUser.save();
        return res.status(200).json({ message: "Post Question to User Succesful" });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports.getUserQuestions = async (req, res) => {
    const objectIdString = req.params._id;
    const response = await User.findById(objectIdString);
    const userQuestions = response.questions;
    return res.json({ userQuestions });
};

/*
1) Delete Question from User
2) 
    a) Delete All question's answer from answer model
    b) Delete all answers from users answers array
3) 
    a) Delete All question's comments from model
    b) Delete all comments from users comments array
4) Delete Question from Model
5) 
    a) Check if tag is being used by other questions, if not delete tag
    b) Delete tag from users tag array

*/

module.exports.deleteQuestionFromUser = async (req, res) => {
    const userId = req.params._id;
    const questionId = req.params._qid;
    try {
        const question = await questionsModel.findById(questionId);
        if (!question) {
            return res.status(404).json({ message: "User not found" });
        }
        // #1
        const user = await User.findOneAndUpdate({ _id: userId }, { $pull: { questions: questionId } }, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        //#2
        for (const ansId of question.answers) {
            //#2a
            await answersModel.findByIdAndDelete(ansId);

            //#2b
            await User.updateMany({ answers: ansId }, { $pull: { answers: ansId } });
        }

        //#3
        for (const comId of question.comments) {
            //#3a
            await commentsModel.findByIdAndDelete(comId);

            //#3b
            await User.updateMany({ comments: comId }, { $pull: { comments: comId } });
        }

        //Save deletedQuestion Tags for later
        const deletedQuestionTags = question.tags;

        //#4
        await questionsModel.findByIdAndDelete(questionId);

        //#5
        for (const tagId of deletedQuestionTags) {
            //#5a
            const questionWithTagCheck = await questionsModel.findOne({ tags: tagId });
            if (!questionWithTagCheck) {
                await tagsModel.findByIdAndDelete(tagId);
                await User.findOneAndUpdate({ _id: userId }, { $pull: { tags: tagId } }, { new: true });
            }

            //#5b
            for (const qid of user.questions) {
                const userQuestionsWithTagsCheck = await questionsModel.findOne({
                    tags: tagId,
                    asked_by: user.username,
                });

                if (!userQuestionsWithTagsCheck) {
                    User.findOneAndUpdate({ _id: userId }, { $pull: { tags: tagId } }, { new: true });
                }
            }
        }
        res.status(200).json({ message: "Deletion successful" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports.postTagtoUser = async (req, res) => {
    const objectIdString = req.params._id;
    try {
        const responseUser = await User.findById(objectIdString);
        if (!responseUser) {
            return res.status(404).json({ message: "User not found" });
        }
        responseUser.tags.push(req.body._id);
        await responseUser.save();
        return res.status(200).json({ message: "Post Tags to User Succesful" });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports.getUserTags = async (req, res) => {
    const objectIdString = req.params._id;
    const response = await User.findById(objectIdString);
    const userTags = response.tags;
    return res.json({ userTags });
};

module.exports.deleteTagFromUser = async (req, res) => {
    const userId = req.params._id;
    const tagId = req.params._tid;
    try {
        const user = await User.findOneAndUpdate({ _id: userId }, { $pull: { tags: tagId } }, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "Question removed from user successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports.postAnswerToUser = async (req, res) => {
    const userId = req.params._id;
    try {
        const user = await User.findById(userId);
        const ansId = req.body._id;

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.answers.push(ansId);
        await user.save();

        return res.status(200).json({ message: "Post Answer to User Successful" });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports.getUserAnswers = async (req, res) => {
    const objectIdString = req.params._id;
    const response = await User.findById(objectIdString);
    const userAnswers = response.answers;
    return res.json({ userAnswers });
};

module.exports.getUserIsAdmin = async (req, res) => {
    const objectIdString = req.params._id;
    const response = await User.findById(objectIdString);
    const isAdmin = response.isAdmin;
    return res.json({ isAdmin });
};

module.exports.getAllUsers = async (req, res) => {
    const objectIdString = req.params._id;
    try {
        const response = await User.findById(objectIdString);
        const isAdmin = response.isAdmin;
        if (!isAdmin) {
            return res.status(200).json({ message: "User not recognized as Admin" });
        }
        const allUsers = await User.find();
        return res.json({ users: allUsers });
    } catch {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports.deleteUser = async (req, res) => {
    try {
        const objectIdString = req.params._id;
        await User.findByIdAndDelete(objectIdString);
    } catch {
        return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.status(200).json({ message: "Succesfully Deleted User" });
};
