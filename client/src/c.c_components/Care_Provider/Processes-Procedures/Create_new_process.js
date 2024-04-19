import React, { useState, useEffect } from "react";
import {
	Button,
	Container,
	TextField,
	Typography,
	IconButton,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Grid,
	List,
	ListItem,
	OutlinedInput,
	Chip,
	Box,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import axios from "axios";

// const availableProcedures = ["Blood Test", "X-Ray", "MRI Scan", "CT Scan", "EKG"];

// For now we're going to be manually inputting the "Treatment" field
const treatments = ["Chemotherapy", "Physical Therapy", "Surgery"];

const physicians = ["Dr. Smith", "Dr. Jones", "Dr. Brown"];
const rooms = ["101A", "101B", "102A", "102B"];
const equipmentList = ["Ultrasound", "X-Ray Machine", "MRI Machine"];

const sections = [
	"Pre-Operative Checkup",
	"Pre-Operative Services",
	"Day Prior to Treatment",
	"Intra-Operative",
	"Post Anesthesia Care Unit / Post Discharge",
];

const patients = [
	{ id: 1, name: "John Doe" },
	{ id: 2, name: "Jane Smith" },
	{ id: 3, name: "Alice Johnson" },
];

export default function CreateNewProcess({ setCurrentPage }) {
	const [processDetails, setProcessDetails] = useState({
		patientId: "",
		treatment: "",
		physician: "",
		admissionDate: dayjs(),
		expectedDischarge: dayjs().add(1, "day"),
		room: "",
		equipment: [],
		status: "Pre-Op",
		lastUpdated: dayjs().format("YYYY-MM-DD"),
		sections: sections.map((section) => ({ name: section, tasks: [""] })),
	});

	const [patientNames, setPatientNames] = useState([]);

	useEffect(() => {
		const fetchPatientNames = async () => {
			try {
				const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
				const response = await axios.get(`${baseURL}/api/patients/all_patient_names`);

				// if (!response.ok) {
				// 	throw new Error(`HTTP error! status: ${response.status}`);
				// }

				// const data = await response.json();

				setPatientNames(response.data);

				console.log("Patient names: ", patientNames);
			} catch (error) {
				console.error("Fetching patient names failed: ", error);
			}
		};

		fetchPatientNames();
	}, []);

	const handleChange = (prop) => (event) => {
		setProcessDetails({ ...processDetails, [prop]: event.target.value });
	};

	const handleDateChange = (prop, newValue) => {
		setProcessDetails({ ...processDetails, [prop]: newValue });
	};

	const handleEquipmentChange = (event) => {
		const {
			target: { value },
		} = event;
		setProcessDetails({ ...processDetails, equipment: typeof value === "string" ? value.split(",") : value });
	};

	const handleTaskChange = (sectionIndex, taskIndex, event) => {
		const newSections = processDetails.sections.map((section, sIndex) => {
			if (sIndex === sectionIndex) {
				const newTasks = section.tasks.map((task, tIndex) => (tIndex === taskIndex ? event.target.value : task));
				return { ...section, tasks: newTasks };
			}
			return section;
		});
		setProcessDetails({ ...processDetails, sections: newSections });
	};

	const handleAddTask = (sectionIndex) => {
		const newSections = processDetails.sections.map((section, index) => {
			if (index === sectionIndex) {
				return { ...section, tasks: [...section.tasks, ""] };
			}
			return section;
		});
		setProcessDetails({ ...processDetails, sections: newSections });
	};

	const handleRemoveTask = (sectionIndex, taskIndex) => {
		const newSections = processDetails.sections.map((section, index) => {
			if (index === sectionIndex) {
				const newTasks = section.tasks.filter((_, tIndex) => tIndex !== taskIndex);
				return { ...section, tasks: newTasks };
			}
			return section;
		});
		setProcessDetails({ ...processDetails, sections: newSections });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(processDetails);
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Container>
				<Typography variant="h4" sx={{ mb: 2 }}>
					Create New Process
				</Typography>
				<form onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<FormControl fullWidth>
								<InputLabel id="patient-select-label">Select Patient*</InputLabel>
								<Select
									labelId="patient-select-label"
									id="patient-select"
									value={processDetails.patientId}
									onChange={handleChange("patientId")}
									required
								>
									{patientNames.map((patient) => (
										<MenuItem key={patient.id} value={patient.id}>
											{patient}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>

						<Grid item xs={12}>
							<FormControl fullWidth>
								<InputLabel id="treatment-label">Treatment*</InputLabel>
								<Select
									labelId="treatment-label"
									id="treatment-select"
									value={processDetails.treatment}
									label="Treatment"
									onChange={handleChange("treatment")}
									required
								>
									{treatments.map((treatment) => (
										<MenuItem key={treatment} value={treatment}>
											{treatment}
										</MenuItem>
									))}
									<MenuItem value="Other">Add New...</MenuItem>
								</Select>
							</FormControl>
						</Grid>

						<Grid item xs={12}>
							<FormControl fullWidth>
								<InputLabel id="physician-label">Physician*</InputLabel>
								<Select
									labelId="physician-label"
									id="physician-select"
									value={processDetails.physician}
									label="Physician"
									onChange={handleChange("physician")}
									required
								>
									{physicians.map((physician) => (
										<MenuItem key={physician} value={physician}>
											{physician}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>

						<Grid item xs={6}>
							<DatePicker
								label="Admission Date*"
								value={processDetails.admissionDate}
								onChange={(newValue) => handleDateChange("admissionDate", newValue)}
								renderInput={(params) => <TextField {...params} fullWidth />}
								required
							/>
						</Grid>

						<Grid item xs={6}>
							<DatePicker
								label="Expected Discharge Date*"
								value={processDetails.expectedDischarge}
								onChange={(newValue) => handleDateChange("expectedDischarge", newValue)}
								renderInput={(params) => <TextField {...params} fullWidth />}
								required
							/>
						</Grid>

						<Grid item xs={12}>
							<FormControl fullWidth>
								<InputLabel id="room-label">Room*</InputLabel>
								<Select
									labelId="room-label"
									id="room-select"
									value={processDetails.room}
									label="Room"
									onChange={handleChange("room")}
									required
								>
									{rooms.map((room) => (
										<MenuItem key={room} value={room}>
											{room}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>

						<Grid item xs={12}>
							<FormControl fullWidth>
								<InputLabel id="equipment-label">Equipment*</InputLabel>
								<Select
									labelId="equipment-label"
									id="equipment-select"
									multiple
									value={processDetails.equipment}
									onChange={handleEquipmentChange}
									input={<OutlinedInput id="select-multiple-chip" label="Equipment" />}
									renderValue={(selected) => (
										<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
											{selected.map((value) => (
												<Chip key={value} label={value} />
											))}
										</Box>
									)}
									required
								>
									{equipmentList.map((item) => (
										<MenuItem key={item} value={item}>
											{item}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>

						<Grid item xs={6}>
							<TextField
								fullWidth
								label="Status"
								variant="outlined"
								value={processDetails.status}
								InputProps={{
									readOnly: true,
								}}
							/>
						</Grid>

						<Grid item xs={6}>
							<TextField
								fullWidth
								label="Last Updated"
								variant="outlined"
								value={processDetails.lastUpdated}
								InputProps={{
									readOnly: true,
								}}
							/>
						</Grid>

						{processDetails.sections.map((section, sectionIndex) => (
							<Grid item xs={12} key={sectionIndex}>
								<Typography variant="h6" sx={{ mt: 2 }}>
									{section.name}
								</Typography>
								<List>
									{section.tasks.map((task, taskIndex) => (
										<ListItem key={taskIndex} sx={{ display: "flex", alignItems: "center" }}>
											<TextField
												fullWidth
												label={`Task ${taskIndex + 1}`}
												variant="outlined"
												value={task}
												onChange={(event) => handleTaskChange(sectionIndex, taskIndex, event)}
												sx={{ mr: 1 }}
											/>
											<IconButton onClick={() => handleAddTask(sectionIndex)}>
												<AddCircleOutlineIcon />
											</IconButton>
											{section.tasks.length > 1 && (
												<IconButton onClick={() => handleRemoveTask(sectionIndex, taskIndex)}>
													<RemoveCircleOutlineIcon />
												</IconButton>
											)}
										</ListItem>
									))}
								</List>
							</Grid>
						))}

						<Grid item xs={12}>
							<Button variant="contained" type="submit" sx={{ mt: 2 }}>
								Submit
							</Button>
							<Button onClick={() => setCurrentPage("Processes")} variant="outlined" sx={{ ml: 2, mt: 2 }}>
								Cancel
							</Button>
						</Grid>
					</Grid>
				</form>
			</Container>
		</LocalizationProvider>
	);
}
