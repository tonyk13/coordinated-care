const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	assignedTo: {
		type: String,
		required: false,
	},
	completed: {
		type: Boolean,
		default: false,
	},
	dueDate: {
		type: Date,
		required: false,
	},
});

const SectionSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	tasks: [TaskSchema],
});

const ProcessSchema = new mongoose.Schema({
	patient: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Patient",
		required: true,
	},
	dateOfBirth: {
		type: Date,
		required: true,
	},
	treatment: {
		type: String,
		required: true,
	},
	room: {
		// should be a reference to a room object
		type: String,
		required: true,
	},
	lastUpdated: {
		type: Date,
		default: Date.now,
	},
	sections: [SectionSchema],
	physician: {
		// should be a reference to a physician object
		type: String,
		required: true,
	},
	admissionDate: {
		type: Date,
		required: true,
	},
	expectedDischarge: {
		type: Date,
		required: true,
	},
	equipment: {
		// should be a reference to an equipment object
		type: String,
		required: false,
	},
	status: {
		type: String,
		required: true,
		enum: ["Pre-Op", "Operating", "Post-Op", "Recovery"],
		default: "Pre-Op",
	},
});

const Process = mongoose.model("Process", ProcessSchema);

module.exports = Process;
