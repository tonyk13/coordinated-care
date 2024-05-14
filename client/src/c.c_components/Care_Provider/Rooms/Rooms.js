import React, { useState, useEffect } from "react";
import {
	Box,
	Button,
	TextField,
	Typography,
	Paper,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Pagination,
} from "@mui/material";
import RoomIcon from "@mui/icons-material/BedroomChild";
import axios from "axios";

const fetchRooms = async () => {
	try {
		const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
		const response = await axios.get(`${baseURL}/api/rooms`);

		return response.data;
	} catch (error) {
		console.error("Failed to fetch rooms:", error);
		return [];
	}
};

export default function Rooms({ setCurrentPage, setSelectedRoom }) {
	const [rooms, setRooms] = useState([]);
	const [currentPage, setCurrentPageNumber] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const [rowsPerPage, setRowsPerPage] = useState(5);

	useEffect(() => {
		fetchRooms().then((data) => {
			const updatedData = data.map((item) => ({
				...item,
				nextAvailable: calculateNextAvailable(item.reservations),
			}));

			setRooms(updatedData);
		});
	}, []);

	function calculateNextAvailable(reservations) {
		const now = new Date();
		now.setHours(0, 0, 0, 0);

		const futureReservations = reservations.filter((res) => {
			const reservationDate = new Date(res.date);
			reservationDate.setHours(0, 0, 0, 0);
			return reservationDate >= now;
		});

		if (futureReservations.length === 0) {
			return "Now Available";
		}

		futureReservations.sort((a, b) => new Date(a.date) - new Date(b.date));
		const nextAvailableDate = new Date(futureReservations[0].date);
		nextAvailableDate.setDate(nextAvailableDate.getDate() + 1);
		return nextAvailableDate.toLocaleDateString();
	}

	const requestRoom = () => {
		setCurrentPage("RequestRoom");
	};

	const addRoom = () => {
		setCurrentPage("AddRoom");
	};

	const handleRoomClick = (roomId) => {
		setSelectedRoom(roomId);
		setCurrentPage("ViewRoom");
	};

	const handleChangePage = (event, newPage) => {
		setCurrentPageNumber(newPage);
	};

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value.toLowerCase());
	};

	const getStatusColor = (status) => {
		switch (status) {
			case "Occupied":
				return "red";
			case "Open":
				return "green";
			case "Awaiting Cleanup":
				return "#FFC400";
			default:
				return "black";
		}
	};

	const filteredRooms = rooms.filter(
		(room) =>
			room.roomNumber.toLowerCase().includes(searchTerm) ||
			room.status.toLowerCase().includes(searchTerm) ||
			(room.notes && room.notes.toLowerCase().includes(searchTerm))
	);

	const currentPageData = filteredRooms.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

	const pageCount = Math.ceil(filteredRooms.length / rowsPerPage);

	return (
		<Box>
			<Box display="flex" alignItems="center">
				<RoomIcon sx={{ fontSize: 50 }} />
				<Typography variant="h2" sx={{ ml: 1 }}>
					Rooms
				</Typography>
			</Box>
			<Box mt="10px" display="flex" alignItems="center">
				<TextField
					id="search"
					variant="outlined"
					label="Search"
					value={searchTerm}
					onChange={handleSearchChange}
					sx={{ marginRight: "10px" }}
				/>
				<Box ml={30}>
					<Button variant="contained" style={{ backgroundColor: "green", width: "100px" }} onClick={requestRoom}>
						Request
					</Button>
				</Box>
				<Box ml={10}>
					<Button variant="contained" color="primary" style={{ width: "110px" }} onClick={addRoom}>
						Add New
					</Button>
				</Box>
				<Box ml={10}></Box>
			</Box>
			<TableContainer component={Paper} sx={{ maxHeight: "70vh", overflow: "auto", mt: "10px" }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							<TableCell>Room Number</TableCell>
							<TableCell>Patient</TableCell>
							<TableCell>Notes</TableCell>
							<TableCell>Next Available</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{currentPageData.map((room, index) => (
							<TableRow key={index}>
								<TableCell>
									<span
										onClick={() => handleRoomClick(room.id)}
										style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
										role="button"
										tabIndex={0}
									>
										{room.roomNumber}
									</span>
								</TableCell>
								<TableCell>
									{room.reservations.length > 0 && room.reservations[0].patient
										? room.reservations[0].patient
										: "No patient"}
								</TableCell>
								<TableCell>{room.notes}</TableCell>
								<TableCell>{room.nextAvailable}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Box mt={3} display="flex" justifyContent="center">
				<Pagination count={pageCount} page={currentPage} onChange={handleChangePage} color="primary" />
			</Box>
		</Box>
	);
}
