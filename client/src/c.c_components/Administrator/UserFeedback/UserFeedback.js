import React, { useState } from 'react';
import { Button, Avatar, Grid, Typography, Container, Box, Checkbox } from '@mui/material';

export default function UserFeedback() {
    const feedbackData = [
        {
            status: 'Pending',
            user: 'John Doe',
            feedbacklist: [
                {
                    id: 1,
                    details: "When trying to schedule appointments for the same patient within a short timeframe, the system sometimes doesn't update the availability calendar, causing double bookings",
                    reviewed: false,
                },
                {
                    id: 2,
                    details: "Several staff members have reported being unable to log in with their credentials intermittently since the last update, especially during peak hours.",
                    reviewed: false,
                },
            ]
        },
        {
            status: 'Reviewed',
            user: 'Alan Scott',
            feedbacklist: [
                {
                    id: 3,
                    details: "The recent update to the medication management module has been a game-changer, making it easier to track prescriptions and refill statuses. Thank you for the continuous improvements!",
                    reviewed: true,
                },
                {
                    id: 4,
                    details: "Several staff members have reported being unable to log in with their credentials intermittently since the last update, especially during peak hours.",
                    reviewed: true,
                },
            ]
        },
    ];


    // IMplement later
    // const handleCheckboxChange = (feedbackId, subFeedbackId) => {
    // };

    return (
        <Container>
            <Grid container spacing={3}>
                {feedbackData.map((feedback, index) => (
                    <Grid item xs={12} key={index}>
                        <Box p={4} bgcolor="#f9f9f9" position="relative" borderRadius={6}>
                            <Typography variant="h6" style={{ 
                                position: 'absolute', 
                                top: 0, 
                                left: 0, 
                                width: '10%',
                                color: 'dodgerblue', 
                                fontWeight: 'bold', 
                                fontSize: '12px',
                                border: '2px solid dodgerblue', 
                                borderTopLeftRadius: 16, 
                                padding: '10px' 
                                }}>{feedback.status}
                            </Typography>
                            <br />
                            <Typography variant="body1" fontWeight="bold">{feedback.user}</Typography>
                            {feedback.feedbacklist.map(subFeedback => (
                                <Box key={subFeedback.id} ml={2} display="flex" alignItems="center">
                                    <Checkbox
                                        checked={subFeedback.reviewed}
                                    />
                                    <Typography variant="body1" fontWeight="bold" fontSize="12px">{subFeedback.details}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}