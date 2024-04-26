import React, { useState, useEffect } from "react";
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Typography,
	TextField,
	InputAdornment,
	Pagination,
	Button,
	Snackbar,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import axios from "axios";

export default function AllPatients({ setCurrentPage, snackbarOpen, setSnackbarOpen, setPatient }) {
	const [patients, setPatients] = useState([]);
	const [page, setPage] = useState(1);
	const rowsPerPage = 5;

	useEffect(() => {
		const fetchPatients = async () => {
			try {
				const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";
				const response = await axios.get(`${apiUrl}/api/patients`);

				setPatients(response.data);
			} catch (error) {
				console.error("Failed to fetch patients:", error);
			}
		};

		fetchPatients();
	}, []);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleNameClick = (patientt) => {
		setPatient(patientt);
		console.log("Patient clicked", patientt);
		setCurrentPage("PatientInformation");
	};
	const handleNewPatient = () => {
		setCurrentPage("newPatientForm");
	};

	// Calculate the number of pages
	const count = Math.ceil(patients.length / rowsPerPage);

	// Slice the rows array to only include the rows for the current page
	const currentPageRows = patients.slice((page - 1) * rowsPerPage, page * rowsPerPage);

	return (
		<Box>
			<Typography variant="h6" gutterBottom component="div">
				All Patients
			</Typography>
			<Box sx={{ mb: 2 }}>
				<TextField
					id="search"
					type="search"
					variant="outlined"
					placeholder="Search"
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),
					}}
					sx={{ width: "30vw" }}
				/>
				<Button variant="contained" sx={{ ml: 4, mt: 1 }} onClick={handleNewPatient}>
					Add new Patient
				</Button>
			</Box>
			<TableContainer component={Paper} sx={{ maxHeight: "70vh", overflow: "auto" }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell align="center">D.O.B</TableCell>
							<TableCell align="center">Phone Number</TableCell>
							<TableCell align="center">Physician</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{currentPageRows.map((row) => (
							<TableRow key={row.name}>
								<TableCell component="th" scope="row">
									<span
										onClick={() => handleNameClick(row)}
										style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
										role="button"
										tabIndex={0}
									>
										{row.firstName} {row.lastName}
									</span>
								</TableCell>
								<TableCell align="center">
									{(() => {
    									const date = new Date(row.dateOfBirth); 
    									date.setDate(date.getDate() + 1); 
   											 return date.toLocaleDateString("en-US", {
       											 year: "numeric",
       											 month: "long",
       											 day: "numeric",
   										 });
									})()}
								</TableCell>
								<TableCell align="center">{row.phoneNumber}</TableCell>
								<TableCell align="center">Dr. {row.physician}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
				<Pagination count={count} page={page} onChange={handleChangePage} color="primary" />
			</Box>
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={6000}
				onClose={() => setSnackbarOpen(false)}
				message="Patient Added successfully"
			/>
		</Box>
	);
}
