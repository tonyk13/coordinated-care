import React, { useState } from "react";
import { Box, Paper, Typography, Button, Divider, Tab, Tabs } from "@mui/material";
import Billing from "./Billing";
import EditBilling from "./EditBilling";

export default function Information({ setCurrentPage }) {
	const [selectedTab, setSelectedTab] = useState(0);
	const [isEditing, setIsEditing] = useState(false); // State to toggle between viewing and editing

	const handleTabChange = (event, newValue) => {
		setSelectedTab(newValue);
		setIsEditing(false);
	};

	const handleEditClick = () => {
		setIsEditing(true);
	};

	return (
		<Box>
			<Paper elevation={1} sx={{ p: 2 }}>
				<Box
					sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: 1, borderColor: "divider" }}
				>
					<Typography variant="h4" sx={{ color: "#5162F7", fontWeight: "bold", mr: "2vw" }}>
						Scott, Alan
					</Typography>

					<Box sx={{ flexGrow: 1 }}>
						<Tabs
							value={selectedTab}
							onChange={handleTabChange}
							aria-label="Patient information tabs"
							TabIndicatorProps={{ style: { backgroundColor: "#e35922" } }}
							sx={{
								".MuiTabs-indicator": { backgroundColor: "#e35922" },
								".Mui-selected": { color: "#e35922" },
							}}
						>
							<Tab label="Patient Information" />
							<Tab label="Appointments" />
							<Tab label="Procedures" />
							<Tab label="Patient Documents" />
							<Tab label="Billing" />
						</Tabs>
					</Box>
				</Box>

				{selectedTab === 0 && (
					<Box>
						<Typography variant="h5" sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>
							Personal Information
						</Typography>
						<Typography variant="body1">Name: Scott, Alan</Typography>
						<Typography variant="body1">Date of Birth: July 4, 1980</Typography>

						<Divider sx={{ my: 1 }} />

						<Typography variant="body1">Contact Information:</Typography>
						<Typography variant="body1">Phone: +1 (555) 123-4567</Typography>
						<Typography variant="body1">Email: alan@email.org</Typography>

						<Divider sx={{ my: 1 }} />

						<Typography variant="body1">Address: 123 Healthway Drive, Meditown, State, 45678</Typography>

						<Divider sx={{ my: 1 }} />

						<Typography variant="body1">Emergency Contact:</Typography>
						<Typography variant="body1">Name: Jane Doe</Typography>
						<Typography variant="body1">Relationship: Spouse</Typography>
						<Typography variant="body1">Phone: +1 (555) 987-6543</Typography>

						<Divider sx={{ my: 1 }} />

						<Typography variant="h6" sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>
							Chronic Conditions
						</Typography>
						<Typography variant="body1">Diabetes</Typography>

						<Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
							<Button variant="contained" color="primary">
								Edit Patient Information
							</Button>
						</Box>
					</Box>
				)}
				{selectedTab === 4 && !isEditing && <Billing setCurrentPage={handleEditClick} />}
				{selectedTab === 4 && isEditing && (
					<EditBilling setCurrentPage={() => setIsEditing(false)} isEditing={isEditing} setIsEditing={setIsEditing} />
				)}
			</Paper>
		</Box>
	);
}
