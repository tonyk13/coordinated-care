import React, { useState } from "react";
import { Button, TextField, Grid, Typography, Box, Container, Snackbar } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export default function Send_Feedback({ setCurrentPage }) {
	const [snackbarOpen, setSnackbarOpen] = useState(false);

	const { user, isAuthenticated } = useAuth0();
	const [formData, setFormData] = useState({
		summary: "",
		details: "",
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// Same function for now for save cancel, just console logs clicked
	const handleSubmit = async () => {
		if (!isAuthenticated) {
			console.log("User not authenticated");
			return;
		}

		try {
			const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
			const response = await axios.post(`${baseURL}/api/feedback`, {
				askedBy: user.sub,
				summary: formData.summary,
				details: formData.details,
			});
			console.log("Feedback sent:", response.data);
			setSnackbarOpen(true);
			setFormData({ summary: "", details: "" });
			// setCurrentPage('Dashboard');
		} catch (error) {
			console.error("Error submitting feedback:", error);
		}
	};

	const handleCancel = () => {
		setFormData({ summary: "", details: "" });
		setCurrentPage("Dashboard");
	};

	return (
		<div>
			<Container>
				<Typography variant="h4">Send Feedback</Typography>
				<Box>
					<Grid container spacing={6} mt="10px">
						<Grid item xs={16}>
							<TextField
								fullWidth
								multiline
								rows={1}
								type="text"
								name="summary"
								label="Summary (50 Word Limit)"
								value={formData.summary}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={16}>
							<TextField
								fullWidth
								multiline
								rows={10}
								type="text"
								name="details"
								label="Details"
								value={formData.details}
								onChange={handleChange}
							/>
						</Grid>
					</Grid>
				</Box>
			</Container>
			<Box mt={2} display="flex" justifyContent="center">
				<Button variant="contained" color="primary" style={{ width: "100px" }} onClick={handleSubmit}>
					Send
				</Button>
				<Box mx={10} />
				<Button variant="contained" style={{ backgroundColor: "red", color: "white", width: "100px" }} onClick={handleCancel}>
					Cancel
				</Button>
			</Box>
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={6000}
				onClose={() => setSnackbarOpen(false)}
				message="Feedback has been sent"
				action={
					<Button color="secondary" size="small" onClick={() => setSnackbarOpen(false)}>
						Close
					</Button>
				}
			/>
		</div>
	);
}
