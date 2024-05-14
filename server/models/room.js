const mongoose = require("mongoose");

// Contains references to: Patient, Employee, Equipment

const RoomSchema = new mongoose.Schema({
	roomNumber: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		required: false,
		enum: ["Occupied", "Open", "Awaiting Cleanup"],
		default: "Open",
	},
	notes: {
		type: String,
		required: false,
	},
	reservations: [
		{
			date: {
				type: Date,
				required: false,
			},
			patient: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Patient",
				required: false,
			},
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Employee",
				required: false,
			},
		},
	],
});

const Room = mongoose.model("Room", RoomSchema);

module.exports = Room;
