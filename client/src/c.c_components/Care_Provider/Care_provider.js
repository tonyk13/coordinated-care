import React from "react";
import Topbanner from "../Top_banner";
import Side_navigation_bar from "../Side_navigation_bar";
import { Box, Toolbar } from "@mui/material";

import "../../stylesheets/App.css";

export default function CareProvider({ setCurrentPage }) {
	return (
		<Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
			<Topbanner />
			<Box sx={{ display: "flex", flexGrow: 1 }}>
				<Side_navigation_bar setCurrentPage={setCurrentPage} />
				<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
					<p>main content</p>
				</Box>
			</Box>
		</Box>
	);
}
