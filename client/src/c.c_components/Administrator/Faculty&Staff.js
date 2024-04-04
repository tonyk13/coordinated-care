import React from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

const defaultValues = {
	textValue: "",
	radioValue: "",
	checkboxValue: [],
	dateValue: new Date(),
	dropdownValue: "",
	sliderValue: 0,
};

const data = [
	{ name: "Dr. Scott, Alan", employeeId: "2323241", phone: "(112)-111-4333", role: "Doctor" },
	{ name: "Dr. Scott, Ben", employeeId: "4343232", phone: "(112)-323-6321", role: "Doctor" },
	{ name: "Dr. Scott, Jerry", employeeId: "343422", phone: "(232)-637-2326", role: "Doctor" },
	{ name: "Dr. Scott, Jane", employeeId: "765454", phone: "(112)-543-3222", role: "Medical Assistant" },
	{ name: "Scott, Mary", employeeId: "5453634", phone: "(217)-838-4342", role: "Medical Assistant" },
	{ name: "Parker, Peter", employeeId: "3463434", phone: "(112)-640-4322", role: "Medical Assistant" },
	{ name: "Tucker, Chris", employeeId: "3436345", phone: "(112)-627-4257", role: "Medical Assistant" },
	{ name: "Tucker, John", employeeId: "3564535", phone: "(121)-568-3844", role: "Medical Assistant" },
	{ name: "Dr. Tucker, Tim", employeeId: "3456344", phone: "(433)-590-7733", role: "Doctor" },
	{ name: "Dr. Tucker, Ben", employeeId: "3434343", phone: "(112)-478-7306", role: "Doctor" },
];

export default function Staff() {
	const { handleSubmit, reset, control, setValue } = useForm({
		defaultValues: defaultValues,
	});

	const onSubmit = (data) => console.log(data);

	return (
		<Box sx={{ display: "flex", flexDirection: "column", height: "85vh" }}>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<TextField
					label="Search"
					type={"text"}
					placeholder="Search"
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),
					}}
					sx={{ width: "30vw", marginRight: "7.5vw" }}
				/>
				<Button variant="contained" sx={{ width: "20vw" }}>
					Add New Faculty/Staff →
				</Button>
			</Box>
			<TableContainer component={Paper} sx={{ maxHeight: "75vh" }}>
				<Table stickyHeader aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Employee ID</TableCell>
							<TableCell>Phone Number</TableCell>
							<TableCell>Role</TableCell>
						</TableRow>
					</TableHead>
					<TableBody sx={{ overflowY: "auto" }}>
						{data.map((row) => (
							<TableRow key={row.name}>
								<TableCell>{row.name}</TableCell>
								<TableCell>{row.employeeId}</TableCell>
								<TableCell>{row.phone}</TableCell>
								<TableCell>{row.role}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
}
