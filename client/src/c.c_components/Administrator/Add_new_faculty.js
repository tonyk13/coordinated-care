import React, { useState } from "react";
import { Button, TextField, Grid, Typography, Box, Container , Select,InputLabel, MenuItem , Snackbar } from "@mui/material";
import axios from 'axios';



export default function Add_new_faculty({ setCurrentPage , snackbarOpen,handleCloseSnackbar, setSnackbarOpen   }) {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		dateOfBirth: "",
		phoneNumber: "",
		address: "",
		email: "",
		role: "",
		professionalQualifications: "",
		isAdmin: false,
	});
	

	

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const allFieldsFilled = () => {
		return Object.values(formData).every(value => typeof value === 'string' ? value.trim() !== "" : value !== "");
	};
	

	// Same function for now for save cancel, just console logs clicked
	const saveEdits = () => {
		
		if (allFieldsFilled()) {
            
			const updatedFormData = {
				...formData,
				isAdmin: formData.role === 'Admin'
			};
			console.log(" UPdated Form data:", updatedFormData);
	
			const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
			const apiUrl = `${baseURL}/api/createaccount`;
			

			axios.post(apiUrl, updatedFormData)
            	.then(response => {
                	console.log(response.data); 
                	setSnackbarOpen(true); 
                	setCurrentPage("Staff"); 
            	})
            	.catch(error => {
                	console.error("There was an error creating the account:", error);
        
            });
			


        } else {
            alert("Please fill in all the fields.");
        }
	};

	return (
		<div>
			<Container>
				<Typography variant="h4">Add New Faculty</Typography>
				<Box>
					<Grid container spacing={6} mt="10px">
						<Grid item xs={16}>
							<TextField
								fullWidth
								rows={1}
								type="text"
								name="firstName"
								label="First Name"
								value={formData.firstName}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={16}>
							<TextField
								fullWidth
								rows={1}
								type="text"
								name="lastName"
								label="Last Name"
								value={formData.lastName}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={16}>
						  <InputLabel id="dateOfBirth">Date of birth:</InputLabel>
							<TextField
								fullWidth
								rows={1}
								type="date"
								name="dateOfBirth"
								value={formData.dateOfBirth}
								onChange={handleChange}
							/>
						</Grid>

						<Grid item xs={16}>
							<TextField
								fullWidth
								rows={1}
								type="text"
								name="phoneNumber"
								label="Phone Number"
								value={formData.phoneNumber}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={16}>
							<TextField
								fullWidth
								rows={1}
								type="text"
								name="address"
								label="Address"
								value={formData.address}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={16}>
							<TextField
								fullWidth
								rows={1}
								type="email"
								name="email"
								label="Email Address"
								value={formData.email}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={16}>
						<InputLabel id="role">Role</InputLabel>
    						<Select fullWidth
      							labelId="role"
      							id="role"
      							value={formData.role}
      							label="Role"
      							onChange={handleChange}
      							name="role"
    							>
      							<MenuItem value="Admin">Admin</MenuItem>
      							<MenuItem value="Nurse">Nurse</MenuItem>
								<MenuItem value="Doctor">Doctor</MenuItem>
								<MenuItem value="Hospital Faculty">Hospital Faculty</MenuItem>


    						</Select>
						</Grid>
						<Grid item xs={16}>
							<TextField
								fullWidth
								multiline
								rows={5}
								type="text"
								name="professionalQualifications"
								label="Professional Qualifications"
								value={formData.professionalQualifications}
								onChange={handleChange}
							/>
						</Grid>
					</Grid>
				</Box>
			</Container>
			<Box mt={2} display="flex" justifyContent="center">
				<Button variant="contained" color="primary" style={{ width: "100px" }} onClick={saveEdits}>
					Save
				</Button>
				<Box mx={10} />
				<Button
					variant="contained"
					style={{ backgroundColor: "red", color: "white", width: "100px" }}
					onClick={() => setCurrentPage("Staff")}
				>
					Cancel
				</Button>
			</Box>
			<Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message="Form submitted successfully"
            />
		</div>
	);
}
