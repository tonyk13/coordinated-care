import React from "react";
import { Box, Button, List, ListItem, ListItemText, ListItemIcon, Typography, Divider, Paper, Container, Checkbox } from "@mui/material";

const ChecklistSection = ({ title, items }) => (
	<Box>
		<Typography variant="h6" sx={{ mt: 2 }}>
			{title}
		</Typography>
		<List dense>
			{items.map((item, index) => {
				return (
					<ListItem key={index}>
						<ListItemIcon>
							<Checkbox
								edge="start"
								checked={item.completed}
								disabled
								inputProps={{ "aria-labelledby": `checkbox-list-label-${index}` }}
							/>
						</ListItemIcon>
						<ListItemText id={`checkbox-list-label-${index}`} primary={item.name} />
						{item.assignedTo && (
							<Typography variant="caption">{`Assigned to ${item.assignedTo.role} ${item.assignedTo.fullName}`}</Typography>
						)}
						{item.dueDate && (
							<Typography variant="caption">{`Due by: ${new Date(item.dueDate).toLocaleDateString()}`}</Typography>
						)}
					</ListItem>
				);
			})}
		</List>
	</Box>
);

const ViewProcess = ({ setCurrentPage, patient: selectedProcess }) => {
	const onEdit = () => {
		setCurrentPage("EditProcess");
	};

	const goBack = () => {
		setCurrentPage("Processes");
	};

	return (
		<Container>
			<Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
				<Typography variant="h6">Process View</Typography>
				<Button variant="outlined" onClick={goBack} sx={{ width: "100px" }}>
					Go Back
				</Button>
			</Box>
			<Paper elevation={3} sx={{ p: 2 }}>
				<Typography variant="h5">{selectedProcess.patientName}</Typography>
				<Typography variant="subtitle1">{`Date of Birth: ${selectedProcess.dateOfBirth}`}</Typography>
				<Typography variant="subtitle1">{`Treatment: ${selectedProcess.treatment}`}</Typography>
				<Typography variant="subtitle1">{`Status: ${selectedProcess.status}`}</Typography>
				<Typography variant="subtitle1">{`Room: ${selectedProcess.roomNumber}`}</Typography>
				<Typography variant="subtitle1">{`Last Updated: ${selectedProcess.lastUpdated}`}</Typography>
				<Button variant="contained" color="primary" onClick={onEdit} sx={{ mt: 1, width: "100px" }}>
					Edit
				</Button>
			</Paper>
			{selectedProcess.sections.map((section, index) => (
				<ChecklistSection key={index} title={section.name} items={section.tasks} />
			))}
			<Divider sx={{ my: 2 }} />
			<Box>
				<Typography variant="subtitle1">{`Admission Date: ${selectedProcess.admissionDate}`}</Typography>
				<Typography variant="subtitle1">{`Expected Discharge: ${selectedProcess.expectedDischarge}`}</Typography>
				<Typography variant="subtitle1">{`Equipment: ${selectedProcess.equipment}`}</Typography>
			</Box>
		</Container>
	);
};

export default ViewProcess;
