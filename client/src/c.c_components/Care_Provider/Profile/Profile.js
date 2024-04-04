import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, Box, Container, Calendar, Avatar } from '@mui/material';

// WILL SEND FORM DATA TO CONSOLE FOR NOW
export default function Profile() {
    const [formData, setFormData] = useState({
        firstName: 'John',
        middleName: 'Pat',
        lastName: 'Doe',
        userName: 'johndoe232',
        dob: '02-03-1980',
        phoneNumber: '123-456-7890',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <Container>
                <Box>
                    <Grid container spacing={6} mt="10px">
                        <Grid item xs={16}>
                            <TextField
                                fullWidth
                                type="text"
                                name="firstName"
                                label="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={16}>
                            <TextField
                                fullWidth
                                type="text"
                                name="dob"
                                label="Date of Birth"
                                value={formData.dob}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={16}>
                            <TextField
                                fullWidth
                                type="text"
                                name="middleName"
                                label="Middle Name (optional)"
                                value={formData.middleName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={16}>
                            <TextField
                                fullWidth
                                type="text"
                                name="userName"
                                label="Username"
                                value={formData.userName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={16}>
                            <TextField
                                fullWidth
                                type="text"
                                name="phoneNumber"
                                label="Phone Number"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={16}>
                            <TextField
                                fullWidth
                                type="text"
                                name="lastName"
                                label="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </div>
    );
}
