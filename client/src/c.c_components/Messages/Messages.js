import React, { useState } from "react";
import { Button, Paper, TextField, Grid, Typography, Box, Link, Container, Pagination, Avatar} from '@mui/material';


// <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
export default function Messages( {setCurrentPage} ) {
    const userList = [
        {name: "Alan", icon: ""},
        {name: "Bob", icon: ""},
        {name: "John", icon: ""},
        {name: "Admin", icon: ""},
        {name: "Ben", icon: ""},
        {name: "Jerry", icon: ""},
        {name: "Jane", icon: ""},
        {name: "Mary", icon: ""},
    ]


    const [currentUser, setCurrentUser] = useState(userList[0]);


    const messages = [
        {text: "Hello", time: "10:24"},
        {text: "Hey how are you doing?", time: "10:28"},
        {text: "I am doing well, did you follow up with Alan Scott after his lab test?", time: "10:32"},
        {text: "Yes I did, he is doing quite well.", time: "10:34"},
    ]

    const handleUserMessageClick = (user) => {
        setCurrentUser(user);
    };
    
    
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={9}>
                    <Paper>
                        {currentUser && (
                            <Box
                                display="flex"
                                alignItems="center"
                                p={2}
                                boxShadow={1}
                                // borderRadius={4}
                            >
                                <Avatar alt={currentUser.name} src={currentUser.icon ? currentUser.icon : "/static/images/avatar/2.jpg"} />
                                <Box ml={2}>
                                    <Typography variant="subtitle1">{currentUser.name}</Typography>
                                </Box>
                            </Box>
                        )}
                        <Box p={2}>
                            {messages.map((message, index) => (
                                <Typography
                                    key={index}
                                    variant="body1"
                                    align={index % 2 === 0 ? "right" : "left"}
                                    sx={{ color: index % 2 === 0 ? "blue" : "gray", marginLeft: index % 2 === 0 ? '0px' : '10px', marginRight: index % 2 === 0 ? '10px' : '0px',  marginBottom: '4px'}}
                                >
                                    {message.text}
                                    <Typography
                                        variant = "subtitle2"
                                        align={index % 2 === 0 ? "right" : "left"}
                                        sx={{ color: index % 2 === 0 ? "blue" : "gray", fontSize: '10px' }}
                                    >
                                        {message.time}
                                    </Typography>
                                </Typography>
                            ))}
                        </Box>
                        <Box
                            display="flex"
                            alignItems="center"
                            p={2}
                            boxShadow={2}
                        >
                            <TextField
                                sx={{ width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                variant="standard"
                                placeholder="Type your message..."
                                InputProps={{ disableUnderline: true }}
                            />
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Grid container spacing={2}>
                        {userList.map((user, index) => (
                            <Grid item xs={12} key={index}>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    p={2}
                                    boxShadow={1}
                                    borderRadius={4}
                                    onClick={() => handleUserMessageClick(user)}
                                    sx={{ cursor: 'pointer' }}
                                >
                                    <Avatar alt={user.name} src={user.icon ? user.icon : "/static/images/avatar/2.jpg"} />
                                    <Box ml={2}>
                                        <Typography variant="subtitle1">{user.name}</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}