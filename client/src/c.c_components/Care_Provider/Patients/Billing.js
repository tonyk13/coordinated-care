import React, { useState , useEffect } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import axios from 'axios';



export default function Billing({ setCurrentPage, patient }) {
    const [billingData, setBillingData] = useState({
        insuranceProvider: "",
        memberID: "",
        effectiveSince: "",
        insurancePhoneNumber: "",
        billingHistory: [],
    });
	useEffect(() => {
        const fetchBillingData = async () => {
            try {
				console.log("Fetching data for patient ID:", patient);

				const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
                const  response  = await axios.get(`${apiUrl}/api/patients/${patient._id}`); 
				console.log(response);
			
		
				setBillingData({
					insuranceProvider: response.data.insuranceProvider,
					memberID: response.data.memberID,
					effectiveSince: response.data.effectiveSince,
					insurancePhoneNumber: response.data.insurancePhoneNumber,
					billingHistory: response.data.billingHistory || []  
				});
                
            } catch (error) {
                console.error("Error fetching billing data:", error);
    
            }
        };

        fetchBillingData();
    }, [patient._id]);

	const handleEditClick = () => {
		setCurrentPage("EditBilling");
	};

	return (
		<Container>
			<Typography variant="subtitle1" gutterBottom sx={{ mt: 4 }}>
				Billing Information:
			</Typography>

			<Typography variant="body1">Insurance Provider: {billingData.insuranceProvider}</Typography>
			<Typography variant="body1">Member ID: {billingData.memberID}</Typography>
			<Typography variant="body1">Effective Since: {billingData.effectiveSince}</Typography>
			<Typography variant="body1">Insurance Phone #: {billingData.insurancePhoneNumber}</Typography>
			<Button onClick={() => handleEditClick()} variant="contained" color="primary" style={{ margin: "10px 0" }}>
				Edit Billing
			</Button>

			<Typography variant="subtitle1" gutterBottom sx={{ mt: 4 }}>
				Billing History:
			</Typography>
			<TableContainer component={Paper} style={{ marginTop: "20px" }}>
				<Table aria-label="billing history">
					<TableHead>
						<TableRow>
							<TableCell>Description</TableCell>
							<TableCell>Cost</TableCell>
							<TableCell>Date Paid</TableCell>
							<TableCell>Payment Method</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{billingData.billingHistory.map((row, index) => (
							<TableRow key={index}>
								<TableCell>{row.description}</TableCell>
								<TableCell>{row.cost}</TableCell>
								<TableCell>{row.datePaid}</TableCell>
								<TableCell>{row.paymentMethod}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	);
}
