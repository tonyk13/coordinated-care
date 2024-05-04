import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import Cookies from "js-cookie";
import EditProcedure from "../Processes-Procedures/Edit_Procedure";

const MyProcedures = ({ setCurrentPage, currentPage, currentProcedure, setCurrentProcedure }) => {
	const [employeeProcedures, setEmployeeProcedures] = useState([]);	
	useEffect(() => {
		const employee_id = Cookies.get("employee_id");
		const fetchPatientProcedures = async () => {
			try {
				const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
				const response = await axios.get(`${baseURL}/api/patients/get_procedures_for_employee/${employee_id}`);
				const procedures = response.data.procedures;
				const patientInfoOfProcedures = response.data.patientInfoOfProcedure
				for (let i = 0; i < procedures.length; i++) {
					procedures[i].patientFirstName = patientInfoOfProcedures[i].patientFirstName;
					procedures[i].patientLastName = patientInfoOfProcedures[i].patientLastName;
					procedures[i].patient = patientInfoOfProcedures[i].patient;
				}
				const promises = procedures.map(async (procedure) => {
					const providerId = procedure.providerAssigned;
					const providerNameResponse = await axios.get(`${baseURL}/api/employees/${providerId}`);
					procedure.providerFullName = `${providerNameResponse.data.employee.firstName} ${providerNameResponse.data.employee.lastName}`;
				});
				await Promise.all(promises);

                const promises2 = procedures.map(async (procedure) => {
					const roomId = procedure.room;
					const roomResponse = await axios.get(`${baseURL}/api/rooms/${roomId}`);
					procedure.roomNumber = `${roomResponse.data.roomNumber}`;
				});
				await Promise.all(promises2);
				setEmployeeProcedures(procedures);
			} catch (error) {
				console.error('Error fetching patient appointments:', error);
			}
		};
	
		fetchPatientProcedures();
	}, []);

	const handleNewProcedureClick = () => {
		setCurrentPage("Create_new_procedure");
	};




	
	const hadnleProcedureClick = (procedure) => {
		setCurrentProcedure(procedure);
		setCurrentPage("EditProcedure");
	};

	return (
		<div>
		{currentPage === "Procedures" &&
			<TableContainer component={Paper}>
				<Typography variant="h6" component="div" sx={{ padding: 2 }}>
					My Assigned Procedures
				</Typography>
				<Button variant="contained" onClick={handleNewProcedureClick} sx={{ ml: 2 }}>
					Create New Procedure
				</Button>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
								<TableCell>Date-Time</TableCell>
								<TableCell>Patient</TableCell>
								<TableCell>Provider Assigned</TableCell>
								<TableCell>Type of Procedure</TableCell>
								<TableCell>Location</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
							{employeeProcedures.map((procedure, index) => (
								<TableRow key={index}>
									<TableCell style={{ color: "blue", textDecoration: "underline" }}>
										<span
											style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
											role="button"
											onClick={() => hadnleProcedureClick(procedure)}
										>
											{procedure.dateTime}
										</span>
									</TableCell>
									<TableCell>{procedure.patientFirstName} {procedure.patientLastName}</TableCell>
									<TableCell>Dr. {procedure.providerFullName}</TableCell>
									<TableCell>{procedure.typeOfProcedure}</TableCell>
									<TableCell>{procedure.roomNumber}</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
		}
		</div>
	);
};

export default MyProcedures;
