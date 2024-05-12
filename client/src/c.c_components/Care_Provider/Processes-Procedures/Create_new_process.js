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

const treatments = ["Chemotherapy", "Physical Therapy", "Surgery"];

const sections = [
	"Pre-Operative Checkup",
	"Pre-Operative Services",
	"Day Prior to Treatment",
	"Intra-Operative",
	"Post Anesthesia Care Unit / Post Discharge",
];

export default function CreateNewProcess({ setCurrentPage }) {
	const [processDetails, setProcessDetails] = useState({
		patientId: "",
		patientDateOfBirth: "",
		treatment: "",
		physician: "",
		admissionDate: dayjs(),
		expectedDischarge: dayjs().add(1, "day"),
		room: "",
		equipment: [],
		status: "Pre-Op",
		lastUpdated: dayjs().format("YYYY-MM-DD"),
		sections: sections.map((section) => ({ name: section, tasks: [{ name: "", employee: "" }] })),
	});

	const [patientNames, setPatientNames] = useState([]);
	const [selectedPatientId, setSelectedPatientId] = useState("");

	const [isOtherTreatment, setIsOtherTreatment] = useState(false);

	const [physicians, setPhysicians] = useState([]);
	const [roomNumbers, setRoomNumbers] = useState([]);
	const [equipmentOptions, setEquipmentOptions] = useState([]);
	const [employees, setEmployees] = useState([]);

	const today = dayjs();

	useEffect(() => {
		const fetchPatientNames = async () => {
			try {
				const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
				const response = await axios.get(`${baseURL}/api/patients/all_patient_names`);

				setPatientNames(response.data);
			} catch (error) {
				console.error("Fetching patient names failed: ", error);
			}
		};

		fetchPatientNames();
	}, []);

	useEffect(() => {
		const fetchPhysicians = async () => {
			try {
				const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
				const response = await axios.get(`${baseURL}/api/employees/all_physician_names`);

				setPhysicians(response.data);
			} catch (error) {
				console.error("Fetching physicians failed: ", error);
			}
		};

		fetchPhysicians();
	}, []);

	useEffect(() => {
		const fetchEmployees = async () => {
			try {
				const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
				const response = await axios.get(`${baseURL}/api/employees`);
				const formattedEmployees = response.data.map((emp) => ({
					...emp,
					fullName: `${emp.firstName} ${emp.middleName ? emp.middleName + " " : ""}${emp.lastName}`,
				}));
				setEmployees(formattedEmployees);
			} catch (error) {
				console.error("Fetching employees failed: ", error);
			}
		};

		fetchEmployees();
	}, []);

	useEffect(() => {
		const fetchRoomNumbers = async () => {
			try {
				const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
				const response = await axios.get(`${baseURL}/api/rooms/all_room_numbers`);
				setRoomNumbers(response.data);
			} catch (error) {
				console.error("Fetching room numbers failed: ", error);
			}
		};

		fetchRoomNumbers();
	}, []);

	useEffect(() => {
		const fetchEquipment = async () => {
			try {
				const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
				const response = await axios.get(`${baseURL}/api/equipment/all_equipment_names`);
				setEquipmentOptions(response.data);
			} catch (error) {
				console.error("Fetching equipment failed: ", error);
			}
		};

		fetchEquipment();
	}, []);

	const handleChangePatient = (event) => {
		const patientId = event.target.value;

		setProcessDetails((prevDetails) => ({
			...prevDetails,
			patientId: patientId,
			patientDateOfBirth: patientNames.find((patient) => patient.id === patientId).dateOfBirth,
		}));

		setSelectedPatientId(patientId);
	};

	const handleDateChange = (prop, newValue) => {
		setProcessDetails({ ...processDetails, [prop]: newValue });
	};

	const handleTreatmentChange = (event) => {
		const newTreatment = event.target.value;
		if (newTreatment === "Other") {
			setIsOtherTreatment(true);
			setProcessDetails((prevDetails) => ({
				...prevDetails,
				treatment: "",
			}));
		} else {
			setIsOtherTreatment(false);
			setProcessDetails((prevDetails) => ({
				...prevDetails,
				treatment: capitalizeFirstLetterOfEachWord(newTreatment),
			}));
		}
	};

	const capitalizeFirstLetterOfEachWord = (string) => {
		return string.replace(/\b(\w)/g, (s) => s.toUpperCase());
	};

	const handleCustomTreatmentChange = (event) => {
		const customTreatment = event.target.value;
		const formattedTreatment = capitalizeFirstLetterOfEachWord(customTreatment);
		setProcessDetails((prevDetails) => ({
			...prevDetails,
			treatment: formattedTreatment,
		}));
	};

	const handlePhysicianChange = (event) => {
		const physicianId = event.target.value;
		setProcessDetails((prevDetails) => ({
			...prevDetails,
			physician: physicianId,
		}));
	};

	const handleRoomChange = (event) => {
		const newRoom = event.target.value;
		setProcessDetails((prevDetails) => ({
			...prevDetails,
			room: newRoom,
		}));
	};

	const handleEquipmentChange = (event) => {
		const { value } = event.target;
		const newEquipment = typeof value === "string" ? value.split(",") : value;
		setProcessDetails({ ...processDetails, equipment: newEquipment });
	};

	const handleTaskChange = (sectionIndex, taskIndex, event) => {
		const newSections = processDetails.sections.map((section, sIndex) => {
			if (sIndex === sectionIndex) {
				const newTasks = section.tasks.map((task, tIndex) => {
					if (tIndex === taskIndex) {
						return { ...task, name: event.target.value };
					}
					return task;
				});
				return { ...section, tasks: newTasks };
			}
			return section;
		});
		setProcessDetails((prevDetails) => ({ ...prevDetails, sections: newSections }));
	};

	const handleEmployeeChange = (sectionIndex, taskIndex, event) => {
		const newSections = processDetails.sections.map((section, sIndex) => {
			if (sIndex === sectionIndex) {
				const newTasks = section.tasks.map((task, tIndex) => {
					if (tIndex === taskIndex) {
						return { ...task, employee: event.target.value };
					}
					return task;
				});
				return { ...section, tasks: newTasks };
			}
			return section;
		});
		setProcessDetails((prevDetails) => ({ ...prevDetails, sections: newSections }));
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

	const handleSubmit = async (event) => {
		event.preventDefault();

		const formattedSections = processDetails.sections.map((section) => ({
			name: section.name,
			tasks: section.tasks
				.filter((task) => task.name.trim() !== "")
				.map((task) => ({
					name: task.name,
					assignedTo: task.employee || undefined,
					lastUpdated: new Date().toISOString(),
					completed: false,
				})),
		}));

		const selectedEquipmentIds = processDetails.equipment.map((equipmentName) => {
			const equipment = equipmentOptions.find((eq) => eq.name === equipmentName);
			return equipment.id;
		});

		const formattedProcessDetails = {
			patient: processDetails.patientId,
			treatment: processDetails.treatment,
			physician: processDetails.physician,
			room: processDetails.room,
			equipment: selectedEquipmentIds,
			dateOfBirth: new Date(processDetails.patientDateOfBirth).toISOString(),
			admissionDate: processDetails.admissionDate.toISOString(),
			expectedDischarge: processDetails.expectedDischarge.toISOString(),
			status: processDetails.status,
			lastUpdated: new Date().toISOString(),
			sections: formattedSections,
		};

		try {
			const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
			const response = await axios.post(`${baseURL}/api/processes`, formattedProcessDetails);

			setCurrentPage("Processes");
		} catch (error) {
			console.error("Failed to create process: ", error);
		}
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
									value={selectedPatientId}
									onChange={handleChangePatient}
									required
								>
									{patientNames.map((patient) => (
										<MenuItem key={patient.id} value={patient.id}>
											{patient.name}
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
									value={isOtherTreatment ? "Other" : processDetails.treatment}
									label="Treatment"
									onChange={handleTreatmentChange}
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
							{isOtherTreatment && (
								<TextField
									fullWidth
									label="Custom Treatment"
									variant="outlined"
									value={processDetails.treatment}
									onChange={handleCustomTreatmentChange}
									sx={{ mt: 2 }}
								/>
							)}
						</Grid>

						<Grid item xs={12}>
							<FormControl fullWidth>
								<InputLabel id="physician-label">Physician*</InputLabel>
								<Select
									labelId="physician-label"
									id="physician-select"
									value={processDetails.physician}
									label="Physician"
									onChange={handlePhysicianChange}
									required
								>
									{physicians.map((physician) => (
										<MenuItem key={physician.id} value={physician.id}>
											{physician.name}
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
								minDate={today}
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
									onChange={handleRoomChange}
									required
								>
									{roomNumbers.map((room) => (
										<MenuItem key={room.id} value={room.id}>
											{room.roomNumber}
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
									{equipmentOptions.map((equipment) => (
										<MenuItem key={equipment.id} value={equipment.name}>
											{equipment.name}
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
										<ListItem key={taskIndex} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
											<TextField
												fullWidth
												label={`Task ${taskIndex + 1}`}
												variant="outlined"
												value={task.name}
												onChange={(event) => handleTaskChange(sectionIndex, taskIndex, event)}
												sx={{ mr: 1 }}
											/>
											<FormControl fullWidth>
												<InputLabel id={`employee-select-label-${sectionIndex}-${taskIndex}`}>
													Assign Employee
												</InputLabel>
												<Select
													labelId={`employee-select-label-${sectionIndex}-${taskIndex}`}
													id={`employee-select-${sectionIndex}-${taskIndex}`}
													value={task.employee}
													onChange={(event) => handleEmployeeChange(sectionIndex, taskIndex, event)}
													label="Assign Employee"
												>
													{employees.map((employee) => (
														<MenuItem key={employee._id} value={employee._id}>
															{employee.fullName}
														</MenuItem>
													))}
												</Select>
											</FormControl>
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
							<Button onClick={handleSubmit} variant="contained" type="submit" sx={{ mt: 2 }}>
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
