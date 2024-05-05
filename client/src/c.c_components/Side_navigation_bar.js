import RoomIcon from "@mui/icons-material/BedroomChild";
import EquipmentIcon from "@mui/icons-material/Vaccines";
import React from "react";
import { AppBar, Box, CssBaseline, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import ForumIcon from "@mui/icons-material/Forum";
import MedicationIcon from "@mui/icons-material/Medication";
// import MessageIcon from "@mui/icons-material/Email";
import ScheduleIcon from "@mui/icons-material/CalendarMonth";
const drawerWidth = 240;

export default function SideNavigationBar({ setCurrentPage }) {
	const menuItems = [
		{ text: "Home", icon: <HomeIcon /> },
		{ text: "Processes", icon: <MedicationIcon /> },
		{ text: "Procedures", icon: <MedicationIcon /> },
		{ text: "Patients", icon: <GroupsIcon /> },
		{ text: "Rooms", icon: <RoomIcon /> },
		{ text: "Equipment", icon: <EquipmentIcon /> },
		{ text: "Discussion Board", icon: <ForumIcon /> },
		// { text: "Messages", icon: <MessageIcon /> },
		{ text: "Schedule", icon: <ScheduleIcon /> },
	];

	const handleClick = (item) => {
		console.log("Navigating to:", item.text);
		if (item.text === "Home") setCurrentPage("Dashboard");
		if (item.text === "Staff") setCurrentPage("Staff");
		if (item.text === "Processes") setCurrentPage("Processes");
		if (item.text === "Procedures") setCurrentPage("Procedures");
		if (item.text === "Equipment") setCurrentPage("Equipment");
		if (item.text === "Rooms") setCurrentPage("Rooms");
		if (item.text === "Discussion Board") setCurrentPage("Discussion Board");
		if (item.text === "Patients") setCurrentPage("Patients");
		// if (item.text === "Messages") setCurrentPage("Messages");
		if (item.text === "Schedule") setCurrentPage("Schedule");
	};

	return (
		<>
			<CssBaseline />
			<AppBar position="fixed"></AppBar>
			<Box sx={{ display: "flex", pt: 0 }}>
				<Box
					sx={{
						width: drawerWidth,
						height: `calc(100% -70px)`,
						flexShrink: 0,
					}}
					role="presentation"
				>
					<List>
						{menuItems.map((item, index) => (
							<ListItem key={item.text}>
								<ListItemButton className={item.text.replace(/[\s/]+/g, "-")} onClick={() => handleClick(item)}>
									<ListItemIcon>{item.icon}</ListItemIcon>
									<ListItemText primary={item.text} />
								</ListItemButton>
							</ListItem>
						))}
					</List>
				</Box>
			</Box>
		</>
	);
}
