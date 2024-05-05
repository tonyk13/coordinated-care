import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Box, Typography } from "@mui/material";

export default function AddEquipment({setCurrentPage}) {
    const [newEquipmentName, setNewEquipmentName] = useState('');
    const [newEquipmentQuantity, setNewEquipmentQuantity] = useState(0);
    const [newEquipmentNotes, setNewEquipmentNotes] = useState('');

    const addNewEquipment = async () => {
        try {
            const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
            const payload = {
                equipmentName: newEquipmentName,
                quantity: newEquipmentQuantity,
                notes: newEquipmentNotes
            };
            await axios.post(`${baseURL}/api/equipment`, payload);
            setNewEquipmentName('');
            setNewEquipmentQuantity(0);
            setNewEquipmentNotes('');
            setCurrentPage("Equipment");
            
        } catch (error) {
            console.error('Error adding equipment:', error);
        }
    };
    const handleCancelClick = () => {
        setNewEquipmentName('');
        setNewEquipmentQuantity(0);
        setNewEquipmentNotes('');
        setCurrentPage("Equipment");

    };

    return (
        <Box mt="10px">
            <Typography variant="h5" style={{ color: 'DodgerBlue' }}>
                New Equipment Form
            </Typography>
            <br/><br/>
            <TextField
                label="Equipment Name"
                variant="outlined"
                value={newEquipmentName}
                onChange={(e) => setNewEquipmentName(e.target.value)}
            /><br/><br/>
            <TextField
                label="Quantity"
                type="number"
                variant="outlined"
                value={newEquipmentQuantity}
                onChange={(e) => setNewEquipmentQuantity(e.target.value)}
            /><br/><br/>
            <TextField
                label="Notes"
                variant="outlined"
                value={newEquipmentNotes}
                onChange={(e) => setNewEquipmentNotes(e.target.value)}
            /><br/><br/>
            <Button
                variant="contained"
                color="primary"
                onClick={addNewEquipment}
                style={{ marginLeft: "10px" }}
            >
            Add Equipment
            </Button>
            <Button
                variant="contained"
                color="error"
                onClick={handleCancelClick}
                style={{ marginLeft: "10px" }}
            >
            Cancel
            </Button>
        </Box>
    )
}
