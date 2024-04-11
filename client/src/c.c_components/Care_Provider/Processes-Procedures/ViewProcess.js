import React from "react";
import { Box, Button, List, ListItem, ListItemText, ListItemIcon, Typography, Divider, Paper, Container, Checkbox } from "@mui/material";

const checklists = {
	preOpCheckup: ["Blood Test", "X-Ray", "ECG"],
	preOpServices: ["Anesthesia Assessment", "Surgical Assessment"],
	dayPriorToTreatment: ["No food or drink after midnight", "Shower using antiseptic soap"],
	intraOperative: ["Prepare surgical equipment", "Verify surgical site"],
	postOpCare: ["Monitor vital signs", "Pain management"],
};

const ChecklistSection = ({ title, items, physician }) => (
	<Box>
		<Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
			{title}
		</Typography>
		<List dense>
			{items.map((item, index) => (
				<ListItem key={index}>
					<ListItemIcon>
						<Checkbox edge="start" disabled inputProps={{ "aria-labelledby": `checkbox-list-label-${index}` }} />
					</ListItemIcon>
					<ListItemText id={`checkbox-list-label-${index}`} primary={item} />
					{physician && <Typography variant="caption" sx={{ ml: 2 }}>{`${physician}`}</Typography>}
				</ListItem>
			))}
		</List>
	</Box>
);

const ViewProcess = ({ setCurrentPage, patient: selectedProcess }) => {
	const onEdit = () => {
		setCurrentPage("EditProcess");
	};

	return (
		<Container>
			<Typography variant="h6" gutterBottom component="div">
				Process View
			</Typography>
			<Paper elevation={3} sx={{ p: 2 }}>
				<Typography variant="h5">{selectedProcess.patientName}</Typography>
				<Typography variant="subtitle1">{`Date of Birth: ${selectedProcess.dateOfBirth}`}</Typography>
				<Typography variant="subtitle1">{`Treatment: ${selectedProcess.treatment}`}</Typography>
				<Typography variant="subtitle1">{`Room: ${selectedProcess.roomNumber}`}</Typography>
				<Typography variant="subtitle1">{`Last Updated: ${selectedProcess.lastUpdated}`}</Typography>
				<Button variant="contained" color="primary" onClick={onEdit}>
					Edit
				</Button>
			</Paper>
			{/* These ChecklistSections should be conditionally rendered by going through the selectedProcess's "sections" 
				array (and their respective "tasks" subarrays) */}
			<ChecklistSection title="Pre-Operative Checkup" items={checklists.preOpCheckup} />
			<ChecklistSection title="Pre-Operative Services" items={checklists.preOpServices} />
			<ChecklistSection title="Day Prior to Treatment" items={checklists.dayPriorToTreatment} />
			<ChecklistSection title="Intra-Operative" items={checklists.intraOperative} physician={selectedProcess.employeeName} />
			<ChecklistSection title="Post Anesthesia Care Unit / Post Discharge" items={checklists.postOpCare} />
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
