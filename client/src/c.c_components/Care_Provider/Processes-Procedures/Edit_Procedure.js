import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography, Grid, FormControl, MenuItem, Select, InputLabel, Container } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useForm } from "react-hook-form";
import dayjs from 'dayjs';
import Cookies from 'js-cookie';

export default function EditProcedure({ setCurrentPage, procedure }) {
	const inputPhysicianId = Cookies.get("employee_id");
	const { register, handleSubmit } = useForm();
	const parsedCurrentProcedureDateTime = dayjs(procedure.dateTime, "MM/DD/YYYY hh:mm A");
	const [selectedDateTime, setSelectedDateTime] = useState(parsedCurrentProcedureDateTime);
	const patient_id = procedure.patient;
	const procedure_id = procedure._id;

	console.log(procedure);
    const onSubmit = async (data) => {
		data.dateTime = dayjs(selectedDateTime).format('MM/DD/YYYY hh:mm A');
		const procedureData = {
			dateTime: data.dateTime,
			providerAssigned: inputPhysicianId,
			patient: data.patient,
			typeOfProcedure: data.procedure,
			room: data.room,
			_id: procedure_id,
		}
		try {
			const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
			const response = await axios.put(`${baseURL}/api/patients/update_procedure/${patient_id}`, procedureData);
			console.log('procedure created:', procedureData);
		} catch (error) {
			console.error('Error creating procedure:', error);
		}
		setCurrentPage("Procedures");
    };


	const [inputPhysicianName, setInputPhysicianName] = useState("");
    useEffect(() => {
		const fetchPhysician = async () => {
			try {
				const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
				const providerNameResponse = await axios.get(`${baseURL}/api/employees/${inputPhysicianId}`);
				const physicianName = `Dr. ${providerNameResponse.data.employee.firstName} ${providerNameResponse.data.employee.lastName}`;
				setInputPhysicianName(physicianName);
			} catch (error) {
				console.error("Fetching physicians failed: ", error);
			}
		};

		fetchPhysician();
	}, []);

	const [patients, setPatients] = useState([]);
	const [inputPatient, setInputPatient] = useState("");
    useEffect(() => {
		const fetchPatients = async () => {
			try {
				const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
				const response = await axios.get(`${baseURL}/api/patients`);
				setPatients(response.data);
			} catch (error) {
				console.error("Failed to fetch patients:", error);
			}
		};
		fetchPatients();
	}, []);

	const [rooms, setRooms] = useState([]);
	const [inputRoom, setInputRoom] = useState("");
    useEffect(() => {
		const fetchRooms = async () => {
			try {
				const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
				const response = await axios.get(`${baseURL}/api/rooms/all_room_numbers`);
				setRooms(response.data);
			} catch (error) {
				console.error("Failed to fetch rooms:", error);
			}
		};
		fetchRooms();
	}, []);



	return (
		<Container>
			<Typography variant="h4" sx={{ mb: 4, color: "dodgerblue" }}>
				Create New Procedure
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<TextField
					id="physician"
					label="Physician*"
					value={inputPhysicianName}
					readOnly
					fullWidth
					aria-labelledby="physician-label"
					InputProps={{
						style: { pointerEvents: "none", background: "#f0f0f0" },
					}}
				/>
               <TextField
                    fullWidth
                    label="Type of Procedure"	
                    {...register("procedure", { required: "Procedure Type is required" })}
                    margin="normal"
                    required
					sx={{ mb: 2}}
					defaultValue={procedure.typeOfProcedure}
                />
                <FormControl fullWidth sx={{ mb: 2}}>
                    <InputLabel id="patient-label">Patient*</InputLabel>
                    <Select
                        labelId="patient-label"
                        id="patient-select"
                        label="Patient"
                        required
						value={inputPatient || procedure.patient}
						{...register("patient")}
                    >
                        {patients.map((patient) => (
                            <MenuItem key={patient._id} value={patient._id} onClick={() => setInputPatient(patient._id)}>
                                {patient.firstName} {patient.lastName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
				<FormControl fullWidth sx={{ mb: 2}}>
                    <InputLabel id="room-label">Room*</InputLabel>
                    <Select
                        labelId="room-label"
                        id="room-select"
                        label="Room"
                        required
						value={inputRoom || procedure.room}
                        {...register("room")}
                    >
                        {rooms.map((room) => (
                            <MenuItem key={room.id} value={room.id} onClick={() => setInputRoom(room.id)}>
                                {room.roomNumber}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth style={{ marginTop: 8 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            labelId="datetime-label"
                            id="datetime-select"
                            label="Date and Time*"
                            required
							value={selectedDateTime}
                            onChange={setSelectedDateTime}
                            renderInput={(props) => <TextField {...props} />}
                        />
                    </LocalizationProvider>
                </FormControl>
                <Box sx={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: 2 }}>
                    <Button type="submit" variant="contained" color="primary" sx={{ width: "100px" }}>
                        Save
                    </Button>
					<Button onClick={() => setCurrentPage("Procedures")} variant="contained" color="error" sx={{ width: "100px" }}>
                        Cancel
                    </Button>
                </Box>
            </form>
		</Container>
	);
}