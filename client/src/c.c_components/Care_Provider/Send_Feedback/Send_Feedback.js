import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, Box, Container } from '@mui/material';

export default function Send_Feedback( {setCurrentPage} ) {
    const [formData, setFormData] = useState({
        summary: '',
        details: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Same function for now for save cancel, just console logs clicked
    const saveEdits = () => {
        // setCurrentPage('home')
        console.log("save edits")
    };
    
    return (
        <div>
            <Container>
            <Typography variant="h4">Send Feedback</Typography>
                <Box>
                    <Grid container spacing={6} mt="10px">
                        <Grid item xs={16}>
                            <TextField
                                fullWidth
                                multiline
                                rows={1}
                                type="text"
                                name="summary"
                                label="Summary (50 Word Limit)"
                                value={formData.summary}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={16}>
                            <TextField
                                fullWidth
                                multiline
                                rows={19} // 19 Rows for summary makes it consistent with profile form
                                type="text"
                                name="details"
                                label="Details"
                                value={formData.details}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Box mt={2} display="flex" justifyContent="center">
                <Button variant="contained" color="primary" style={{ width: '100px' }} onClick={saveEdits}>Send</Button>
                <Box mx={10} />
                <Button variant="contained" style={{ backgroundColor: 'red', color: 'white', width: '100px' }} onClick={saveEdits}>Cancel</Button>
            </Box>
        </div>
    );
}
