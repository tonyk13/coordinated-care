const { response } = require("express");
const User = require("../models/users");
const questionsModel = require("../models/questions");
const answersModel = require("../models/answers");
const tagsModel = require("../models/tags");
const commentsModel = require("../models/comments");
const bcrypt = require("bcrypt");
const Employee = require('../models/employee');
const crypto = require('crypto');
//const { ManagementClient } = require('auth0');
/*
const auth0 = new ManagementClient({
    domain: 'dev-crsl7fds3e2pp8gg.us.auth0.com',
    clientId: 'qzb196eeCom4w7g9m5gW7IAfRTWAA2qN',
    clientSecret: 'R_c2knm1gZHCGSOxlnpkoElT5vSahQMY1ciS1OikamYUA_kPq35wOaB6_yDTx5VA',
	scope: 'create:users read:users',
  	audience: 'https://dev-crsl7fds3e2pp8gg.us.auth0.com/api/v2/'
    
  });
  */

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
	  user: 'cse416.coordinatedcare@gmail.com',
	  pass: "aarcvkknnvmhbhye"
	},
  });


  const sendPasswordResetEmail = async (userEmail, token) => {
	console.log('FRONTEND_URL:', process.env.FRONTEND_URL); //undefined???

	const resetLink = `${process.env.FRONTEND_URL}/password-reset?token=${token}`;
	
	const mailOptions = {
	  from: "cse416.coordinatedcare@gmail.com>",
	  to: userEmail, 
	  subject: "Password Reset",
	  html: `<p>Please follow this link to reset your password:</p>
			 <a href="${resetLink}">Reset Password</a>
			`
	};
  
	try {
	  const info = await transporter.sendMail(mailOptions);
	  console.log('Message sent: %s', info.messageId);
	} catch (error) {
	  console.error('Error sending password reset email:', error);
	}
  };


module.exports.CreateAccount = async (req, res, next) => {
	try {
		const {
			firstName,
			middleName,
			lastName,
			dateOfBirth,
			phoneNumber,
			username,
			email,
			passwordHash,
			role,
			address,
			professionalQualifications,
			isAdmin
		} = req.body;

		/*
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
		*/
		/*
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
		*/
		const employee = await Employee.create({
			firstName,
			middleName,
			lastName,
			dateOfBirth,
			phoneNumber,
			username,
			email,
			passwordHash,
			role,
			address,
			professionalQualifications,
			isAdmin
		});
		const token = crypto.randomBytes(20).toString('hex');

		try {
			const employee = await Employee.findOne({ email: email });
			if (!employee) {
			  console.log('employee not found');
			  return;
			}
			employee.resetPasswordToken = token;
			await employee.save();
			console.log('Reset password token set');
			try{
				await sendPasswordResetEmail(employee.email, token);

			}catch(err){
				console.error('Error sending email:', err);

			}
		  } catch (err) {
			console.error('Error setting password reset token:', err);
		  }
		

		//res.cookie("loggedInUser", user._id, {});
		
		res.status(201).json({
			message: "User Created",
			success: true,
		});
		
		//next();
	} catch (error) {
		console.error(error);
	}
};
module.exports.SendResetPasswordEmail = async (req, res, next) =>{
	try{
		const {id} = req.body;
		const employee = await Employee.findOne({
			_id: id,
		});
		if (!employee) {
			return res.status(400).send('employee with requested id not found. ');
		}

		try{
			await sendPasswordResetEmail(employee.email, employee.resetPasswordToken);
		}catch(err){
			console.error('Error sending email:', err);
			}



	}catch(err){
		console.log(err);
	}

};
//handles overwriting existing password
module.exports.ResetPassword = async (req, res, next) => {
	try {
		const {
			token,
			password
		} = req.body;
		const employee = await Employee.findOne({
			resetPasswordToken: token,
		});
		if (!employee) {
			return res.status(400).send('employee with requested token not found. ');
		}

		const hashedPassword = await bcrypt.hash(password, 10); 

        employee.passwordHash = hashedPassword;
		//employee.passwordHash = password;
		//employee.resetPasswordToken = undefined;

		await employee.save();
		/*
		auth0.users.create({
			email: employee.email,
			password: employee.password,
			connection: 'Username-Password-Authentication'
		  })
		  .then(function (user) {
			console.log('User created:', user);
		  })
		  .catch(function (err) {
			console.error('Error creating user:', err);
		  });
		  */

		//res.cookie("loggedInUser", user._id, {});
		
		res.status(201).json({
			message: "Password Updated",
			success: true,
			employee: employee,
		});
		
		//next();
	} catch (error) {
		console.error(error);
	}
};

module.exports.getAllEmployees = async (req, res, next) => {
	try {
		const employees = await Employee.find({}); 
        res.status(200).json({
            success: true,
            data: employees
        });
	} catch (error) {
		console.error(error);
	}
};

module.exports.getEmployee = async (req, res) => {
	try {
		const { IdClicked } = req.params;  
		const employee = await Employee.findOne({_id: IdClicked}); 
		if (employee) {
			res.status(200).json({
				success: true,
				data: employee
			});
		} else {
			res.status(404).json({
				success: false,
				message: "Employee not found"
			});
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Server error"
		});
	}
};

module.exports.updateEmployeeRole = async (req, res) => {
	const { id } = req.params;
    const { role } = req.body;

    try {
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }

        employee.role = role;
        await employee.save();

        res.status(200).json({ success: true, message: 'Role updated successfully', data: employee });
    } catch (error) {
        console.error('Error updating employee role:', error);
        res.status(500).json({ success: false, message: 'Failed to update role' });
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
	console.log(objectIdString);
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
