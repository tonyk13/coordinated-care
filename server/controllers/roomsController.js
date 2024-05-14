const roomModel = require("../models/room");

exports.all_rooms = async (req, res, next) => {
	try {
		const roomsList = await roomModel
			.find({})
			.select("roomNumber status notes reservations")
			.populate({
				path: "reservations.patient",
				select: "firstName lastName -_id",
			})
			.populate({
				path: "reservations.user",
				select: "firstName lastName email -_id",
			})
			.lean();

		if (!roomsList || !Array.isArray(roomsList)) {
			return res.status(404).json({ message: "No rooms found" });
		}

		const formattedRooms = roomsList.map((room) => ({
			id: room._id,
			roomNumber: room.roomNumber || "",
			status: room.status || "",
			notes: room.notes || "",
			reservations: Array.isArray(room.reservations)
				? room.reservations.map((res) => ({
						date: res.date || "",
						patient: res.patient ? `${res.patient.firstName} ${res.patient.lastName}` : null,
						user: res.user ? `${res.user.firstName} ${res.user.lastName}` : null,
				  }))
				: [],
		}));

		res.status(200).json(formattedRooms);
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
		console.log("Room ID:", roomId);
		const room = await roomModel
			.findById(roomId)
			.populate({
				path: "reservations.date",
				populate: {
					path: "date",
				},
			})
			.populate({
				path: "reservations.patient",
				select: "firstName lastName -_id",
			})
			.populate({
				path: "reservations.user",
				select: "firstName lastName email -_id",
			})
			.lean();

		if (!room) {
			return res.status(404).json({ message: "Room not found" });
		}

		const formattedRoom = {
			id: room._id,
			roomNumber: room.roomNumber || "",
			status: room.status || "",
			notes: room.notes || "",
			reservations: Array.isArray(room.reservations)
				? room.reservations.map((res) => ({
						date: res.date || "",
						patient: res.patient ? `${res.patient.firstName} ${res.patient.lastName}` : null,
						user: res.user ? `${res.user.firstName} ${res.user.lastName}` : null,
				  }))
				: [],
		};

		res.status(200).json(formattedRoom);
	} catch (error) {
		console.error("Error fetching room:", error);
		next(error);
	}
};

exports.make_reservation = async (req, res, next) => {
	const { roomId, date, patientId, employeeId } = req.body;

	if (!roomId || !date || !patientId || !employeeId) {
		return res.status(400).json({ message: "Missing required fields" });
	}

	try {
		const room = await roomModel.findById(roomId);

		if (!room) {
			return res.status(404).json({ message: "Room not found" });
		}

		room.reservations.push({
			date: new Date(date),
			patient: patientId,
			user: employeeId,
		});

		await room.save();

		res.status(200).json({ message: "Reservation successfully added", room: room });
	} catch (error) {
		console.error("Failed to make reservation:", error);
		next(error);
	}
};

exports.getRoomReservations = async (req, res, next) => {
	const { roomId } = req.params;
	try {
		const room = await roomModel.findById(roomId).populate("reservations");

		if (!room) {
			return res.status(404).json({ message: "Room not found" });
		}

		res.status(200).json(room.reservations);
	} catch (error) {
		console.error("Failed to fetch room reservations:", error);
		next(error);
	}
};

exports.create_room = async (req, res, next) => {
	try {
		const { roomNumber, notes } = req.body;
		const newRoom = new roomModel({
			roomNumber: roomNumber,
			notes: notes,
		});

		const savedRoom = await newRoom.save();

		res.status(201).json(savedRoom);
	} catch (error) {
		next(error);
	}
};
