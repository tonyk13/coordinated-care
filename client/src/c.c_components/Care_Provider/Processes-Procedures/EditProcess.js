import React, { useState } from "react";
import {
	Box,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	Typography,
	Divider,
	Paper,
	Container,
	Checkbox,
	Button,
	Stack,
} from "@mui/material";
import axios from "axios";

const EditProcess = ({ setCurrentPage, patient: selectedProcess }) => {
	const [sections, setSections] = useState(selectedProcess.sections);

	const handleToggle = (sectionIndex, taskIndex) => {
		const newSections = JSON.parse(JSON.stringify(sections));

		console.log("newSections: ", newSections);
		console.log("Value of sectionIndex: ", sectionIndex);
		console.log("Value of taskIndex: ", taskIndex);
		console.log("Is this task currently completed? ", newSections[sectionIndex].tasks[taskIndex].completed);

		console.log("The task:", newSections[sectionIndex].tasks[taskIndex]);
		newSections[sectionIndex].tasks[taskIndex].completed = !newSections[sectionIndex].tasks[taskIndex].completed;

		console.log("This task is updated, is it completed now? ", newSections[sectionIndex].tasks[taskIndex].completed);

		setSections(newSections);
	};

	const ChecklistSection = ({ kza, title, items }) => (
		<Box>
			<Typography variant="h6" sx={{ mt: 2 }}>
				{title}
			</Typography>
			<List dense>
				{items.map((item, index) => (
					<ListItem key={index}>
						<ListItemIcon>
							<Checkbox
								edge="start"
								checked={item.completed}
								onChange={() => handleToggle(kza, index)}
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
				))}
			</List>
		</Box>
	);

	const handleCancel = () => {
		setCurrentPage("ViewProcess");
	};

	const handleReset = () => {
		setSections(selectedProcess.sections);
	};

	const handleSave = async () => {
		const formattedSections = sections.map((section) => ({
			...section,
			tasks: section.tasks.map((task) => ({
				...task,
				assignedTo: task.assignedTo?._id,
			})),
		}));

		try {
			const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
			const response = await axios.put(`${baseURL}/api/processes/${selectedProcess._id}`, { sections: formattedSections });
			console.log("Save response:", response);
			setCurrentPage("ViewProcess");
		} catch (error) {
			console.error("Failed to save process updates:", error);
		}
	};

	return (
		<Container>
			<Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
				<Typography variant="h6">Process Edit</Typography>
			</Box>
			<Paper elevation={3} sx={{ p: 2 }}>
				<Box>
					<Typography variant="h5">{selectedProcess.patientName}</Typography>
					<Typography variant="subtitle1">{`Date of Birth: ${selectedProcess.dateOfBirth}`}</Typography>
					<Typography variant="subtitle1">{`Treatment: ${selectedProcess.treatment}`}</Typography>
					<Typography variant="subtitle1">{`Status: ${selectedProcess.status}`}</Typography>
					<Typography variant="subtitle1">{`Room: ${selectedProcess.roomNumber}`}</Typography>
					<Typography variant="subtitle1">{`Last Updated: ${selectedProcess.lastUpdated}`}</Typography>
				</Box>
				<Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
					<Button variant="outlined" color="primary" onClick={handleCancel} sx={{ width: "100px" }}>
						Cancel
					</Button>
					<Button variant="outlined" color="error" onClick={handleReset} sx={{ width: "100px" }}>
						Reset
					</Button>
					<Button variant="contained" color="success" onClick={handleSave} sx={{ width: "100px" }}>
						Save
					</Button>
				</Stack>
			</Paper>
			{sections.map((section, index) => (
				<ChecklistSection
					key={index}
					kza={index}
					title={section.name}
					items={section.tasks.map((task) => ({
						name: task.name,
						completed: task.completed,
						assignedTo: task.assignedTo,
						dueDate: task.dueDate,
					}))}
				/>
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

export default EditProcess;
