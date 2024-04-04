import React, { useState } from 'react';
import { Button, TextField, Grid, Box, Container } from '@mui/material';

export default function Add_new_faculty({ setCurrentPage }) {
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        address: '',
        emailAddress: '',
        professionalQualifications: ''    
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Same function for now for save cancel, just console logs clicked
    const saveEdits = () => {
        setCurrentPage('Faculty/Staff')
        console.log("save edits")
    };

    return (
        <div>
            <Container>
                <Box>
                    <Grid container spacing={6} mt="10px">
                        <Grid item xs={16}>
                            <TextField
                                fullWidth
                                rows={1}
                                type="text"
                                name="fullName"
                                label="Full Name"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={16}>
                            <TextField
                                fullWidth
                                rows={1}
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
                                rows={1}
                                type="text"
                                name="address"
                                label="Address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={16}>
                            <TextField
                                fullWidth
                                rows={1}
                                type="email"
                                name="emailAddress"
                                label="Email Address"
                                value={formData.emailAddress}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={16}>
                            <TextField
                                fullWidth
                                multiline
                                rows={5}
                                type="text"
                                name="professionalQualifications"
                                label="Professional Qualifications"
                                value={formData.professionalQualifications}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Box mt={2} display="flex" justifyContent="center">
                <Button variant="contained" color="primary" style={{ width: '100px' }} onClick={saveEdits}>Save</Button>
                <Box mx={10} />
                <Button variant="contained" style={{ backgroundColor: 'red', color: 'white', width: '100px' }} onClick={saveEdits}>Cancel</Button>
            </Box>
        </div>
    );
}
