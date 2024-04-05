import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, Box, Avatar, Container } from '@mui/material';

export default function Faculty_Information({ currentFacultyInformation }) {
    console.log(currentFacultyInformation);

    const [formData, setFormData] = React.useState(currentFacultyInformation);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const saveEdits = () => {
        // Save edits logic here
        console.log("Saved edits:", formData);
    };

    return (
        <Container style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
            <Typography variant="h4">Profile</Typography>
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
                            name="lastName"
                            label="Last Name"
                            value={formData.lastName}
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
                            name="role"
                            label="Role"
                            value={formData.role}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box mt={2} display="flex" justifyContent="center">
                <Button variant="contained" color="primary" style={{ width: '100px' }} onClick={saveEdits}>Save</Button>
                <Box mx={10} />
                <Button variant="contained" style={{ backgroundColor: 'red', color: 'white', width: '100px' }}>Cancel</Button>
            </Box>
        </Container>
    );
}