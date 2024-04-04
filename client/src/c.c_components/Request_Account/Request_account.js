import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Container, Grid } from '@mui/material';

export default function Request_account({ setCurrentPage }) {
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        dob: '',
        phoneNumber: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    function takemetomainpage() {
        setCurrentPage("login");
        console.log(formData); // Log form data
    }

    return (
        <div className='login_screen'>
            <div className='login_app_name'>Coordinated Care</div><br/>
            <div className='request_account_text'>Request Account</div><br/>
            <Container className="request_account_form_container">
                <Box>
                    <Grid container spacing={4}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                type="text"
                                name="firstName"
                                label="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                type="text"
                                name="dob"
                                label="Date of Birth"
                                value={formData.dob}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                type="text"
                                name="middleName"
                                label="Middle Name (optional)"
                                value={formData.middleName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                type="text"
                                name="phoneNumber"
                                label="Phone Number"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
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
                <Box>
                    <Button className='request_account_submit_button' onClick={takemetomainpage}>
                        Submit
                    </Button>
                </Box>
            </Container>
        </div>
    );
}
