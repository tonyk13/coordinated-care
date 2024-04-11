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

const ViewProcess = ({ setCurrentPage, patient }) => {
	const onEdit = () => {
		setCurrentPage("EditProcess");
	};

	return (
		<Container>
			<Typography variant="h6" gutterBottom component="div">
				Process View
			</Typography>
			<Paper elevation={3} sx={{ p: 2 }}>
				<Typography variant="h5">{patient.name}</Typography>
				<Typography variant="subtitle1">{`Date of Birth: ${patient.dateOfBirth}`}</Typography>
				<Typography variant="subtitle1">{`Treatment: ${patient.treatment}`}</Typography>
				<Typography variant="subtitle1">{`Room: ${patient.room}`}</Typography>
				<Typography variant="subtitle1">{`Last Updated: ${patient.lastUpdated}`}</Typography>
				<Button variant="contained" color="primary" onClick={onEdit}>
					Edit
				</Button>
			</Paper>
			<ChecklistSection title="Pre-Operative Checkup" items={checklists.preOpCheckup} />
			<ChecklistSection title="Pre-Operative Services" items={checklists.preOpServices} />
			<ChecklistSection title="Day Prior to Treatment" items={checklists.dayPriorToTreatment} />
			<ChecklistSection title="Intra-Operative" items={checklists.intraOperative} physician={patient.physician} />
			<ChecklistSection title="Post Anesthesia Care Unit / Post Discharge" items={checklists.postOpCare} />
			<Divider sx={{ my: 2 }} />
			<Box>
				<Typography variant="subtitle1">{`Admission Date: ${patient.admissionDate}`}</Typography>
				<Typography variant="subtitle1">{`Expected Discharge: ${patient.expectedDischarge}`}</Typography>
				<Typography variant="subtitle1">{`Equipment: ${patient.equipment}`}</Typography>
			</Box>
		</Container>
	);
};

export default ViewProcess;
