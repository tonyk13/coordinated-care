import React, { useState } from "react";
import Topbanner from "../Top_banner";
import Side_navigation_bar from "../Side_navigation_bar";
import Discussion_Board from "../Discussion_Board/Discussion_Board";
import Profile from ".//Profile/Profile";
import Send_Feedback from ".//Send_Feedback/Send_Feedback";
import Rooms from ".//Rooms/Rooms";
import Equipment from ".//Equipment/Equipment";
import EditEquipment from "./Equipment/EditEquipment";
import CreateDiscussionPost from "../Discussion_Board/Create_Discussion_Post";
import Staff from "../Administrator/Staff";
import { Box } from "@mui/material";
import Settings from "./Profile/Settings/Settings";
import Patients from "../Care_Provider/Patients/AllPatients";
import PatientInformation from "../Care_Provider/Patients/Information";
import Billing from "../Care_Provider/Patients/Billing";
import EditBilling from "../Care_Provider/Patients/EditBilling";
import OrderLabTest from "../Care_Provider/Patients/Order_LabTest";
import Edit_Rooms from "./Rooms/Edit_Rooms";
import Processes from "./Processes-Procedures/Processes";
import ViewProcess from "./Processes-Procedures/ViewProcess";
import EditProcess from "./Processes-Procedures/EditProcess";

import "../../stylesheets/App.css";

export default function CareProvider() {
	const [currentPage, setCurrentPage] = useState("");
	const [patient, setPatient] = useState(null);

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
					{currentPage === "Patients" && <Patients setCurrentPage={setCurrentPage} />}
					{currentPage === "PatientInformation" && <PatientInformation setCurrentPage={setCurrentPage} />}
					{currentPage === "Billing" && <Billing setCurrentPage={setCurrentPage} />}
					{currentPage === "EditBilling" && <EditBilling setCurrentPage={setCurrentPage} />}
					{currentPage === "Order Lab Test" && <OrderLabTest setCurrentPage={setCurrentPage} />}
					{currentPage === "Edit_Rooms" && <Edit_Rooms setCurrentPage={setCurrentPage} />}
					{currentPage === "Processes" && <Processes setCurrentPage={setCurrentPage} patient={patient} setPatient={setPatient} />}
					{currentPage === "ViewProcess" && <ViewProcess patient={patient} setCurrentPage={setCurrentPage} />}
					{currentPage === "EditProcess" && <EditProcess patient={patient} setCurrentPage={setCurrentPage} />}
				</Box>
			</Box>
		</Box>
	);
}
