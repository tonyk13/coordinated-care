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
import Messages from "../Messages/Messages";
import Staff from "../Administrator/Staff";
import { Box } from "@mui/material";
import Settings from "./Profile/Settings/Settings";
import Patients from "../Care_Provider/Patients/AllPatients";
import PatientInformation from "../Care_Provider/Patients/Information";
import Billing from "../Care_Provider/Patients/Billing";
import EditBilling from "../Care_Provider/Patients/EditBilling";
import OrderLabTest from "../Care_Provider/Patients/Order_LabTest";
import Edit_Rooms from "./Rooms/Edit_Rooms";
import ViewProcess from "./Processes-Procedures/ViewProcess";
import EditProcess from "./Processes-Procedures/EditProcess";
import MyProcedures from "./Processes-Procedures/MyProcedures";
import Processes from "./Processes-Procedures/Processes";
// import Procedures from "./Processes-Procedures/Procedures";
import Create_new_process from "./Processes-Procedures/Create_new_process";
import Create_new_procedure from "./Processes-Procedures/Create_new_procedure";
import EditProcedure from "../Care_Provider/Processes-Procedures/Edit_Procedure";
import EditAppointment from "../Care_Provider/Patients/EditAppointment";
import UploadPatientDocument from "../Care_Provider/Patients/UploadPatientDocument";
import ViewPatientDocument from "./Patients/ViewPatientDocument";

import "../../stylesheets/App.css";
import Dashboard from "./Dashboard";

export default function CareProvider() {
	const [currentPage, setCurrentPage] = useState("Dashboard");
	const [patient, setPatient] = useState(null);
	const [selectedTab, setSelectedTab] = useState(0);

	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const handleCloseSnackbar = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setSnackbarOpen(false);
	};

	const [fileId, setFileId] = useState("");

	//  {currentPage === 'User Feedback' && (<Send_Feedback setCurrentPage={setCurrentPage}/>)} <--- Implement Later when send/user feedback conflict is resolved
	return (
		<Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
			<Topbanner setCurrentPage={setCurrentPage} />
			<Box sx={{ display: "flex", flexGrow: 1 }}>
				<Side_navigation_bar setCurrentPage={setCurrentPage} />
				<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
					{currentPage === "Dashboard" && <Dashboard setCurrentPage={setCurrentPage} />}
					{currentPage === "Discussion Board" && <Discussion_Board setCurrentPage={setCurrentPage} />}
					{currentPage === "CreateDiscussionPost" && <CreateDiscussionPost setCurrentPage={setCurrentPage} />}
					{currentPage === "Equipment" && <Equipment setCurrentPage={setCurrentPage} />}
					{currentPage === "EditEquipment" && <EditEquipment setCurrentPage={setCurrentPage} />}
					{currentPage === "Staff" && <Staff setCurrentPage={setCurrentPage} />}
					{currentPage === "Settings Page" && <Settings />}
					{currentPage === "profile-screen" && <Profile setCurrentPage={setCurrentPage} />}
					{currentPage === "send-feedback" && <Send_Feedback setCurrentPage={setCurrentPage} />}
					{currentPage === "Rooms" && <Rooms setCurrentPage={setCurrentPage} />}
					{currentPage === "Patients" && (
						<Patients
							setCurrentPage={setCurrentPage}
							snackbarOpen={snackbarOpen}
							setSnackbarOpen={setSnackbarOpen}
							handleCloseSnackbar={handleCloseSnackbar}
							patient={patient}
							setPatient={setPatient}
						/>
					)}
					{currentPage === "PatientInformation" && (
						<PatientInformation
							selectedTab={selectedTab}
							setSelectedTab={setSelectedTab}
							setCurrentPage={setCurrentPage}
							patient={patient}
							setPatient={setPatient}
							fileId={fileId}
							setFileId={setFileId}
						/>
					)}
					{currentPage === "Billing" && <Billing setCurrentPage={setCurrentPage} />}
					{currentPage === "EditBilling" && <EditBilling setCurrentPage={setCurrentPage} />}
					{currentPage === "Order Lab Test" && <OrderLabTest setCurrentPage={setCurrentPage} />}
					{currentPage === "Edit_Rooms" && <Edit_Rooms setCurrentPage={setCurrentPage} />}
					{currentPage === "Processes" && <Processes setCurrentPage={setCurrentPage} patient={patient} setPatient={setPatient} />}
					{currentPage === "ViewProcess" && <ViewProcess patient={patient} setCurrentPage={setCurrentPage} />}
					{currentPage === "EditProcess" && (
						<EditProcess patient={patient} setPatient={setPatient} setCurrentPage={setCurrentPage} />
					)}
					{currentPage === "Procedures" && <MyProcedures setCurrentPage={setCurrentPage} />}
					{/* {currentPage === "Procedures" && <Procedures setCurrentPage={setCurrentPage}/>} */}
					{currentPage === "Create_new_process" && <Create_new_process setCurrentPage={setCurrentPage} />}
					{currentPage === "Create_new_procedure" && <Create_new_procedure setCurrentPage={setCurrentPage} />}
					{currentPage === "EditProcedure" && <EditProcedure setCurrentPage={setCurrentPage} />}
					{currentPage === "Messages" && <Messages setCurrentPage={setCurrentPage} />}
					{currentPage === "EditAppointment" && <EditAppointment setCurrentPage={setCurrentPage} />}
					{currentPage === "UploadPatientDocument" && <UploadPatientDocument patient={patient} setCurrentPage={setCurrentPage} />}
					{currentPage === "ViewPatientDocument" && (
						<ViewPatientDocument setCurrentPage={setCurrentPage} patient={patient} fileId={fileId} setFileId={setFileId} />
					)}
				</Box>
			</Box>
		</Box>
	);
}
