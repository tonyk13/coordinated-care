import React, { useState } from "react";
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
	IconButton,
	Pagination,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

function createData(name, dob, phoneNumber, physician) {
	return { name, dob, phoneNumber, physician };
}

const rows = [
	createData("Scott, Alan", "01/02/2001", "(112)-111-4333", "Dr. Stephan Smith"),
	createData("Scott, Ben", "03/23/1988", "(112)-323-6321", "Dr. Sam Dow"),
	createData("Scott, Jerry", "01/04/1999", "(232)-637-2326", "Dr. Robert Downey"),
	createData("Scott, Jane", "09/08/2006", "(112)-543-3222", "Dr. Mike Ross"),
	createData("Scott, Mary", "10/23/2000", "(217)-838-4342", "Dr. Jessica Pearson"),
	createData("Parker, Peter", "12/25/1999", "(112)-640-4322", "Dr. Jen Parker"),
	createData("Tucker, Chris", "01/01/2001", "(112)-627-4257", "Dr. Sam Dow"),
	createData("Tucker, John", "10/02/1996", "(121)-568-3844", "Dr. Mike Ross"),
	createData("Tucker, Tim", "08/19/1995", "(433)-590-7733", "Dr. Stephan Smith"),
	createData("Tucker, Ben", "09/11/2008", "(112)-478-7306", "Dr. Stephan Smith"),
];

export default function AllPatients({ setCurrentPage }) {
	const [page, setPage] = useState(1);
	const rowsPerPage = 5;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleNameClick = (name) => {
		if (name === "Scott, Alan") {
			// navigate to the sample patient information screen

			setCurrentPage("PatientInformation");
		}
	};

	// Calculate the number of pages
	const count = Math.ceil(rows.length / rowsPerPage);

	// Slice the rows array to only include the rows for the current page
	const currentPageRows = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage);

	return (
		<Box>
			<Typography variant="h6" gutterBottom component="div">
				Patient List
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
							<TableCell align="center">Phone Number</TableCell>
							<TableCell align="center">Physician</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{currentPageRows.map((row) => (
							<TableRow key={row.name}>
								<TableCell component="th" scope="row">
									<span
										onClick={() => handleNameClick(row.name)}
										style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
										role="button"
										tabIndex={0}
									>
										{row.name}
									</span>
								</TableCell>
								<TableCell align="center">{row.dob}</TableCell>
								<TableCell align="center">{row.phoneNumber}</TableCell>
								<TableCell align="center">{row.physician}</TableCell>
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
