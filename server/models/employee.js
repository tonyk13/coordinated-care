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
		type: Date,
		required: true,
	},
	phoneNumber: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	passwordHash: {
		type: String,
		required: true,
	},
	privacySettings: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "PrivacySettings",
		required: true,
	},
	notificationSettings: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "NotificationSettings",
		required: true,
	},
	role: {
		type: String,
		required: true,
		enum: ["Nurse", "Doctor", "Hospital Faculty"],
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
		required: true,
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
});

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;
