import React, { useState } from "react";
import { TextField, Button, Typography, Box, Container, Grid } from "@mui/material";

// WILL SEND FORM DATA TO CONSOLE FOR NOW
export default function Request_account({ setCurrentPage }) {
	const [formData, setFormData] = useState({
		firstName: "",
		middleName: "",
		lastName: "",
		dob: "",
		phoneNumber: "",
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	function takemetomainpage() {
		setCurrentPage("login");
		console.log(formData); // Log form data
	}

	return (
		<div className="login_screen">
			<div className="login_app_name" justifyContent="center">
				Coordinated Care
			</div>
			<div className="center-screen" justifyContent="center">
				<Container className="login-form-screen">
					<Grid container spacing={12} justifyContent="center">
						<Grid item xs={6}>
							<Box style={{ marginBottom: "30px" }}>
								<TextField
									fullWidth
									type="text"
									name="firstName"
									label="First Name"
									value={formData.firstName}
									onChange={handleChange}
									InputProps={{ style: { backgroundColor: "white" } }}
								/>
							</Box>
							<Box style={{ marginBottom: "30px" }}>
								<TextField
									fullWidth
									type="text"
									name="middleName"
									label="Middle Name"
									value={formData.middleName}
									onChange={handleChange}
									InputProps={{ style: { backgroundColor: "white" } }}
								/>
							</Box>
							<Box style={{ marginBottom: "30px" }}>
								<TextField
									fullWidth
									type="text"
									name="lastName"
									label="Last Name"
									value={formData.lastName}
									onChange={handleChange}
									InputProps={{ style: { backgroundColor: "white" } }}
								/>
							</Box>
						</Grid>
						<Grid item xs={6}>
							<Box style={{ marginBottom: "30px" }}>
								<TextField
									fullWidth
									type="text"
									name="dob"
									label="Date Of Birth"
									value={formData.dob}
									onChange={handleChange}
									InputProps={{ style: { backgroundColor: "white" } }}
								/>
							</Box>
							<Box style={{ marginBottom: "30px" }}>
								<TextField
									fullWidth
									type="text"
									name="phoneNumber"
									label="Phone Number"
									value={formData.phoneNumber}
									onChange={handleChange}
									InputProps={{ style: { backgroundColor: "white" } }}
								/>
							</Box>
						</Grid>
					</Grid>
					<Box>
						<Grid container spacing={4}>
							<Grid item xs={80}>
								<Button className="request_account_submit_button" onClick={takemetomainpage}>
									Submit
								</Button>
								<Button className="request_account_submit_button" onClick={takemetomainpage}>
									Cancel
								</Button>
							</Grid>
						</Grid>
					</Box>
				</Container>
			</div>
		</div>
	);
}
