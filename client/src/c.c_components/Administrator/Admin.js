import React, { useState } from "react";
import AdminTopbanner from "../AdminTopBanner";
import { Box, Toolbar } from "@mui/material";
import AdminSideNavigationBar from "../AdminSideNavigationBar";
import Discussion_Board from "../Discussion_Board/Discussion_Board";
// import Faculty_Staff from "./Faculty_Staff";
import Equipment from "../Care_Provider/Equipment/Equipment";
import EditEquipment from "../Care_Provider/Equipment/EditEquipment";
import Staff from "../Administrator/Staff";
import Settings from "../Care_Provider/Profile/Settings/Settings";
import Profile from "../Care_Provider/Profile/Profile";
import Rooms from "../Care_Provider/Rooms/Rooms";
import Patients from "../Care_Provider/Patients/AllPatients";
import PatientInformation from "../Care_Provider/Patients/Information";
import Billing from "../Care_Provider/Patients/Billing";
import OrderLabTest from "../Care_Provider/Patients/Order_LabTest";
import CreateDiscussionPost from "../Discussion_Board/Create_Discussion_Post";
import Add_new_faculty from "./Add_new_faculty";
import UserFeedback from "./UserFeedback/UserFeedback";
import Edit_Rooms from "../Care_Provider/Rooms/Edit_Rooms";
import Processes from "../Care_Provider/Processes-Procedures/Processes";
import ViewProcess from "../Care_Provider/Processes-Procedures/ViewProcess";
import EditProcess from "../Care_Provider/Processes-Procedures/EditProcess";
import Create_new_process from "../Care_Provider/Processes-Procedures/Create_new_process";
import Create_new_procedure from "../Care_Provider/Processes-Procedures/Create_new_procedure";

import "../../stylesheets/App.css";
import SpecificFaculty from "./SpecificFaculty";

export default function Admin() {
	const [currentPage, setCurrentPage] = useState("");
	const [nameClicked, setnameClicked] = useState("");
	const [patient, setPatient] = useState(null);

	return (
		<Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
			<AdminTopbanner setCurrentPage={setCurrentPage} />
			<Box sx={{ display: "flex", flexGrow: 1 }}>
				<AdminSideNavigationBar setCurrentPage={setCurrentPage} />
				<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
					{/* {currentPage === "Discussion Board" && <Discussion_Board />} */}
					{/* {currentPage === "Staff" && <Staff />} */}

					{currentPage === "Discussion Board" && <Discussion_Board setCurrentPage={setCurrentPage} />}
					{currentPage === "CreateDiscussionPost" && <CreateDiscussionPost setCurrentPage={setCurrentPage} />}
					{currentPage === "Equipment" && <Equipment setCurrentPage={setCurrentPage} />}
					{currentPage === "EditEquipment" && <EditEquipment setCurrentPage={setCurrentPage} />}
					{currentPage === "Staff" && (
						<Staff setCurrentPage={setCurrentPage} nameClicked={nameClicked} setnameClicked={setnameClicked} />
					)}
					{currentPage === "Settings Page" && <Settings />}
					{currentPage === "profile-screen" && <Profile setCurrentPage={setCurrentPage} />}
					{currentPage === "Rooms" && <Rooms setCurrentPage={setCurrentPage} />}
					{currentPage === "Patients" && <Patients setCurrentPage={setCurrentPage} />}
					{currentPage === "PatientInformation" && <PatientInformation setCurrentPage={setCurrentPage} />}
					{currentPage === "Billing" && <Billing setCurrentPage={setCurrentPage} />}
					{currentPage === "Order Lab Test" && <OrderLabTest setCurrentPage={setCurrentPage} />}
					{currentPage === "Add New Faculty" && <Add_new_faculty setCurrentPage={setCurrentPage} />}
					{currentPage === "View User Feedback" && <UserFeedback />}
					{currentPage === "SpecificFaculty" && <SpecificFaculty nameClicked={nameClicked} />}
					{currentPage === "Edit_Rooms" && <Edit_Rooms setCurrentPage={setCurrentPage} />}

					{currentPage === "Processes" && <Processes setCurrentPage={setCurrentPage} patient={patient} setPatient={setPatient} />}
					{currentPage === "ViewProcess" && <ViewProcess patient={patient} setCurrentPage={setCurrentPage} />}
					{currentPage === "EditProcess" && <EditProcess patient={patient} setCurrentPage={setCurrentPage} />}

					{currentPage === "Create_new_process" && <Create_new_process setCurrentPage={setCurrentPage} />}
					{currentPage === "Create_new_procedure" && <Create_new_procedure setCurrentPage={setCurrentPage} />}
				</Box>
			</Box>
		</Box>
	);
}
