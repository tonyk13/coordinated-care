import React, { useState, useEffect } from "react";
import { Button, TextField, Grid, Typography, Box, Link, Container, Pagination, Avatar, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from "@mui/material";
import EquipmentIcon from "@mui/icons-material/Vaccines";
import axios from "axios";

const fetchEquipment = async () => {
    try {
        const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
        const response = await axios.get(`${baseURL}/api/equipment`);
        console.log('Equipment data:', response.data);
        return response.data; 
    } catch (error) {
        console.error('Error fetching equipment:', error);
        return []; 
    }
};

export default function Equipment({ setCurrentPage }) {
    const [equipment, setEquipment] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');


	useEffect(() => {
		fetchEquipment().then(data => {
			const updatedData = data.map(item => ({
				...item,
				nextAvailable: calculateNextAvailable(item.reservations)
			}));
			setEquipment(updatedData);
		});
	}, []);
	function calculateNextAvailable(reservations) {
		const now = new Date();
		now.setHours(0, 0, 0, 0); 
	
		const futureReservations = reservations.filter(res => {
			const reservationDate = new Date(res.date);
			reservationDate.setHours(0, 0, 0, 0);
			return reservationDate >= now;
		});
	
		if (futureReservations.length === 0) {
			return 'Now Available';
		}
	
		futureReservations.sort((a, b) => new Date(a.date) - new Date(b.date));
		const nextAvailableDate = new Date(futureReservations[0].date);
		nextAvailableDate.setDate(nextAvailableDate.getDate() + 1); 
		return nextAvailableDate.toLocaleDateString(); 
	}
	

    const requestEquipment = () => {
        setCurrentPage("RequestEquipment");
    };
	const AddEquipment = () =>{
		setCurrentPage("AddEquipment")

	};
	const filteredEquipment = equipment.filter(item => {
		return item.name.toLowerCase().includes(searchTerm.toLowerCase());
	});

    return (
        <div>
            <Box display="flex" alignItems="center"  >
                <EquipmentIcon sx={{ fontSize: 50 }} />
                <Typography variant="h2" sx={{ ml: 1 }}>
                    Equipment
                </Typography>
            </Box>
            <Box mt="10px" display="flex" alignItems="center">
			<TextField
    			label="Search"
    			variant="outlined"
    			value={searchTerm}
    			onChange={(e) => setSearchTerm(e.target.value)}
    			style={{ marginRight: "10px" }} 
			/>
                <Box ml={30}>
                    <Button variant="contained" style={{ backgroundColor: "green", width: "100px" }} onClick={requestEquipment}>
                        Request
                    </Button>
                </Box>
                <Box ml={10}>
                    <Button variant="contained" color="primary" style={{ width: "110px" }} onClick={AddEquipment}>
                        Add New 
                    </Button>
                </Box>
                <Box ml={10}>
                </Box>
            </Box>
            <Box mt="10px">
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Equipment</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Notes</TableCell>
                                <TableCell>Next Available</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
    						{filteredEquipment.map((item, index) => (
        					<TableRow key={index}>
            					<TableCell>{item.name}</TableCell>
            					<TableCell>{item.quantity}</TableCell>
            					<TableCell>{item.notes}</TableCell>
            					<TableCell>{item.nextAvailable}</TableCell>
        					</TableRow>
    						))}
						</TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box mt="20px" display="flex" justifyContent="center">
                <Pagination color="primary" />
            </Box>
        </div>
    );
}

