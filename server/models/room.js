const mongoose = require("mongoose");

// Contains references to: Patient, Employee, Equipment

const RoomSchema = new mongoose.Schema({
	roomNumber: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		required: true,
		enum: ["Occupied", "Open", "Awaiting Cleanup"],
	},
	patient: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Patient",
		required: false,
	},
	attendingNurse: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Employee",
		required: false,
	},
	nextAvailableDateAndTime: {
		type: Date,
		required: true,
	},
	equipment: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Equipment",
		required: false,
	},
	notes: {
		type: String,
		required: false,
	},
});

const Room = mongoose.model("Room", RoomSchema);

module.exports = Room;
