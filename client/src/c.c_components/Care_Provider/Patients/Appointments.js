import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Box, Button } from "@mui/material";
import { Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";


import EditAppointment from "./EditAppointment";
import NewAppointment from "./NewAppointment";


export default function Appointments({ setCurrentPage, patientId }) {
	/* 
	Like set current page but for appointments
	Appointments -- all appointments for a patient
	EditAppointment -- edit currently set appointment for a patient
	NewAppointment -- new appointment for a patient
	*/
	const [currentAppointmentPage, setCurrentAppointmentPage] = useState("AllAppointments");
	const [patientAppointments, setPatientAppointments] = useState([]);
	useEffect(() => {
		const fetchPatientAppointments = async () => {
			try {
				const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
				const response = await axios.get(`${baseURL}/api/patients/get_appointments/${patientId}`);
				const appointments = response.data.appointments;
				const promises = appointments.map(async (appointment) => {
					const providerId = appointment.providerAssigned;
					const providerNameResponse = await axios.get(`${baseURL}/api/employees/${providerId}`);
					appointment.providerFullName = `${providerNameResponse.data.employee.firstName} ${providerNameResponse.data.employee.lastName}`;
				});
				await Promise.all(promises);
				setPatientAppointments(appointments);
			} catch (error) {
				console.error('Error fetching patient appointments:', error);
			}
		};
	
		fetchPatientAppointments();
	}, [currentAppointmentPage]);
	
	const getStatusColor = (status) => {
		switch (status) {
			case "Cancelled":
				return "red";
			case "Pending":
				return "#FFC400";
			case "Confirmed":
				return "green";
			default:
				return "1e90ff";
		}
	};


	const [currentAppointment, setCurrentAppointment] = useState({});
	const handleAppointmentClick = (appointment) => {
		setCurrentAppointment(appointment)
		setCurrentAppointmentPage("EditAppointment")
	};

	return (
		<div>
			{currentAppointmentPage === "AllAppointments" && 
				<Box mt="10px">
					<Table>
						<TableHead>
							<TableRow style={{ backgroundColor: "#f2f2f2", fontWeight: "bold", height: "100px", backgroundColor: "#b0b0b0" }}>
								<TableCell>Date-Time</TableCell>
								<TableCell>Provider Assigned</TableCell>
								<TableCell>Type of Procedure</TableCell>
								<TableCell>Status</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{patientAppointments.map((appointment, index) => (
								<TableRow key={index} style={{ backgroundColor: index % 2 === 0 ? "White" : "#f9f9f9" }}>
									<TableCell style={{ color: "blue", textDecoration: "underline" }}>
										<span
											style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
											role="button"
											onClick={() => handleAppointmentClick(appointment)}
										>
											{appointment.dateTime}
										</span>
									</TableCell>
									<TableCell>Dr. {appointment.providerFullName}</TableCell>
									<TableCell>{appointment.typeOfProcedure}</TableCell>
									<TableCell
										style={{
											color: getStatusColor(appointment.status),
										}}
									>
										{appointment.status}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
					<Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
						<Button variant="contained" color="primary" onClick={() => setCurrentAppointmentPage("NewAppointment")}>
							Add New Appointment
						</Button>
					</Box>
				</Box>
			}
			{currentAppointmentPage === "EditAppointment" && <EditAppointment setCurrentAppointmentPage={setCurrentAppointmentPage} patientId={patientId} currentAppointment={currentAppointment}/>}
			{currentAppointmentPage === "NewAppointment" && <NewAppointment setCurrentAppointmentPage={setCurrentAppointmentPage} patientId={patientId}/>}
		</div>
	);
}
