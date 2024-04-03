import React from 'react'
import { Box, Typography, Paper, List, ListItem,ListItemButton, ListItemText, Divider, TextField, Button } from '@mui/material';


export default function Discussion_Post({selectedTopic,setSelectedTopic }) {
  return (
    <Paper sx={{ p: 2 }}>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <Typography component="span" variant="h6" color="text.primary">
                {selectedTopic.title}
            </Typography>
            <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                Asked by <span style={{ color: 'dodgerblue' }}>{selectedTopic.askedBy}</span>
            </Typography>
        </Box>
        <br/>
        <Typography paragraph>{selectedTopic.summary}</Typography>
    
    
        <List sx={{ mt: 2, pl: 4 }}> 
            {selectedTopic.comments.map((comment, index) => (
            <React.Fragment key={index}>
                {index > 0 && <Divider />}
                <ListItem sx={{ pl: 4 }}> 
                    <ListItemText primary={comment} />
                </ListItem>
            </React.Fragment>
            ))}
        </List>
    <Button variant="contained" onClick={() => setSelectedTopic(null)}>Back to topics</Button>
    <Button variant="contained" color="success" sx={{ ml: 20 }} onClick={() => setSelectedTopic(null)}>Add Comment</Button>
  </Paper>
  )
}
