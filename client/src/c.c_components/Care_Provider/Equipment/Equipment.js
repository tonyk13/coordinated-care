import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, Box, Link, Container, Pagination, Avatar } from '@mui/material';
import EquipmentIcon from '@mui/icons-material/Vaccines';


// Extra mui materials for Table (datatable is outdated)
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

export default function Equipment( {setCurrentPage} ) {
    const sample_equipment_data = [
        {
            equipment_name: "e1",
            quantity: 0,
            notes: "Out of stock",
            next_available: "4/18/24 6:00",
        },
        {
            equipment_name: "e2",
            quantity: 9,
            notes: "Approval Needed",
            next_available: "4/14/24 6:00",
        },
        {
            equipment_name: "e3",
            quantity: 15,
            notes: "Request For More",
            next_available: "Now",
        },
        {
            equipment_name: "e4",
            quantity: 33,
            notes: "",
            next_available: "Now",
        },
        {
            equipment_name: "e5",
            quantity: 45,
            notes: "",
            next_available: "Now",
        },
        {
            equipment_name: "",
            quantity: "",
            notes: "",
            next_available: "",
        },
        {
            equipment_name: "",
            quantity: "",
            notes: "",
            next_available: "",
        },
        {
            equipment_name: "",
            quantity: "",
            notes: "",
            next_available: "",
        },
        {
            equipment_name: "",
            quantity: "",
            notes: "",
            next_available: "",
        },
        {
            equipment_name: "",
            quantity: "",
            notes: "",
            next_available: "",
        },
        {
            equipment_name: "",
            quantity: "",
            notes: "",
            next_available: "",
        },
        {
            equipment_name: "",
            quantity: "",
            notes: "",
            next_available: "",
        },
        {
            equipment_name: "",
            quantity: "",
            notes: "",
            next_available: "",
        },
        {
            equipment_name: "",
            quantity: "",
            notes: "",
            next_available: "",
        },
        {
            equipment_name: "",
            quantity: "",
            notes: "",
            next_available: "",
        },
        {
            equipment_name: "",
            quantity: "",
            notes: "",
            next_available: "",
        },
        {
            equipment_name: "",
            quantity: "",
            notes: "",
            next_available: "",
        },
        {
            equipment_name: "",
            quantity: "",
            notes: "",
            next_available: "",
        },
        {
            equipment_name: "",
            quantity: "",
            notes: "",
            next_available: "",
        },
        {
            equipment_name: "",
            quantity: "",
            notes: "",
            next_available: "",
        },
       
    ];

    // Same function for now for save cancel, just console logs clicked
    const saveEdits = () => {
        // setCurrentPage('home')
        console.log("save edits")
    };

    
    return (
        <div>
            <Box display="flex" alignItems="center">
                <EquipmentIcon sx={{ fontSize: 50 }} />
                <Typography variant="h2" sx={{ ml: 1 }}>Equipment</Typography>
            </Box>
            <Box mt="10px" display="flex" alignItems="center">
                <TextField label="Search" variant="outlined" style={{ width: '1000px' }} />
                <Box ml={30}>
                    <Button variant="contained" style={{ backgroundColor: 'green', width: '100px' }} onClick={saveEdits}>Request</Button>
                </Box>
                <Box ml={10}>
                    <Button variant="contained" color="primary" style={{ width: '100px' }} onClick={saveEdits}>Save</Button>
                </Box>
                <Box ml={10}>
                    <Button variant="contained" style={{ backgroundColor: 'red', color: 'white', width: '100px' }} onClick={saveEdits}>Cancel</Button>
                </Box>
            </Box>
            <Box mt="10px">
                <Table>
                    <TableHead>
                        <TableRow style={{ backgroundColor: '#f2f2f2', fontWeight: 'bold', height: '100px', backgroundColor: '#b0b0b0' }}>
                            <TableCell>Equipment</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Notes</TableCell>
                            <TableCell>Next Available</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sample_equipment_data.map((equipment, index) => (
                            <TableRow
                                key={index}
                                style={{ backgroundColor: index % 2 === 0 ? 'White' : '#f9f9f9' }}
                            >
                                <TableCell style={{ color: "blue", textDecoration: "underline" }}>{equipment.equipment_name}</TableCell>
                                <TableCell style={{ color: equipment.quantity === 0 ? 'red' : equipment.quantity <= 15 ? '#FFC400' : 'green' }}>
                                    {equipment.quantity}
                                </TableCell>
                                <TableCell>{equipment.notes}</TableCell>
                                <TableCell>{equipment.next_available}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
            <Box mt="20px" display="flex" justifyContent="center">
                <Pagination count={5} color="primary" />
            </Box>
        </div>
    );

}




