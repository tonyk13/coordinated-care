import React from 'react';
import { Box, CssBaseline, AppBar, Toolbar, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import CommentIcon from '@mui/icons-material/Comment';
import ForumIcon from '@mui/icons-material/Forum';
import RoomIcon from '@mui/icons-material/BedroomChild';
import EquipmentIcon from '@mui/icons-material/Vaccines';

const drawerWidth = 240;

export default function SideNavigationBar({setCurrentPage}) {
    const menuItems = [
        { text: 'Home', icon: <HomeIcon /> },
        { text: 'Patients', icon: <GroupsIcon /> },
        { text: 'Documents', icon: <FolderSharedIcon /> },
        { text: 'Discussion Board', icon: <ForumIcon /> },


        { text: 'Rooms', icon: <RoomIcon /> },
        { text: 'Equipment', icon: <EquipmentIcon /> }

    ];

    return (
        <>
        <CssBaseline />
        <AppBar position="fixed" >

        </AppBar>
        <Box sx={{ display: 'flex', pt: 0 }}> 
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
                <ListItem key={item.text} >
                  <ListItemButton onClick={() => setCurrentPage(item.text)}>
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
