import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, Button, Divider, TextField, Tab, Tabs, InputLabel,Select, MenuItem  } from "@mui/material";
import Billing from "./Billing";
import EditBilling from "./EditBilling";
import Documents from "./Documents";
import Procedures from "./Procedures";
import Appointments from "./Appointments";
import axios from "axios";

export default function Information({ setCurrentPage, patient, setPatient, setSelectedTab, selectedTab, fileId, setFileId }) {
	const [isEditing, setIsEditing] = useState(false);
	const [isEditingInfo, setIsEditingInfo] = useState(false);
	const [physicians, setPhysicians] = useState([]);
	const [formData, setFormData] = useState({
		...patient,
    dob: formatDate(patient.dateOfBirth),
	});

	useEffect(() => {
		setFormData({
			...formData,
			dob: formatDate(patient.dateOfBirth)
		});
	
	}, [patient.dateOfBirth]);

	useEffect(() => {

		const fetchPhysicians = async () => {
            const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
            const response = await axios.get(`${baseURL}/api/employees/all_physician`);
            setPhysicians(response.data);
            console.log(response.data);
        };
		fetchPhysicians();



	}, []);

	const handleTabChange = (event, newValue) => {
		setSelectedTab(newValue);
	};
	const handleEditClick = () => {
		setIsEditing(true);
	};
	const toggleEdit = () => {
		setIsEditingInfo(!isEditingInfo);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		const keys = name.split('.');
		if (keys.length > 1) {
			setFormData(prev => ({
				...prev,
				[keys[0]]: {
					...prev[keys[0]],
					[keys[1]]: value
				}
			}));
		} else {
			setFormData(prev => ({
				...prev,
				[name]: value,
			}));
		}
	};

	const saveChanges = async () => {
		const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
		try {
			const response = await axios.put(`${apiUrl}/api/patients/${patient._id}`, formData);
			if (response.data) {
				setFormData(prevFormData => ({
					...prevFormData,
					...response.data,
					dob: formatDate(response.data.dob) 
				}));
				setIsEditingInfo(false);
				setCurrentPage("Patients"); 
			} else {
				console.log("patient info not updated");
			}
		} catch (error) {
			console.error("Error updating patient information:", error);
			
		}
	};
	function formatDate(date) {
		if (!date) return "";
		const d = new Date(date);
		d.setDate(d.getDate() + 1);

		let month = '' + (d.getMonth() + 1);
		let day = '' + d.getDate();
		let year = d.getFullYear();
	
		if (month.length < 2) 
			month = '0' + month;
		if (day.length < 2) 
			day = '0' + day;
	
		return [year, month, day].join('-');
	}

	return (
		<Box sx={{ p: 2 }}>
			<Paper elevation={1} sx={{ p: 2 }}>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						borderBottom: 1,
						borderColor: "divider",
					}}
				>
					<Typography variant="h4" sx={{ color: "#5162F7", fontWeight: "bold", mr: "2vw" }}>
						{formData.firstName} {formData.lastName}
					</Typography>

					<Tabs value={selectedTab} onChange={handleTabChange} aria-label="Patient information tabs">
						<Tab label="Patient Information" />
						<Tab label="Appointments" />
						<Tab label="Procedures" />
						<Tab label="Patient Documents" />
						<Tab label="Billing" />
					</Tabs>
				</Box>

				{selectedTab === 0 && (
					<Box sx={{ mt: 2 }}>
						{isEditingInfo ? (
							<>
								<TextField
									fullWidth
									label="First Name"
									name="firstName"
									value={formData.firstName}
									onChange={handleInputChange}
									margin="normal"
								/>
								<TextField
									fullWidth
									label="Last Name"
									name="lastName"
									value={formData.lastName}
									onChange={handleInputChange}
									margin="normal"
								/>
								<TextField
									fullWidth
									label="Date of Birth"
									type="date"
									name="dob"
									value={(formData.dob)}
									onChange={handleInputChange}
									margin="normal"
								/>
								<TextField
									fullWidth
									type="text"
									name="phoneNumber"
									label="Phone Number"
									value={formData.phoneNumber}
									onChange={handleInputChange}
								/>
								<TextField
									fullWidth
									label="Home Address"
									name="address"
									value={formData.address}
									onChange={handleInputChange}
									margin="normal"
								/>
								<TextField
									fullWidth
									type="email"
									name="email"
									label="Email Address"
									value={formData.email}
									onChange={handleInputChange}
								/>
								<InputLabel id="physician-label">Physician</InputLabel>
                            		<Select
                                		fullWidth
                                		labelId="physician-label"
                                		name="physician"
                                		value={formData.physician}
                                		label="Physician"
                                		onChange={e => setFormData({ ...formData, physician: e.target.value })}
                             		>
                                		{physicians.map((physician) => (
                                			<MenuItem key={physician._id} value={physician._id}>Dr. {physician.firstName} {physician.lastName}</MenuItem>
                                		))}
                            		</Select>
								<br/><br/>
								<TextField
									fullWidth
									type="text"
									name="emergencyContact.name"
									label="Emergency Contact Name"
									value={formData.emergencyContact.name}
									onChange={handleInputChange}
								/><br/><br/>
								<TextField
									fullWidth
									type="text"
									name="emergencyContact.relationship"
									label="Emergency Contact Relationship"
									value={formData.emergencyContact.relationship}
									onChange={handleInputChange}
								/><br/><br/>
								<TextField
									fullWidth
									type="text"
									name="emergencyContact.phoneNumber"
									label="Emergency Contact Phone Number"
									value={formData.emergencyContact.phoneNumber}
									onChange={handleInputChange}
								/>

								<TextField
									fullWidth
									multiline
									rows={5}
									label="Chronic Conditions"
									name="chronicConditions"
									value={formData.chronicConditions}
									onChange={handleInputChange}
									margin="normal"
								/>

								<Box sx={{ mt: 2 }}>
									<Button sx={{ mr: 1 }} variant="outlined" onClick={toggleEdit}>
										Cancel
									</Button>
									<Button variant="contained" onClick={saveChanges}>
										Save
									</Button>
								</Box>
							</>
						) : (
							<>
								<Typography variant="h5" sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>
									Personal Information
								</Typography>
								<Typography variant="body1">Name: {formData.firstName + " " + formData.lastName}</Typography>
								<Typography variant="body1">
									Date of Birth:{" "}
									{(formData.dob)}
								</Typography>
								


								<Divider sx={{ my: 1 }} />

								<Typography variant="body1">Contact Information:</Typography>
								<Typography variant="body1">Phone Number: {formData.phoneNumber}</Typography>
								<Typography variant="body1">Email: {formData.email}</Typography>

								<Divider sx={{ my: 1 }} />

								<Typography variant="body1">Address: {formData.address}</Typography>

								<Divider sx={{ my: 1 }} />

								<Typography variant="body1">Emergency Contact:</Typography>
								<Typography variant="body1">Name: {formData.emergencyContact.name}</Typography>
								<Typography variant="body1">Relationship: {formData.emergencyContact.relationship}</Typography>
								<Typography variant="body1">Phone: {formData.emergencyContact.phoneNumber}</Typography>

								<Divider sx={{ my: 1 }} />

								<Typography variant="h6" sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>
									Chronic Conditions
								</Typography>
								<Typography variant="body1">{formData.chronicConditions}</Typography>

								<Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
									<Button variant="contained" color="primary" onClick={toggleEdit}>
										Edit Patient Information
									</Button>
								</Box>
							</>
						)}
					</Box>
				)}
				{selectedTab === 1 && <Appointments setCurrentPage={setCurrentPage} patientId={patient._id} />}
				{selectedTab === 2 && <Procedures patientId={patient._id} />}
				{selectedTab === 3 && <Documents setCurrentPage={setCurrentPage} patient={patient} fileId={fileId} setFileId={setFileId} />}
				{selectedTab === 4 && !isEditing && <Billing setCurrentPage={handleEditClick} patient={patient} />}
				{selectedTab === 4 && isEditing && (
					<EditBilling
						setCurrentPage={() => setIsEditing(false)}
						isEditing={isEditing}
						setIsEditing={setIsEditing}
						patient={patient}
					/>
				)}
			</Paper>
		</Box>
	);
}
