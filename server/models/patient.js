const mongoose = require("mongoose");

// Contains references to: Employee, Room

const AppointmentSchema = new mongoose.Schema({
	dateTime: {
		type: String,
		required: true,
	},
	providerAssigned: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Employee",
		required: false,
	},
	typeOfProcedure: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		required: true,
		enum: ["Confirmed", "Completed", "Cancelled", "Pending"],
	},
	room: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Room",
		required: false,
	},
});

// Contains references to: Employee, Room

const ProcedureSchema = new mongoose.Schema({
	dateTime: {
		type: Date,
		required: true,
	},
	providerAssigned: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Employee",
		required: true,
	},
	typeOfProcedure: {
		type: String,
		required: true,
	},
	room: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Room",
		required: true,
	},
});

const PatientDocumentSchema = new mongoose.Schema({
	documentType: {
		type: String,
		//required: true,
	},
	file: {
		type: String,
		required: true,
	},
	lastUpdated: {
		type: Date,
		default: Date.now,
	},
	accessLevel: {
		type: String,
		//required: true,
		enum: ["Public", "Private", "Restricted"],
	},
});

const PatientBillSchema = new mongoose.Schema({
	description: {
		type: String,
		required: true,
	},
	cost: {
		type: Number,
		required: true,
	},
	datePaid: {
		type: Date,
		required: false,
	},
	paymentMethod: {
		type: String,
		enum: ["Cash", "Credit Card", "Debit Card", "Insurance", "Check", "Online", "Other"],
	},
});

const EmergencyContactSchema = new mongoose.Schema({
	name: String,
	relationship: String,
	phoneNumber: String,
});

// Contains references to: Employee

const PatientSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
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
	physician: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Employee",
		//required: true,
	},
	email: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	emergencyContact: {
		type: EmergencyContactSchema,
		//required: true,
	},
	chronicConditions: {
		type: [String],
		default: [],
	},
	appointments: [AppointmentSchema],
	procedures: [ProcedureSchema],
	patientDocuments: [PatientDocumentSchema],
	insuranceProvider: {
		type: String,
		
	},
	memberID: {
		type: String,
		
	},
	effectiveSince: {
		type: Date,
		
	},
	insurancePhoneNumber: {
		type: String,
		
	},
	patientBills: [PatientBillSchema],
});

const Patient = mongoose.model("Patient", PatientSchema);

module.exports = Patient;