const mongoose = require("mongoose");

const EquipmentSchema = new mongoose.Schema({
	equipmentName: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	nextAvailableDateAndTime: {
		type: Date,
		required: true,
	},
	notes: {
		type: String,
		required: false,
	},
});

const Equipment = mongoose.model("Equipment", EquipmentSchema);

module.exports = Equipment;
