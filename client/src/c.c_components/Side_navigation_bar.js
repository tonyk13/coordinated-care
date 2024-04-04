// import React from 'react';
// import { Box, CssBaseline, AppBar, Toolbar, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
// import HomeIcon from '@mui/icons-material/Home';
// import GroupsIcon from '@mui/icons-material/Groups';
// import FolderSharedIcon from '@mui/icons-material/FolderShared';
// import CommentIcon from '@mui/icons-material/Comment';
// import ForumIcon from '@mui/icons-material/Forum';
import RoomIcon from "@mui/icons-material/BedroomChild";
import EquipmentIcon from "@mui/icons-material/Vaccines";

// const drawerWidth = 240;

// export default function SideNavigationBar() {
//     const menuItems = [
//         { text: 'Home', icon: <HomeIcon /> },
//         { text: 'Faculty/Staff', icon: <GroupsIcon /> },
//         { text: 'Documents', icon: <FolderSharedIcon /> },
//         { text: 'Discussion Board', icon: <ForumIcon /> },

//         { text: 'User Feedback', icon: <CommentIcon /> },
//     ];

//     return (
//         <>
//         <CssBaseline />
//         <AppBar position="fixed" >

//         </AppBar>
//         <Box sx={{ display: 'flex', pt: 0 }}>
//           <Box
//             sx={{
//               width: drawerWidth,
//               height: `calc(100% -70px)`,
//               flexShrink: 0,

//             }}
//             role="presentation"
//           >
//             <List>
//               {menuItems.map((item, index) => (
//                 <ListItem key={item.text} >
//                   <ListItemButton>
//                     <ListItemIcon>{item.icon}</ListItemIcon>
//                     <ListItemText primary={item.text} />
//                   </ListItemButton>
//                 </ListItem>
//               ))}
//             </List>
//           </Box>

//         </Box>
//         </>
//     );
// }

import React, { useState } from "react";
import { Box, CssBaseline, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import CommentIcon from "@mui/icons-material/Comment";
import ForumIcon from "@mui/icons-material/Forum";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ScienceIcon from "@mui/icons-material/Science";
import PeopleIcon from "@mui/icons-material/People";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import MedicationIcon from "@mui/icons-material/Medication";

const drawerWidth = 240;

export default function SideNavigationBar({ setCurrentPage }) {
	const [openSubMenu, setOpenSubMenu] = useState(false);

	const menuItems = [
		{ text: "Home", icon: <HomeIcon /> },
		{ text: "Faculty/Staff", icon: <GroupsIcon />, hasSubMenu: true },
		{ text: "Patients", icon: <GroupsIcon /> },
		{ text: "Documents", icon: <FolderSharedIcon /> },
		{ text: "Discussion Board", icon: <ForumIcon /> },

		{ text: "Rooms", icon: <RoomIcon /> },
		{ text: "Equipment", icon: <EquipmentIcon /> },
		{ text: "User Feedback", icon: <CommentIcon /> },
	];

	const subMenuItems = [
		{ text: "Staff", icon: <PeopleIcon /> },
		{ text: "Procedures", icon: <MedicationIcon /> },
		{ text: "Equipment", icon: <ScienceIcon /> },
		{ text: "Rooms", icon: <MeetingRoomIcon /> },
	];

	const handleClick = (item) => {
		if (item.hasSubMenu) {
			setOpenSubMenu(!openSubMenu);
		} else {
			// Navigate to the appropriate page
			console.log("Navigating to:", item.text);
			if (item.text === "Staff") setCurrentPage("Staff");
			if (item.text === "Procedures") setCurrentPage("Procedures");
			if (item.text === "Equipment") setCurrentPage("Equipment");
			if (item.text === "Rooms") setCurrentPage("Rooms");
			if (item.text === "Documents") setCurrentPage("Documents");
			if (item.text === "Discussion Board") setCurrentPage("Discussion Board");
			if (item.text === "User Feedback") setCurrentPage("User Feedback");
			if (item.text === "Patients") setCurrentPage("Patients");
		}
	};

	return (
		<>
			<CssBaseline />
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
							<React.Fragment key={item.text}>
								<ListItem disablePadding>
									<ListItemButton onClick={() => handleClick(item)}>
										<ListItemIcon>{item.icon}</ListItemIcon>
										<ListItemText primary={item.text} />
										{item.hasSubMenu ? openSubMenu ? <ExpandLess /> : <ExpandMore /> : null}
									</ListItemButton>
								</ListItem>
								{item.hasSubMenu && (
									<Collapse in={openSubMenu} timeout="auto" unmountOnExit>
										<List component="div" disablePadding>
											{subMenuItems.map((subMenuItem) => (
												<ListItem disablePadding key={subMenuItem.text} sx={{ pl: 4 }}>
													<ListItemButton onClick={() => handleClick(subMenuItem)}>
														<ListItemIcon>{subMenuItem.icon}</ListItemIcon>
														<ListItemText primary={subMenuItem.text} />
													</ListItemButton>
												</ListItem>
											))}
										</List>
									</Collapse>
								)}
							</React.Fragment>
						))}
					</List>
				</Box>
			</Box>
		</>
	);
}
