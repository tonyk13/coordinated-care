import React from "react";
import { Box, CssBaseline, AppBar, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import CommentIcon from "@mui/icons-material/Comment";
import ForumIcon from "@mui/icons-material/Forum";
import RoomIcon from "@mui/icons-material/BedroomChild";
import EquipmentIcon from "@mui/icons-material/Vaccines";
// import MessagesIcon from "@mui/icons-material/Email";

const drawerWidth = 240;

export default function AdminSideNavigationBar({ setCurrentPage }) {
	const menuItems = [
		{ text: "Home", icon: <HomeIcon /> },
		{ text: "Faculty/Staff", icon: <GroupsIcon /> },
		{ text: "Patients", icon: <GroupsIcon /> },
		{ text: "Rooms", icon: <RoomIcon /> },
		{ text: "Equipment", icon: <EquipmentIcon /> },
		{ text: "Discussion Board", icon: <ForumIcon /> },
		{ text: "View User Feedback", icon: <CommentIcon /> },
		// { text: "Messages", icon: <MessagesIcon /> },
	// 	{ text: "Account Requests", icon: <GroupsIcon /> },
	];

	const handleClick = (item) => {
		console.log("Navigating to:", item.text);
		if (item.text === "Home") setCurrentPage("Processes");
		if (item.text === "Faculty/Staff") setCurrentPage("Staff");
		if (item.text === "Procedures") setCurrentPage("Procedures");
		if (item.text === "Equipment") setCurrentPage("Equipment");
		if (item.text === "Rooms") setCurrentPage("Rooms");
		if (item.text === "Discussion Board") setCurrentPage("Discussion Board");
		if (item.text === "Patients") setCurrentPage("Patients");
		if (item.text === "View User Feedback") setCurrentPage("View User Feedback");
		// if (item.text === "Messages") setCurrentPage("Messages");
		// if (item.text === "Account Requests") setCurrentPage("Account Requests");
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
