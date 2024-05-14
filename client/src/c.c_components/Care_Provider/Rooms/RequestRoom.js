import React, { useState, useEffect } from "react";
import { Button, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";

export default function RequestRoom({ setCurrentPage }) {
	const [rooms, setRooms] = useState([]);
	const [selectedRoom, setSelectedRoom] = useState("");
	const [requestDate, setRequestDate] = useState(null);
	const [employees, setEmployees] = useState([]);
	const [selectedEmployee, setSelectedEmployee] = useState("");
	const [patients, setPatients] = useState([]);
	const [selectedPatient, setSelectedPatient] = useState("");
	const [reservedDates, setReservedDates] = useState([]);

	const isDateReserved = (date) => {
		const dateString = date.toISOString().split("T")[0];

		return reservedDates.some((reservedDate) => new Date(reservedDate).toISOString().split("T")[0] === dateString);
	};

	useEffect(() => {
		const fetchRoomsAndEmployees = async () => {
			try {
				const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";

				const roomData = await axios.get(`${baseURL}/api/rooms`);

				const employeeData = await axios.get(`${baseURL}/api/getAllEmployees`);

				const patientData = await axios.get(`${baseURL}/api/patients`);

				setRooms(roomData.data);

				setEmployees(employeeData.data.data);

				setPatients(patientData.data);
			} catch (error) {
				console.error("Failed to fetch data:", error);
			}
		};

		fetchRoomsAndEmployees();
	}, []);

	useEffect(() => {
		const fetchReservedDates = async () => {
			if (selectedRoom) {
				try {
					const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
					const response = await axios.get(`${baseURL}/api/rooms/${selectedRoom}/reservations`);
					const dates = response.data.map((reservation) => reservation.date);
					setReservedDates(dates);
				} catch (error) {
					console.error("Error fetching reserved dates:", error);
				}
			}
		};

		fetchReservedDates();
	}, [selectedRoom]);

	const handleRequest = async () => {
		if (!selectedRoom || !requestDate || !selectedEmployee) {
			alert("Please fill all the fields.");
			return;
		}

		try {
			const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";

			await axios.put(`${baseURL}/api/room_reservation`, {
				roomId: selectedRoom,
				date: requestDate,
				patientId: selectedPatient,
				employeeId: selectedEmployee,
			});

			alert("Room requested successfully.");
			setCurrentPage("Rooms");
		} catch (error) {
			console.error("Error making request:", error);
			alert("Failed to make the request.");
		}
	};

	const handleCancel = () => {
		setCurrentPage("Rooms");
	};

	return (
		<div>
			<h1>Request Room</h1>
			<FormControl fullWidth>
				<InputLabel id="room-label">Room</InputLabel>
				<Select labelId="room-label" value={selectedRoom} label="Room" onChange={(e) => setSelectedRoom(e.target.value)}>
					{rooms.map((eq) => (
						<MenuItem key={eq._id} value={eq.id}>
							{eq.roomNumber}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<br />
			<br />
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<DatePicker
					label="Next Available Date"
					value={requestDate}
					onChange={(newValue) => setRequestDate(newValue)}
					renderInput={(params) => <TextField {...params} />}
					shouldDisableDate={isDateReserved}
					components={{
						OpenPickerIcon: "KeyboardArrowDown",
						ClearButton: "Clear",
					}}
					componentsProps={{
						textField: {
							fullWidth: true,
							variant: "outlined",
							helperText: "Select the request date",
						},
					}}
				/>
			</LocalizationProvider>
			<br />
			<br />
			<FormControl fullWidth>
				<InputLabel id="patient-label">Patient</InputLabel>
				<Select
					labelId="patient-label"
					value={selectedPatient}
					label="Patient"
					onChange={(e) => setSelectedPatient(e.target.value)}
				>
					{Array.isArray(patients) &&
						patients.map((emp) => <MenuItem key={emp._id} value={emp._id}>{`${emp.firstName} ${emp.lastName}`}</MenuItem>)}
				</Select>
			</FormControl>
			<br />
			<br />
			<FormControl fullWidth>
				<InputLabel id="employee-label">Employee</InputLabel>
				<Select
					labelId="employee-label"
					value={selectedEmployee}
					label="Employee"
					onChange={(e) => setSelectedEmployee(e.target.value)}
				>
					{Array.isArray(employees) &&
						employees.map((emp) => <MenuItem key={emp._id} value={emp._id}>{`${emp.firstName} ${emp.lastName}`}</MenuItem>)}
				</Select>
			</FormControl>
			<br />
			<br />
			<Button onClick={handleRequest} variant="contained" color="primary">
				Request
			</Button>
			<Button onClick={handleCancel} variant="contained" color="error" style={{ marginLeft: "10px" }}>
				Cancel
			</Button>
		</div>
	);
}
