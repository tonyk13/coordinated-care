import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Typography, Box, Container } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Profile( {setCurrentPage} ) {
    const [formData, setFormData] = useState({
        firstName: ' ',
        middleName: ' ',
        lastName: ' ',
        username: ' ',
        phoneNumber: ' ',
        dateOfBirth: ' ',
        role: ' ',
    });

    useEffect(() => {
        const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
        const employee_id = Cookies.get("employee_id");
        axios.get(`${baseURL}/api/employees/${employee_id}`)
        .then(response => {
            const { firstName, middleName, lastName, username, phoneNumber, dateOfBirth, role } = response.data.employee;
            setFormData({
                firstName,
                middleName,
                lastName,
                username,
                phoneNumber,
                dateOfBirth, 
                role
            });
            })
            .catch(error => {
                console.error('Error fetching employee ID:', error);
            });
    }, []);



    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    // Same function for now for save cancel, just console logs clicked
    const saveEdits = () => {
        // setCurrentPage('home')
        const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
        const employee_id = Cookies.get("employee_id");
        axios.put(`${baseURL}/api/employees/${employee_id}`, formData)
            .catch(error => {
                console.error('Error updating employee:', error);
            });

        if (formData.role === "Admin") {
            setCurrentPage("Processes")
        } else {
            setCurrentPage('Dashboard');
        }
    };


    // Change Admin redirection on cancel
    const cancelEdits = () => {
        if (formData.role === "Admin") {
            setCurrentPage("Processes")
        } else {
            setCurrentPage('Dashboard');
        }
    };

    return (
        <div>
            <Container>
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
                                name="username"
                                label="Username"
                                value={formData.username}
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
                                name="datOfBirth"
                                label="Date Of Birth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Box mt={2} display="flex" justifyContent="center">
                <Button variant="contained" color="primary" style={{ width: '100px' }} onClick={saveEdits}>Save</Button>
                <Box mx={10} />
                <Button variant="contained" style={{ backgroundColor: 'red', color: 'white', width: '100px' }} onClick={cancelEdits}>Cancel</Button>
            </Box>
        </div>
    );
}
