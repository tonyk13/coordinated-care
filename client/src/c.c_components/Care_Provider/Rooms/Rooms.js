import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, Box, Link, Container, Pagination, Avatar } from '@mui/material';
import RoomIcon from '@mui/icons-material/BedroomChild';


// Extra mui materials for Table (datatable is outdated)
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

export default function Rooms( {setCurrentPage} ) {
    const sample_rooms_data = [
        {
            room_number: "101A",
            status: "Occupied",
            notes: "",
            next_available: "4/16/2024 6:00",
        },
        {
            room_number: "101B",
            status: "Awaiting Cleanup",
            notes: "",
            next_available: "4/9/2024 18:00",
        },
        {
            room_number: "102A",
            status: "Awaiting Cleanup",
            notes: "",
            next_available: "4/9/2024 20:00",
        },
        {
            room_number: "102B",
            status: "Open",
            notes: "",
            next_available: "Now",
        },
        {
            room_number: "103A",
            status: "Open",
            notes: "Single Bed Room",
            next_available: "Now",
        },
        {
            room_number: "",
            status: "",
            notes: "",
            next_available: "",
        },
        {
            room_number: "",
            status: "",
            notes: "",
            next_available: "",
        },
        {
            room_number: "",
            status: "",
            notes: "",
            next_available: "",
        },
        {
            room_number: "",
            status: "",
            notes: "",
            next_available: "",
        },
        {
            room_number: "",
            status: "",
            notes: "",
            next_available: "",
        },
        {
            room_number: "",
            status: "",
            notes: "",
            next_available: "",
        },
        {
            room_number: "",
            status: "",
            notes: "",
            next_available: "",
        },
        {
            room_number: "",
            status: "",
            notes: "",
            next_available: "",
        },
        {
            room_number: "",
            status: "",
            notes: "",
            next_available: "",
        },
        {
            room_number: "",
            status: "",
            notes: "",
            next_available: "",
        },
        {
            room_number: "",
            status: "",
            notes: "",
            next_available: "",
        },
        {
            room_number: "",
            status: "",
            notes: "",
            next_available: "",
        },
        {
            room_number: "",
            status: "",
            notes: "",
            next_available: "",
        },
        {
            room_number: "",
            status: "",
            notes: "",
            next_available: "",
        },
        {
            room_number: "",
            status: "",
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
                <RoomIcon sx={{ fontSize: 50 }} />
                <Typography variant="h2" sx={{ ml: 1 }}>Rooms</Typography>
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
                            <TableCell>Room Number</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Notes</TableCell>
                            <TableCell>Next Available</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sample_rooms_data.map((room, index) => (
                            <TableRow
                                key={index}
                                style={{ backgroundColor: index % 2 === 0 ? 'White' : '#f9f9f9' }}
                            >
                                <TableCell style={{ color: "blue", textDecoration: "underline" }}>{room.room_number}</TableCell>
                                <TableCell style={{ color: room.status === "Occupied" ? 'red' : room.status === "Awaiting Cleanup" ? '#FFC400' : room.status === "Open" ? 'green' : 'black' }}>
                                    {room.status}
                                </TableCell>
                                <TableCell>{room.notes}</TableCell>
                                <TableCell>{room.next_available}</TableCell>
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




