import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Stack, Divider } from "@mui/material";
import axios from 'axios';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';
import { CircularProgress } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';


export default function Dashboard() {

	const [employeeData, setEmployeeData] = useState({});
	const employee_id = Cookies.get("employee_id");
	useEffect(() => {
		const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
		axios.get(`${baseURL}/api/employees/${employee_id}`)
		.then(response => {
			setEmployeeData(response.data.employee)
			})
			.catch(error => {
				console.error('Error fetching employee ID:', error);
			});
	}, []);
	
	const [employeeProcesses, setEmployeeProcesses] = useState([]);
	useEffect(() => {
		const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";

		axios.get(`${baseURL}/api/processes/${employee_id}/get_processes_for_employee`)
			.then(async (response) => {
				const processes = response.data.processes;
				const processPromises = processes.map(async (process) => {
					const patientResponse = await axios.get(`${baseURL}/api/patients/${process.patient}`);
					const patientData = patientResponse.data;
					return { ...process, patientData };
				});
				const updatedProcesses = await Promise.all(processPromises);
				setEmployeeProcesses(updatedProcesses);
			})
			.catch(error => {
				console.error('Error fetching processes:', error);
			});
	}, []);

	console.log(employeeProcesses)

	// const [patientNames, setPatientNames] = useState({});


	return (
		<Box sx={{ width: '100%', overflowX: 'auto', p: 2 }}>
		  <Typography variant="h3">Welcome: {employeeData.firstName} {employeeData.lastName}</Typography>
		  <br/>
		  <Typography variant="h5">My Upcoming Patient's Process Tasks:</Typography>
		  {employeeProcesses.map((process, index) => (
			<Paper key={index} style={{ marginTop: '1vh' }}>
			<Typography variant="h5" style={{ marginLeft: '0.5vh', textDecoration: 'underline', fontWeight:'bold' }}>
				Name: {process.patientData.firstName} {process.patientData.lastName} | DOB: {dayjs(process.patientData.dateOfBirth).format('MM/DD/YYYY')}
			</Typography>
			  {process.sections.map((section, sectionIndex) => (
				<div key={sectionIndex} style={{ marginBottom: '1vh', marginLeft: '0.5vh' }}>
				  <Typography variant="h6" style={{ marginBottom: '0.5vh', marginLeft: '0.5vh' }}>{section.name}</Typography>
				  	{section.tasks.map((task, taskIndex) => (
					<div key={taskIndex} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5vh', marginLeft: '2vh', color: '#1e90ff' }}>
					  <Typography style={{ marginRight: '1vh' }}>{task.name}</Typography>
					  	{task.completed ? <CheckIcon style={{ color: 'green' }} /> : <CircularProgress size={20} color="secondary" />}
					</div>
				  ))}
				</div>
			  ))}
			</Paper>
		  ))}
		</Box>
	  );
	  
}
