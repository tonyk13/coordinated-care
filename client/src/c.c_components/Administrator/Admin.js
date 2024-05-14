import React, { useState } from "react";
import AdminTopbanner from "../AdminTopBanner";
import { Box } from "@mui/material";
import AdminSideNavigationBar from "../AdminSideNavigationBar";
import Discussion_Board from "../Discussion_Board/Discussion_Board";
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
import Messages from "../Messages/Messages";
import Add_new_faculty from "./Add_new_faculty";
import UserFeedback from "./UserFeedback/UserFeedback";
import ViewRoom from "../Care_Provider/Rooms/ViewRoom";
import Processes from "../Care_Provider/Processes-Procedures/Processes";
import ViewProcess from "../Care_Provider/Processes-Procedures/ViewProcess";
import EditProcess from "../Care_Provider/Processes-Procedures/EditProcess";
import Create_new_process from "../Care_Provider/Processes-Procedures/Create_new_process";
import Create_new_procedure from "../Care_Provider/Processes-Procedures/Create_new_procedure";
import AccountRequests from "./AccountRequests";
import NewPatientForm from "./NewPatientForm";
import EditProcedure from "../Care_Provider/Processes-Procedures/Edit_Procedure";
import EditAppointment from "../Care_Provider/Patients/EditAppointment";
import UploadPatientDocument from "../Care_Provider/Patients/UploadPatientDocument";
import ViewPatientDocument from "../Care_Provider/Patients/ViewPatientDocument";
import AddEquipment from "../Care_Provider/Equipment/AddEquipment";
import RequestEquipment from "../../c.c_components/Care_Provider/Equipment/RequestEquipment";
import "../../stylesheets/App.css";
import SpecificFaculty from "./SpecificFaculty";
import AddComment from "../Discussion_Board/AddComment";
import AddRoom from "../Care_Provider/Rooms/AddRoom";
import RequestRoom from "../Care_Provider/Rooms/RequestRoom";

export default function Admin() {
	const [currentPage, setCurrentPage] = useState("Processes");
	const [IdClicked, setIdClicked] = useState("");
	const [patient, setPatient] = useState(null);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const handleCloseSnackbar = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setSnackbarOpen(false);
	};

	const [selectedTab, setSelectedTab] = useState(0);
	const [fileId, setFileId] = useState("");
	const [selectedDocument, setSelectedDocument] = useState(null);

	const [selectedRoom, setSelectedRoom] = useState(null);

	const [discussionId, setDiscussionId] = useState(null);

	return (
		<Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
			<AdminTopbanner setCurrentPage={setCurrentPage} />
			<Box sx={{ display: "flex", flexGrow: 1 }}>
				<AdminSideNavigationBar setCurrentPage={setCurrentPage} />
				<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
					{currentPage === "Discussion Board" && (
						<Discussion_Board setCurrentPage={setCurrentPage} discussionId={discussionId} setDiscussionId={setDiscussionId} />
					)}
					{currentPage === "CreateDiscussionPost" && <CreateDiscussionPost setCurrentPage={setCurrentPage} />}
					{currentPage === "Equipment" && <Equipment setCurrentPage={setCurrentPage} />}
					{currentPage === "EditEquipment" && <EditEquipment setCurrentPage={setCurrentPage} />}
					{currentPage === "Staff" && (
						<Staff
							setCurrentPage={setCurrentPage}
							IdClicked={IdClicked}
							setIdClicked={setIdClicked}
							snackbarOpen={snackbarOpen}
							setSnackbarOpen={setSnackbarOpen}
							handleCloseSnackbar={handleCloseSnackbar}
						/>
					)}
					{currentPage === "Settings Page" && <Settings />}
					{currentPage === "profile-screen" && <Profile setCurrentPage={setCurrentPage} />}
					{currentPage === "Rooms" && <Rooms setCurrentPage={setCurrentPage} setSelectedRoom={setSelectedRoom} />}
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
							selectedDocument={selectedDocument}
							setSelectedDocument={setSelectedDocument}
						/>
					)}
					{currentPage === "Billing" && <Billing setCurrentPage={setCurrentPage} />}
					{currentPage === "Order Lab Test" && <OrderLabTest setCurrentPage={setCurrentPage} />}
					{currentPage === "Add New Faculty" && (
						<Add_new_faculty
							setCurrentPage={setCurrentPage}
							snackbarOpen={snackbarOpen}
							setSnackbarOpen={setSnackbarOpen}
							handleCloseSnackbar={handleCloseSnackbar}
						/>
					)}
					{currentPage === "View User Feedback" && <UserFeedback />}
					{currentPage === "SpecificFaculty" && <SpecificFaculty IdClicked={IdClicked} />}
					{currentPage === "ViewRoom" && <ViewRoom setCurrentPage={setCurrentPage} selectedRoom={selectedRoom} />}
					{currentPage === "Processes" && <Processes setCurrentPage={setCurrentPage} patient={patient} setPatient={setPatient} />}
					{currentPage === "ViewProcess" && <ViewProcess patient={patient} setCurrentPage={setCurrentPage} />}
					{currentPage === "EditProcess" && (
						<EditProcess patient={patient} setPatient={setPatient} setCurrentPage={setCurrentPage} />
					)}
					{currentPage === "Create_new_process" && <Create_new_process setCurrentPage={setCurrentPage} />}
					{currentPage === "Create_new_procedure" && <Create_new_procedure setCurrentPage={setCurrentPage} />}
					{currentPage === "EditProcedure" && <EditProcedure setCurrentPage={setCurrentPage} />}
					{currentPage === "EditAppointment" && <EditAppointment setCurrentPage={setCurrentPage} />}
					{currentPage === "Messages" && <Messages setCurrentPage={setCurrentPage} />}
					{/* {currentPage === "Account Requests" && <AccountRequests setCurrentPage={setCurrentPage} />} */}
					{currentPage === "newPatientForm" && (
						<NewPatientForm
							setCurrentPage={setCurrentPage}
							snackbarOpen={snackbarOpen}
							setSnackbarOpen={setSnackbarOpen}
							handleCloseSnackbar={handleCloseSnackbar}
						/>
					)}
					{currentPage === "UploadPatientDocument" && <UploadPatientDocument patient={patient} setCurrentPage={setCurrentPage} />}
					{currentPage === "ViewPatientDocument" && (
						<ViewPatientDocument
							setCurrentPage={setCurrentPage}
							patient={patient}
							fileId={fileId}
							setFileId={setFileId}
							selectedDocument={selectedDocument}
							setSelectedDocument={setSelectedDocument}
						/>
					)}
					{currentPage === "AddEquipment" && (
						<AddEquipment
							setCurrentPage={setCurrentPage}
							snackbarOpen={snackbarOpen}
							setSnackbarOpen={setSnackbarOpen}
							handleCloseSnackbar={handleCloseSnackbar}
						/>
					)}
					{currentPage === "RequestEquipment" && (
						<RequestEquipment
							setCurrentPage={setCurrentPage}
							snackbarOpen={snackbarOpen}
							setSnackbarOpen={setSnackbarOpen}
							handleCloseSnackbar={handleCloseSnackbar}
						/>
					)}
					{currentPage === "AddComment" && <AddComment setCurrentPage={setCurrentPage} discussionId={discussionId} />}
					{currentPage === "AddRoom" && <AddRoom setCurrentPage={setCurrentPage} />}
					{currentPage === "RequestRoom" && <RequestRoom setCurrentPage={setCurrentPage} />}
				</Box>
			</Box>
		</Box>
	);
}
