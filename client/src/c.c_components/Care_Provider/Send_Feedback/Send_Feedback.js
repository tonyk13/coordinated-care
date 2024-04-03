import React from "react";
import { Box, Button } from "@mui/material";
import Topbanner from "../../Top_banner";
import Side_navigation_bar from "../../Side_navigation_bar";

export default function SendFeedback({ setCurrentPage }) {
	const handleClick = () => {
		console.log("Navigating to: Edit Equipment");
		setCurrentPage("editEquipment");
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
			<Topbanner />
			<Box sx={{ display: "flex", flexGrow: 1 }}>
				<Side_navigation_bar setCurrentPage={setCurrentPage} />
				<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
					<Button onClick={() => handleClick()}>"Edit an equipment"</Button>
				</Box>
			</Box>
		</Box>
	);
}
