import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, TextField, Grid, Typography, Box, Link, Container, Pagination, Avatar } from "@mui/material";

// Extra mui materials for Table (datatable is outdated)
import { Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";

export default function Procedures({ patientId }) {
	/* 
	Like set current page but for procedure
	AllProcedures -- all procedures for a patient
	EditProcedures -- edit currently set appointment for a patient
	NewProcdure -- new appointment for a patient
	*/
    const [patientProcedures, setPatientProcedures] = useState([]);
	useEffect(() => {
		const fetchPatientProcedures = async () => {
			try {
				const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
				const response = await axios.get(`${baseURL}/api/patients/get_procedures/${patientId}`);
				const procedures = response.data.procedures;
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
				setPatientProcedures(procedures);
			} catch (error) {
				console.error('Error fetching patient appointments:', error);
			}
		};
	
		fetchPatientProcedures();
	}, []);


	return (
        <div>
            <Box mt="10px">
                <Table>
                    <TableHead>
                        <TableRow style={{ backgroundColor: "#f2f2f2", fontWeight: "bold", height: "100px", backgroundColor: "#b0b0b0" }}>
                            <TableCell>Date-Time</TableCell>
                            <TableCell>Provider Assigned</TableCell>
                            <TableCell>Type of Procedure</TableCell>
                            <TableCell>Location</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {patientProcedures.map((procedure, index) => (
                            <TableRow key={index} style={{ backgroundColor: index % 2 === 0 ? "White" : "#f9f9f9" }}>
                                <TableCell style={{ color: "blue", textDecoration: "underline" }}>{procedure.dateTime}</TableCell>
                                <TableCell>Dr. {procedure.providerFullName}</TableCell>
                                <TableCell>{procedure.typeOfProcedure}</TableCell>
                                <TableCell>{procedure.roomNumber}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </div>
    );
}
