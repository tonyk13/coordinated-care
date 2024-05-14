const mongoose = require("mongoose");

const EquipmentSchema = new mongoose.Schema({
	equipmentName: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
		default: 0,
	},
	notes: {
		type: String,
		required: false,
	},
	status: {
		type: String,
		required: false,
		enum: ["Available", "Maintenance", "Reserved", "Out of Stock"],
		default: "Available",
	},
	reservations: [
		{
			date: {
				type: Date,
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

const Equipment = mongoose.model("Equipment", EquipmentSchema);

module.exports = Equipment;
