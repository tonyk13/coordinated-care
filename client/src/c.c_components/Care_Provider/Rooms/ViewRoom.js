import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Paper, Grid, CircularProgress, Alert, List, ListItem, Button } from "@mui/material";
import dayjs from "dayjs";

export default function ViewRoom({ setCurrentPage, selectedRoom }) {
	const [room, setRoom] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchRoomDetails = async () => {
			try {
				setLoading(true);
				const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
				const response = await axios.get(`${baseURL}/api/rooms/${selectedRoom}`);
				setRoom(response.data);
				setLoading(false);
			} catch (err) {
				setError("Failed to fetch room details");
				setLoading(false);
				console.error(err);
			}
		};

		fetchRoomDetails();
	}, [selectedRoom]);

	const handleBackClick = () => {
		setCurrentPage("Rooms");
	};

	if (loading) return <CircularProgress />;
	if (error) return <Alert severity="error">{error}</Alert>;

	return (
		<Container maxWidth="sm">
			<Paper elevation={3} sx={{ p: 2 }}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Button variant="contained" color="primary" onClick={handleBackClick} sx={{ mb: 2 }}>
							Go Back
						</Button>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="h4">Room Details</Typography>
					</Grid>
					{room ? (
						<>
							<Grid item xs={12}>
								<Typography variant="h6">Room Number: {room.roomNumber}</Typography>
							</Grid>
							<Grid item xs={12}>
								<Typography>Status: {room.status}</Typography>
							</Grid>
							<Grid item xs={12}>
								<Typography>
									Patient:{" "}
									{room.reservations.length > 0 && room.reservations[0].patient
										? room.reservations[0].patient
										: "No patient"}
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Typography>
									Employee:{" "}
									{room.reservations.length > 0 && room.reservations[0].user ? room.reservations[0].user : "None"}
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<Typography>Notes: {room.notes || "None"}</Typography>
							</Grid>
						</>
					) : (
						<Grid item xs={12}>
							<Alert severity="info">Room not found</Alert>
						</Grid>
					)}
				</Grid>
			</Paper>
		</Container>
	);
}
