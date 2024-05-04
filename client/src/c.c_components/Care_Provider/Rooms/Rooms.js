import React, { useState, useEffect } from "react";
import {
	Box,
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
	InputAdornment,
} from "@mui/material";
import RoomIcon from "@mui/icons-material/BedroomChild";
import { Search as SearchIcon } from "@mui/icons-material";
import axios from "axios";

export default function Rooms({ setCurrentPage, setSelectedRoom }) {
	const [rooms, setRooms] = useState([]);
	const [currentPage, setCurrentPageNumber] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const rowsPerPage = 10;

	useEffect(() => {
		const fetchRooms = async () => {
			try {
				const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
				const response = await axios.get(`${baseURL}/api/rooms`);
				setRooms(response.data);
			} catch (error) {
				console.error("Failed to fetch rooms:", error);
			}
		};

		fetchRooms();
	}, []);

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
				return "#FFC400"; // Orange-yellow
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
			<Box mt={2} mb={2}>
				<TextField
					id="search"
					type="search"
					variant="outlined"
					placeholder="Search rooms"
					value={searchTerm}
					onChange={handleSearchChange}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),
					}}
					sx={{ width: "30vw" }}
				/>
			</Box>
			<TableContainer component={Paper} sx={{ maxHeight: "70vh", overflow: "auto" }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							<TableCell>Room Number</TableCell>
							<TableCell>Status</TableCell>
							<TableCell>Notes</TableCell>
							<TableCell>Next Available</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{currentPageData.map((room, index) => (
							<TableRow key={index}>
								<TableCell>
									<span
										onClick={() => handleRoomClick(room._id)}
										style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
										role="button"
										tabIndex={0}
									>
										{room.roomNumber}
									</span>
								</TableCell>
								<TableCell style={{ color: getStatusColor(room.status) }}>{room.status}</TableCell>
								<TableCell>{room.notes}</TableCell>
								<TableCell>{new Date(room.nextAvailableDateAndTime).toLocaleString()}</TableCell>
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
