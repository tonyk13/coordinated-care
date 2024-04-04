import React, { useState } from "react";
import Topbanner from "../Top_banner";
import Side_navigation_bar from "../Side_navigation_bar";
import Discussion_Board from "../Discussion_Board/Discussion_Board";
import Profile from ".//Profile/Profile";
import Send_Feedback from ".//Send_Feedback/Send_Feedback";
import Rooms from ".//Rooms/Rooms";
import Equipment from ".//Equipment/Equipment";
// import Equipment from "./Equipment/Equipment";
import EditEquipment from "./Equipment/EditEquipment";
import CreateDiscussionPost from "../Discussion_Board/Create_Discussion_Post";
import Staff from "../Administrator/Faculty&Staff";
import { Box } from "@mui/material";
import Settings from "./Profile/Settings/Settings";

import "../../stylesheets/App.css";

export default function CareProvider() {
	const [currentPage, setCurrentPage] = useState("");

	//  {currentPage === 'User Feedback' && (<Send_Feedback setCurrentPage={setCurrentPage}/>)} <--- Implement Later when send/user feedback conflict is resolved
	return (
		<Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
			<Topbanner setCurrentPage={setCurrentPage} />
			<Box sx={{ display: "flex", flexGrow: 1 }}>
				<Side_navigation_bar setCurrentPage={setCurrentPage} />
				<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
					{currentPage === "Discussion Board" && <Discussion_Board setCurrentPage={setCurrentPage} />}
					{currentPage === "CreateDiscussionPost" && <CreateDiscussionPost setCurrentPage={setCurrentPage} />}
					{currentPage === "Equipment" && <Equipment setCurrentPage={setCurrentPage} />}
					{currentPage === "EditEquipment" && <EditEquipment setCurrentPage={setCurrentPage} />}
					{currentPage === "Staff" && <Staff setCurrentPage={setCurrentPage} />}

					{currentPage === "Settings Page" && <Settings />}

					{currentPage === "profile-screen" && <Profile setCurrentPage={setCurrentPage} />}

					{currentPage === "Rooms" && <Rooms setCurrentPage={setCurrentPage} />}

					{currentPage === "Equipment" && <Equipment setCurrentPage={setCurrentPage} />}
				</Box>
			</Box>
		</Box>
	);
}
