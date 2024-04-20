const mongoose = require("mongoose");

// Contains references to: PrivacySettings, NotificationSettings, Message, EmergencyContact

const EmployeeSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	middleName: {
		type: String,
		required: false,
	},
	lastName: {
		type: String,
		required: true,
	},
	dateOfBirth: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: false,
	},
	email: {
		type: String,
		required: true,
	},
	passwordHash: {
		type: String,
		required: false,
	},
	privacySettings: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "PrivacySettings",
		required: false,
	},
	notificationSettings: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "NotificationSettings",
		required: false,
	},
	role: {
		type: String,
		required: true,
		enum: ["Nurse", "Doctor", "Hospital Faculty", "Admin", "Care Provider"],
	},
	messages: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: "Message",
		default: [],
	},
	address: {
		type: String,
		required: true,
	},
	emergencyContact: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "EmergencyContact",
		required: false,
	},
	professionalCredentials: {
		type: [String],
	},
	education: {
		type: [String],
	},
	specialties: {
		type: [String],
		required: false,
	},
	isAdmin: {
		type: Boolean,
		required: true,
		default: false,
	},
	schedule: {
		type: [String],
		required: false,
	},
	professionalQualifications: {
		type: String,
	},
	resetPasswordToken: {
		type: String,
	},
	auth0Id: { 
		type: String, unique: true 
	},

});

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;
