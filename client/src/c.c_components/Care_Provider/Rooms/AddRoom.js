import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Box, Typography } from "@mui/material";

export default function AddRoom({ setCurrentPage }) {
	const [newRoomNumber, setNewRoomNumber] = useState("");
	const [newRoomNotes, setNewRoomNotes] = useState("");

	const addNewRoom = async () => {
		try {
			const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";

			const payload = {
				roomNumber: newRoomNumber,
				notes: newRoomNotes,
			};

			await axios.post(`${baseURL}/api/rooms`, payload);

			setNewRoomNumber("");
			setNewRoomNotes("");
			setCurrentPage("Rooms");
		} catch (error) {
			console.error("Error adding room:", error);
		}
	};
	const handleCancelClick = () => {
		setNewRoomNumber("");
		setNewRoomNotes("");
		setCurrentPage("Rooms");
	};

	return (
		<Box mt="10px">
			<Typography variant="h5" style={{ color: "DodgerBlue" }}>
				New Room Form
			</Typography>
			<br />
			<br />
			<TextField label="Room Number" variant="outlined" value={newRoomNumber} onChange={(e) => setNewRoomNumber(e.target.value)} />
			<br />
			<br />
			<TextField label="Notes" variant="outlined" value={newRoomNotes} onChange={(e) => setNewRoomNotes(e.target.value)} />
			<br />
			<br />
			<Button variant="contained" color="primary" onClick={addNewRoom} style={{ marginLeft: "10px" }}>
				Add Room
			</Button>
			<Button variant="contained" color="error" onClick={handleCancelClick} style={{ marginLeft: "10px" }}>
				Cancel
			</Button>
		</Box>
	);
}
