import React, { useState, useEffect } from "react";
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
	CircularProgress,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import axios from "axios";

export default function Processes({ setCurrentPage, patient, setPatient }) {
	const [isLoading, setIsLoading] = useState(false);

	const [page, setPage] = useState(1);
	const [rows, setRows] = useState([]);
	const [filteredRows, setFilteredRows] = useState([]);

	const [searchTerm, setSearchTerm] = useState("");

	const rowsPerPage = 5;

	const [sortField, setSortField] = useState("");
	const [sortOrder, setSortOrder] = useState("asc");

	useEffect(() => {
		const fetchProcesses = async () => {
			setIsLoading(true);
			try {
				const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
				const response = await axios.get(`${baseURL}/api/processes`);
				setRows(response.data);
				setFilteredRows(response.data);
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching processes", error);
				setIsLoading(false);
				// handle error
			}
		};

		fetchProcesses();
	}, []);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value.toLowerCase());
	};

	const handleNameClick = (row) => {
		setPatient(row);
		setCurrentPage("ViewProcess");
	};

	const handleNewProcessClick = (event) => {
		setCurrentPage("Create_new_process");
	};

	const handleSort = (field) => {
		const isAsc = sortField === field && sortOrder === "asc";
		setSortOrder(isAsc ? "desc" : "asc");
		setSortField(field);

		const sorted = [...filteredRows].sort((a, b) => {
			if (a[field] < b[field]) {
				return sortOrder === "asc" ? -1 : 1;
			}
			if (a[field] > b[field]) {
				return sortOrder === "asc" ? 1 : -1;
			}
			return 0;
		});

		setFilteredRows(sorted);
	};

	useEffect(() => {
		const filtered = rows.filter((row) => {
			return (
				row.patientName.toLowerCase().includes(searchTerm) ||
				row.dateOfBirth.toLowerCase().includes(searchTerm) ||
				row.treatment.toLowerCase().includes(searchTerm) ||
				row.employeeName.toLowerCase().includes(searchTerm) ||
				row.admissionDate.toLowerCase().includes(searchTerm) ||
				row.expectedDischarge.toLowerCase().includes(searchTerm) ||
				row.roomNumber.toLowerCase().includes(searchTerm) ||
				row.status.toLowerCase().includes(searchTerm) ||
				row.lastUpdated.toLowerCase().includes(searchTerm)
			);
		});
		setFilteredRows(filtered);
	}, [rows, searchTerm]);

	const currentPageRows = filteredRows.slice((page - 1) * rowsPerPage, page * rowsPerPage);

	const count = Math.ceil(filteredRows.length / rowsPerPage);

	return (
		<Box>
			<Typography variant="h6" gutterBottom component="div">
				All Processes
			</Typography>
			<Button variant="contained" onClick={handleNewProcessClick} sx={{ mb: 2 }}>
				Add new Process
			</Button>
			<Box sx={{ mb: 2 }}>
				<TextField
					id="search"
					type="search"
					variant="outlined"
					placeholder="Search"
					value={searchTerm}
					onChange={handleSearchChange}
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
				{isLoading ? (
					<Box display="flex" justifyContent="center" alignItems="center" height="100%">
						<CircularProgress />
					</Box>
				) : (
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								{[
									{ label: "Name", field: "patientName" },
									{ label: "Date of Birth", field: "dateOfBirth" },
									{ label: "Treatment", field: "treatment" },
									{ label: "Physician", field: "employeeName" },
									{ label: "Admission Date", field: "admissionDate" },
									{ label: "Expected Discharge", field: "expectedDischarge" },
									{ label: "Room", field: "roomNumber" },
									{ label: "Status", field: "status" },
									{ label: "Last Updated", field: "lastUpdated" },
								].map((headCell) => (
									<TableCell
										key={headCell.field}
										align="center"
										sortDirection={sortField === headCell.field ? sortOrder : false}
										onClick={() => handleSort(headCell.field)}
										style={{ cursor: "pointer" }}
									>
										{headCell.label}
									</TableCell>
								))}
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
											{row.patientName}
										</span>
									</TableCell>
									<TableCell align="center">{row.dateOfBirth}</TableCell>
									<TableCell align="center">{row.treatment}</TableCell>
									<TableCell align="center">{row.employeeName}</TableCell>
									<TableCell align="center">{row.admissionDate}</TableCell>
									<TableCell align="center">{row.expectedDischarge}</TableCell>
									<TableCell align="center">{row.roomNumber}</TableCell>
									<TableCell align="center">{row.status}</TableCell>
									<TableCell align="center">{row.lastUpdated}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
			</TableContainer>
			<Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
				<Pagination count={count} page={page} onChange={handleChangePage} color="primary" />
			</Box>
		</Box>
	);
}
