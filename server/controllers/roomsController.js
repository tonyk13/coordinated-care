const roomModel = require("../models/room");

exports.all_rooms = async (req, res, next) => {
	try {
		const rooms = await roomModel.find();
		res.status(200).json(rooms);
	} catch (error) {
		next(error);
	}
};

exports.all_room_numbers = async (req, res, next) => {
	try {
		const rooms = await roomModel.find({}, "roomNumber");
		const roomNumbers = rooms.map((room) => ({
			id: room._id,
			roomNumber: room.roomNumber,
		}));

		res.status(200).json(roomNumbers);
	} catch (error) {
		next(error);
	}
};

exports.get_room = async (req, res, next) => {
	try {
		const roomId = req.params._id;
		const room = await roomModel.findById(roomId).populate("equipment").populate("patient").populate("attendingNurse");

		if (!room) {
			return res.status(404).json({ message: "Room not found" });
		}

		res.status(200).json(room);
	} catch (error) {
		console.error("Error fetching room:", error);
		next(error);
	}
};
