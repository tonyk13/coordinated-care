import React, { useState } from "react";
import Topbanner from "../Top_banner";
import Side_navigation_bar from "../Side_navigation_bar";
import Discussion_Board from "../Discussion_Board/Discussion_Board";
import Equipment from "./Equipment/Equipment";
import EditEquipment from "./Equipment/EditEquipment";
import CreateDiscussionPost from "../Discussion_Board/Create_Discussion_Post";
import Staff from "../Administrator/Faculty&Staff";
import { Box } from "@mui/material";

import "../../stylesheets/App.css";

export default function CareProvider() {
	const [currentPage, setCurrentPage] = useState("");

	return (
		<Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
			<Topbanner />
			<Box sx={{ display: "flex", flexGrow: 1 }}>
				<Side_navigation_bar setCurrentPage={setCurrentPage} />
				<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
					{currentPage === "Discussion Board" && <Discussion_Board setCurrentPage={setCurrentPage} />}
					{currentPage === "CreateDiscussionPost" && <CreateDiscussionPost setCurrentPage={setCurrentPage} />}
					{currentPage === "Equipment" && <Equipment setCurrentPage={setCurrentPage} />}
					{currentPage === "EditEquipment" && <EditEquipment setCurrentPage={setCurrentPage} />}
					{currentPage === "Staff" && <Staff setCurrentPage={setCurrentPage} />}
				</Box>
			</Box>
		</Box>
	);
}
