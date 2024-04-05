import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Typography, Box, Avatar, Container } from '@mui/material';

export default function Faculty_Information(nameClicked) {
    // Hard Setting Data
     const rows = [
        { id: 1322323, lastName: 'Snow', firstName: 'Jon', phoneNumber: 35423323, role: 'Doctor' },
        { id: 2323232, lastName: 'Lannister', firstName: 'Cersei', phoneNumber: 42323232, role: 'Medical Assistant' },
        { id: 332323, lastName: 'Lannister', firstName: 'Jaime', phoneNumber: 45232323, role: 'Doctor' },
        { id: 493993, lastName: 'Stark', firstName: 'Arya', phoneNumber: 163232323, role: 'Medical Assistant' },
        { id: 5333233, lastName: 'Targaryen', firstName: 'Daenerys', phoneNumber: 32323232, role: 'Doctor' },
        { id: 6323223, lastName: 'Melisandre', firstName: null, phoneNumber: 3232232,role: 'Medical Assistant' },
        { id: 7323232, lastName: 'Clifford', firstName: 'Ferrara', phoneNumber: 43232324, role: 'Doctor' },
        { id: 82323, lastName: 'Frances', firstName: 'Rossini', phoneNumber: 33232326, role: 'Doctor' },
        { id: 932323, lastName: 'Roxie', firstName: 'Harvey', phoneNumber: 6323232323, role: 'Doctor' },
    ];

    const specificFacultyFirstName = nameClicked.nameClicked.split(' ')[0];
    const specificFacultyData = rows.filter(row => row.firstName === specificFacultyFirstName)[0];

    const [formData, setFormData] = useState({
        firstName: specificFacultyData.firstName,
        lastName: specificFacultyData.lastName,
        phoneNumber: specificFacultyData.phoneNumber,
        role: specificFacultyData.role,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

   
    const saveEdits = () => {
        // Save edits logic here
        console.log("Saved edits:", formData);
    };

    return (
        <Container style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px',  maxHeight: '60vh', overflowY: 'auto' } }>
            <Box>
                <Grid container spacing={1} mt="10px">
                    <Grid item xs={16}>
                        <Typography variant="subtitle1"><strong>First Name:</strong> {formData.firstName}</Typography>
                    </Grid>
                    <Grid item xs={16}>
                        <Typography variant="subtitle1"><strong>Last Name:</strong> {formData.lastName}</Typography>
                    </Grid>
                    <Grid item xs={16}>
                        <Typography variant="subtitle1"><strong>Phone Number:</strong> {formData.phoneNumber}</Typography>
                    </Grid>
                    <Grid item xs={16}>
                        <Typography variant="subtitle1"><strong>Role:</strong> {formData.role}</Typography>
                    </Grid>
                    <Grid item xs={16}>
                        <Typography variant="subtitle1"><strong>Address:</strong>123 Healthway Drive, Meditown, State, 45678</Typography>
                    </Grid>
                    <br />
                    <Grid item xs={16}>
                        <Typography variant="subtitle1">
                            <strong>
                            Emergency Contact:
                            </strong>
                            <br />
                            Name: John Doe <br />
                            Relationship: Spouse <br />
                            Phone: +1 (555) 987-6543 <br />
                        </Typography>
                    </Grid>
                    <Grid item xs={16}>
                        <Typography variant="subtitle1">
                            <strong>
                            Professional Credentials
                            </strong>
                            <br />                                       
                            Medical License Number: A1234567 <br /> 
                            State Issued: New York <br />   
                            Expiration Date: 12/31/2024 <br />  
                            Board Certifications: <br />    
                            Internal Medicine, Board Certified since 2010 <br />    
                            Cardiology, Board Certified since 2012 <br />   
                            <br />
                            <strong>
                            Education:
                            </strong> 
                            <br />   
                            Medical School: University of Health Sciences, Doctor of Medicine (MD), Graduated 2006 <br />   
                            Residency: General Internal Medicine, Health Medical Center, 2006-2009 <br />   
                            Fellowship: Cardiology, Cardiac Excellence Institute, 2009-2012 <br />  
                            <br />
                            <strong>
                            Specialties:
                            </strong> 
                            <br />
                            Primary Specialty: Cardiology <br />
                            Subspecialties: Interventional Cardiology, Heart Failure  <br />
                        </Typography>
                    </Grid>
                </Grid>
            </Box>       
        </Container>
    );

}