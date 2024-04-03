import React from "react";
import { Box, Button } from "@mui/material";

export default function Equipment({ setCurrentPage }) {
	const handleClick = () => {
		console.log("Navigating to: Edit Equipment");
		setCurrentPage("editEquipment");
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
			<Box sx={{ display: "flex", flexGrow: 1 }}>
				<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
					<Button onClick={() => handleClick()}>"Edit an equipment"</Button>
				</Box>
			</Box>
		</Box>
	);
}
