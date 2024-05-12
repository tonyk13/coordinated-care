import React from "react";
import {
	Box,
	Button,
	Grid,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	Typography,
	Divider,
	Paper,
	Container,
	Checkbox,
} from "@mui/material";
import dayjs from "dayjs";

const ChecklistSection = ({ title, items }) => (
	<Box>
		<Typography variant="h6" sx={{ mt: 2, fontWeight: "600" }}>
			{title}
		</Typography>
		<List>
			{items.map((item, index) => (
				<ListItem key={index} divider>
					<Grid container alignItems="center">
						<Grid item xs={1}>
							<ListItemIcon>
								<Checkbox
									edge="start"
									checked={item.completed}
									disabled
									inputProps={{ "aria-labelledby": `checkbox-list-label-${index}` }}
								/>
							</ListItemIcon>
						</Grid>
						<Grid item xs={11}>
							<ListItemText
								id={`checkbox-list-label-${index}`}
								primary={item.name}
								primaryTypographyProps={{
									fontSize: "1.125rem",
									fontWeight: "medium",
								}}
							/>
							<Box sx={{ mt: 1, ml: 2 }}>
								{item.assignedTo && (
									<Typography variant="caption" sx={{ display: "block" }}>
										{`Assigned to: ${item.assignedTo.role} ${item.assignedTo.fullName}`}
									</Typography>
								)}
								{item.lastUpdated && (
									<Typography variant="caption" sx={{ display: "block" }}>
										{`Last updated: ${dayjs(new Date(item.lastUpdated)).format("MM/DD/YYYY hh:mm A")}`}
									</Typography>
								)}
								{item.dueDate && (
									<Typography variant="caption" sx={{ display: "block" }}>
										{`Due by: ${dayjs(item.dueDate).format("MM/DD/YYYY hh:mm A")}`}
									</Typography>
								)}
							</Box>
						</Grid>
					</Grid>
				</ListItem>
			))}
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
				<Typography variant="subtitle1">{`Last Updated: ${dayjs(new Date(selectedProcess.lastUpdated)).format(
					"MM/DD/YYYY hh:mm A"
				)}`}</Typography>
				<Typography variant="subtitle1">Equipment: {selectedProcess.equipment.map((equip) => equip.name).join(", ")}</Typography>
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
			</Box>
		</Container>
	);
};

export default ViewProcess;
