import React, { useState, useEffect } from "react";
import { Button, TextField, Grid, Typography, Box, Container , Select,InputLabel, MenuItem , Snackbar } from "@mui/material";
import axios from 'axios';



export default function NewPatientForm({ setCurrentPage , setSnackbarOpen   }) {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		dateOfBirth: "",
		phoneNumber: "",
		address: "",
		email: "",
		physician: "",
        //below: emergency contact info
        emergencyContact: {
            name: "",
            relationship: "",
            phoneNumber: "",
        },

        //chronicConditions:"",
	});
    const [physicians, setPhysicians] = useState([]);
    useEffect(()=>{
        const fetchPhysicians = async () => {
            const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
            const response = await axios.get(`${baseURL}/api/employees/all_physician`);
            setPhysicians(response.data);
            console.log(response.data);
        };

        fetchPhysicians();


    }, []);

    
	const handleChange = (e) => {
        if (e.target.name.startsWith("contact_")) {
            
            const field = e.target.name.split("_")[1];
            setFormData({
                ...formData,
                emergencyContact: {
                    ...formData.emergencyContact,
                    [field]: e.target.value
                }
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        }
    };
	const allFieldsFilled = () => {
        return Object.values(formData).every(value => 
            typeof value === "object" ? Object.values(value).every(v => v.trim() !== "") : value.trim() !== ""
        ) && formData.physician;
    };

	// Same function for now for save cancel, just console logs clicked
	const saveEdits = () => {
		
		if (allFieldsFilled()) {
            console.log("Form data:", formData);
			const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
			const apiUrl = `${baseURL}/api/patients/add-new`;
			

			axios.post(apiUrl, formData)
            	.then(response => {
                	console.log(response.data); 
                	setSnackbarOpen(true); 
                	setCurrentPage("Patients"); 
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
				<Typography variant="h4">Add New Patient</Typography>
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
                            <InputLabel id="physician-label">Physician</InputLabel>
                            <Select
                                fullWidth
                                labelId="physician-label"
                                name="physician"
                                value={formData.physician}
                                label="Physician"
                                onChange={handleChange}
                             >
                                {physicians.map((physician) => (
                                <MenuItem key={physician._id} value={physician._id}>Dr. {physician.firstName} {physician.lastName}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={16}>
							<TextField
								fullWidth
								rows={1}
								type="text"
								name="contact_name"
								label="Emergency Contact Name"
								value={formData.contact_name}
								onChange={handleChange}
							/>
						</Grid>
                        <Grid item xs={16}>
							<TextField
								fullWidth
								rows={1}
								type="text"
								name="contact_relationship"
								label="Emergency Contact Relationship"
								value={formData.contact_relationship}
								onChange={handleChange}
							/>
						</Grid>
                        <Grid item xs={16}>
							<TextField
								fullWidth
								rows={1}
								type="text"
								name="contact_phoneNumber"
								label="Emergency Contact Phone Number"
								value={formData.contact_phoneNumber}
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
					onClick={() => setCurrentPage("Patients")}
				>
					Cancel
				</Button>
			</Box>
		</div>
	);
}
