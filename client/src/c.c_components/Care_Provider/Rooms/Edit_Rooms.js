import React from "react";
import RoomIcon from "@mui/icons-material/BedroomChild";
import { Button, TextField, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function Edit_Rooms({ setCurrentPage }) {
	const [room, setRoom] = React.useState("");
	const [name, setName] = React.useState("Input");

	const handleChange = (event) => {
		setRoom(event.target.value);
	};

	return (
		<>
			<Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", mb: 2 }}>
				<RoomIcon sx={{ fontSize: 50 }} />
				<h2>Edit Rooms</h2>
			</Box>
			<br />
			<TextField
				fullWidth
				id="field"
				label="Date and Time"
				value={name}
				onChange={(event) => {
					setName(event.target.value);
				}}
			/>
			<br />
			<br />
			<TextField
				fullWidth
				id="field"
				label="Patient *"
				value={name}
				onChange={(event) => {
					setName(event.target.value);
				}}
			/>
			<br />
			<br />
			<TextField
				fullWidth
				id="field"
				label="Attending Nurse"
				value={name}
				onChange={(event) => {
					setName(event.target.value);
				}}
			/>
			<br />
			<br />
			<TextField
				fullWidth
				id="field"
				label="End Date and Time "
				value={name}
				onChange={(event) => {
					setName(event.target.value);
				}}
			/>
			<br />
			<br />

			<Box sx={{ minWidth: 120 }}>
				<FormControl fullWidth>
					<InputLabel id="demo-simple-select-label">Room</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={room}
						label="Room"
						onChange={handleChange}
						fullWidth
					>
						<MenuItem value={"313a"}>313a</MenuItem>
						<MenuItem value={"313b"}>313b</MenuItem>
						<MenuItem value={"313c"}>313c</MenuItem>
					</Select>
				</FormControl>
			</Box>
			<br />
			<TextField
				fullWidth
				id="field"
				label="Equipment"
				value={name}
				onChange={(event) => {
					setName(event.target.value);
				}}
			/>
			<br />
			<br />
			<TextField
				fullWidth
				id="field"
				label="Notes"
				value={name}
				onChange={(event) => {
					setName(event.target.value);
				}}
			/>
			<br />
			<br />

			<br />
			<br />
			<Button variant="contained">Save</Button>
			<Button variant="contained" color="error" sx={{ ml: 5 }} onClick={() => setCurrentPage("Rooms")}>
				Cancel
			</Button>
		</>
	);
}
