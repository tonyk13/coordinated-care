import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, Button, Divider, TextField, Tab, Tabs } from "@mui/material";
import Billing from "./Billing";
import EditBilling from "./EditBilling";
import Documents from "./Documents";
import Procedures from "./Procedures";
import Appointments from "./Appointments";
import Referrals from "./Referrals";

export default function Information({ setCurrentPage, patient, setPatient, setSelectedTab, selectedTab, fileId, setFileId }) {
	const [isEditing, setIsEditing] = useState(false);
	const [isEditingInfo, setIsEditingInfo] = useState(false);
	const [formData, setFormData] = useState({
		name: patient.firstName + " " + patient.lastName || "",
		dob: patient.dateOfBirth || "",
		phone: patient.phone || "",
		email: patient.email || "",
		address: patient.address || "",
		emergencyContact: patient.emergencyContact?.name || "",
		emergencyPhone: patient.emergencyContact?.phoneNumber || "",
		//chronicConditions: patient.chronicConditions?.join(', ') || "",
	});

	useEffect(() => {
		setFormData({
			name: patient.firstName + " " + patient.lastName || "",
			dob: patient.dateOfBirth || "",
			phone: patient.phone || "",
			email: patient.email || "",
			address: patient.address || "",
			emergencyContact: patient.emergencyContact?.name || "",
			emergencyPhone: patient.emergencyContact?.phoneNumber || "",
			//chronicConditions: patient.chronicConditions?.join(', ') || "",
		});
	}, [patient]);

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
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const saveChanges = () => {
		setIsEditing(false);
	};

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
						{formData.name}
					</Typography>

					<Tabs value={selectedTab} onChange={handleTabChange} aria-label="Patient information tabs">
						<Tab label="Patient Information" />
						<Tab label="Appointments" />
						<Tab label="Procedures" />
						<Tab label="Patient Documents" />
						<Tab label="Referrals" />
						<Tab label="Billing" />
					</Tabs>
				</Box>

				{selectedTab === 0 && (
					<Box sx={{ mt: 2 }}>
						{isEditingInfo ? (
							<>
								<TextField
									fullWidth
									label="Name"
									name="name"
									value={formData.name}
									onChange={handleInputChange}
									margin="normal"
								/>
								<TextField
									fullWidth
									label="Date of Birth"
									type="date"
									name="dob"
									value={formData.dob}
									onChange={handleInputChange}
									margin="normal"
								/>
								<TextField
									fullWidth
									label="address"
									name="address"
									value={formData.address}
									onChange={handleInputChange}
									margin="normal"
								/>
								<TextField
									fullWidth
									label="chronic Conditions"
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
								<Typography variant="body1">Name: {patient.firstName + " " + patient.lastName}</Typography>
								<Typography variant="body1">
									Date of Birth:{" "}
									{new Date(patient.dateOfBirth).toLocaleDateString("en-US", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</Typography>

								<Divider sx={{ my: 1 }} />

								<Typography variant="body1">Contact Information:</Typography>
								<Typography variant="body1">Phone Number: {patient.phoneNumber}</Typography>
								<Typography variant="body1">Email: {patient.email}</Typography>

								<Divider sx={{ my: 1 }} />

								<Typography variant="body1">Address: {patient.address}</Typography>

								<Divider sx={{ my: 1 }} />

								<Typography variant="body1">Emergency Contact:</Typography>
								<Typography variant="body1">Name: {patient.emergencyContact.name}</Typography>
								<Typography variant="body1">Relationship: {patient.emergencyContact.relationship}</Typography>
								<Typography variant="body1">Phone: {patient.emergencyContact.phoneNumber}</Typography>

								<Divider sx={{ my: 1 }} />

								<Typography variant="h6" sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>
									Chronic Conditions
								</Typography>
								<Typography variant="body1">Diabetes</Typography>

								<Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
									<Button variant="contained" color="primary" onClick={toggleEdit}>
										Edit Patient Information
									</Button>
								</Box>
							</>
						)}
					</Box>
				)}
				{selectedTab === 1 && <Appointments setCurrentPage={setCurrentPage} />}
				{selectedTab === 2 && <Procedures />}
				{selectedTab === 3 && <Documents setCurrentPage={setCurrentPage} patient={patient} fileId={fileId} setFileId={setFileId} />}
				{selectedTab === 5 && !isEditing && <Billing setCurrentPage={handleEditClick} patient={patient} />}
				{selectedTab === 4 && <Referrals />}
				{selectedTab === 5 && isEditing && (
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
