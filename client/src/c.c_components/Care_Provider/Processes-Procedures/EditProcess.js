import React, { useState } from "react";
import {
	Box,
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
	Button,
	Stack,
} from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";

const EditProcess = ({ setCurrentPage, patient: selectedProcess, setPatient }) => {
	const [sections, setSections] = useState(selectedProcess.sections);

	const handleToggle = (sectionIndex, taskIndex) => {
		const newSections = sections.map((section, idx) => {
			if (idx === sectionIndex) {
				return {
					...section,
					tasks: section.tasks.map((task, tIdx) => {
						if (tIdx === taskIndex) {
							return {
								...task,
								completed: !task.completed,
							};
						}
						return task;
					}),
				};
			}
			return section;
		});

		console.log("Updated Sections:", newSections);

		setSections(newSections);
	};

	const ChecklistSection = ({ kza, title, items }) => (
		<Box>
			<Typography variant="h6" sx={{ mt: 2, fontWeight: "600" }}>
				{" "}
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
										onChange={() => handleToggle(kza, index)}
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
									{" "}
									{item.assignedTo && (
										<Typography variant="caption" sx={{ display: "block" }}>
											{`Assigned to: ${item.assignedTo.role} ${item.assignedTo.fullName}`}
										</Typography>
									)}
									{item.lastUpdated && (
										<Typography variant="caption" sx={{ display: "block" }}>
											{`Last updated: ${dayjs(item.lastUpdated).format("MM/DD/YYYY hh:mm A")}`}
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
				assignedTo: task.assignedTo._id,
			})),
		}));

		try {
			const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
			const response = await axios.put(`${baseURL}/api/processes/${selectedProcess._id}`, { sections: formattedSections });
			selectedProcess.sections = formattedSections;
			setPatient(selectedProcess);
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
					<Typography variant="subtitle1">{`Last Updated: ${dayjs(selectedProcess.lastUpdated).format(
						"MM/DD/YYYY HH:mm A"
					)}`}</Typography>
					<Typography variant="subtitle1">
						Equipment: {selectedProcess.equipment.map((equip) => equip.name).join(", ")}
					</Typography>
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
						lastUpdated: task.lastUpdated,
						dueDate: task.dueDate,
					}))}
				/>
			))}
			<Divider sx={{ my: 2 }} />
			<Box>
				<Typography variant="subtitle1">{`Admission Date: ${selectedProcess.admissionDate}`}</Typography>
				<Typography variant="subtitle1">{`Expected Discharge: ${selectedProcess.expectedDischarge}`}</Typography>
			</Box>
		</Container>
	);
};

export default EditProcess;
