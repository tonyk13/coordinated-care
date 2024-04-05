import React, { useState } from "react";
import {
	Box,
	Button,
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
	IconButton,
	Pagination,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

function createData(name, dob, treatment, physician, admissionDate, expectedDischarge, room, status, lastUpdated) {
	return {
		name,
		dob,
		treatment,
		physician,
		admissionDate,
		expectedDischarge,
		room,
		status,
		lastUpdated,
	};
}

const rows = [
	createData("Scott, Alan", "01/02/2001", "Appendectomy", "Dr. Stephan Smith", "01/01/2024", "01/07/2024", "12B", "Recovery", "10:00 AM"),
	createData("Smith, John", "02/17/1998", "Cholecystectomy", "Dr. Laura Jones", "02/12/2024", "02/20/2024", "14A", "Post-Op", "09:45 AM"),
	createData(
		"Johnson, Emily",
		"03/22/1985",
		"Tonsillectomy",
		"Dr. Michael Brown",
		"03/15/2024",
		"03/18/2024",
		"18C",
		"Recovery",
		"02:30 PM"
	),
	createData("Lee, David", "05/06/1990", "ACL Repair", "Dr. Sarah Evans", "05/01/2024", "05/10/2024", "21D", "Surgery", "11:00 AM"),
	createData("Kim, Jessica", "07/29/1975", "Hip Replacement", "Dr. James Lee", "07/25/2024", "08/02/2024", "25F", "Recovery", "01:20 PM"),
	createData(
		"Davis, Angela",
		"08/11/1966",
		"Coronary Artery Bypass Graft",
		"Dr. Emily Taylor",
		"08/05/2024",
		"08/25/2024",
		"29G",
		"ICU",
		"08:10 AM"
	),
	createData(
		"Martinez, Carlos",
		"09/15/1970",
		"Hernia Repair",
		"Dr. William Martinez",
		"09/10/2024",
		"09/12/2024",
		"33H",
		"Recovery",
		"03:50 PM"
	),
	createData(
		"Hernandez, Patricia",
		"11/08/1982",
		"Cataract Surgery",
		"Dr. Karen Wilson",
		"11/02/2024",
		"11/04/2024",
		"36J",
		"Post-Op",
		"10:15 AM"
	),
	createData(
		"Brown, Richard",
		"12/30/1993",
		"Laminectomy",
		"Dr. David Thomas",
		"12/25/2024",
		"01/05/2025",
		"40K",
		"Recovery",
		"09:00 AM"
	),
	createData(
		"Garcia, Elizabeth",
		"10/24/2000",
		"Spinal Fusion",
		"Dr. Patricia Garcia",
		"10/20/2024",
		"11/01/2024",
		"45L",
		"Surgery",
		"12:00 PM"
	),
];

export default function Processes({ setCurrentPage, patient, setPatient }) {
	const [page, setPage] = useState(1);
	const rowsPerPage = 5;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleNameClick = (patientData) => {
		setPatient(patientData);
		setCurrentPage("ViewProcess");
	};

	const handleNewProcessClick = (event) => {
		setCurrentPage("Create_new_process");
	};

	const count = Math.ceil(rows.length / rowsPerPage);

	const currentPageRows = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage);

	return (
		<Box>
			<Typography variant="h6" gutterBottom component="div">
				All Processes
			</Typography>
			<Button variant="contained" onClick={handleNewProcessClick}>
				{" "}
				Add new Process
			</Button>
			<Box sx={{ mb: 2 }}>
				<TextField
					id="search"
					type="search"
					variant="outlined"
					placeholder="Search"
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<IconButton>
									<SearchIcon />
								</IconButton>
							</InputAdornment>
						),
					}}
					sx={{ width: "30vw" }}
				/>
			</Box>
			<TableContainer component={Paper} sx={{ maxHeight: "70vh", overflow: "auto" }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell align="center">D.O.B</TableCell>
							<TableCell align="center">Treatment</TableCell>
							<TableCell align="center">Physician</TableCell>
							<TableCell align="center">Admission Date</TableCell>
							<TableCell align="center">Expected Discharge</TableCell>
							<TableCell align="center">Room</TableCell>
							<TableCell align="center">Status</TableCell>
							<TableCell align="center">Last Updated</TableCell>
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
										{row.name}
									</span>
								</TableCell>
								<TableCell align="center">{row.dob}</TableCell>
								<TableCell align="center">{row.treatment}</TableCell>
								<TableCell align="center">{row.physician}</TableCell>
								<TableCell align="center">{row.admissionDate}</TableCell>
								<TableCell align="center">{row.expectedDischarge}</TableCell>
								<TableCell align="center">{row.room}</TableCell>
								<TableCell align="center">{row.status}</TableCell>
								<TableCell align="center">{row.lastUpdated}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
				<Pagination count={count} page={page} onChange={handleChangePage} color="primary" />
			</Box>
		</Box>
	);
}
