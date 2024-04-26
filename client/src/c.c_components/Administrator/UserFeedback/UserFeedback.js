import React, { useState,  useEffect } from 'react';
import axios from 'axios';

import { Grid, Typography, Container, Box, Checkbox } from '@mui/material';

export default function UserFeedback() {
    const [feedbackData, setFeedbackData] = useState({ pending: [], reviewed: [] });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
                const response = await axios.get(`${baseURL}/api/feedback/all`);
                const pending = response.data.filter(item => !item.isReviewed);
                const reviewed = response.data.filter(item => item.isReviewed);
                setFeedbackData({ pending, reviewed });
                
            } catch (error) {
                console.error('Error fetching feedback:', error);
                //setError('Failed to fetch data.');
            }
        };
        fetchData();
    }, []);

    const handleCheckboxChange = async (feedbackId, isReviewed) => {
        try {
            const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
            const response = await axios.patch(`${baseURL}/api/feedback/${feedbackId}/review`, { reviewed: !isReviewed });
            if (response.status === 200) {
                setFeedbackData(prev => {
                    const pending = isReviewed ? [...prev.pending, {...response.data}] : prev.pending.filter(item => item._id !== feedbackId);
                    const reviewed = isReviewed ? prev.reviewed.filter(item => item._id !== feedbackId) : [...prev.reviewed, {...response.data}];
                    return { pending, reviewed };
                });
            }
            
        } catch (error) {
            console.error('Error updating feedback status:', error);
            setError('Failed to update status.');
            
        }
    };

    return (
        <Container>
            
                <Grid container spacing={3}>
                    
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Pending Feedback
                        </Typography>
                        <Box>
                            {feedbackData.pending.length ? feedbackData.pending.map(feedback => (
                                <Box key={feedback._id} p={2} borderRadius={6} mb={2}>
                                    <Checkbox
                                        checked={false}
                                        onChange={() => handleCheckboxChange(feedback._id, false)}
                                    />
                                    <Typography variant="body1" fontWeight="bold">{feedback.details}</Typography>
                                </Box>
                            )) : <Typography>No pending feedback.</Typography>}
                        </Box>
                    </Grid>
                
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Reviewed Feedback
                        </Typography>
                        <Box>
                            {feedbackData.reviewed.length ? feedbackData.reviewed.map(feedback => (
                                <Box key={feedback._id} p={2} borderRadius={6} mb={2}>
                                    <Checkbox
                                        checked={true}
                                        onChange={() => handleCheckboxChange(feedback._id, true)}
                                    />
                                    <Typography variant="body1" fontWeight="bold">{feedback.details}</Typography>
                                </Box>
                            )) : <Typography>No reviewed feedback.</Typography>}
                        </Box>
                    </Grid>
                </Grid>
            
            {error && <Typography color="error">{error}</Typography>}
        </Container>
    );
}