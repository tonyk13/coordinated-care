import React, { useState , useEffect } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle , TextField} from "@mui/material";
import axios from 'axios';



export default function Billing({ setCurrentPage, patient }) {
    const [billingData, setBillingData] = useState({
        insuranceProvider: "",
        memberID: "",
        effectiveSince: "",
        insurancePhoneNumber: "",
        billingHistory: [],
    });
	const [open, setOpen] = useState(false);
    const [newCharge, setNewCharge] = useState({ description: "", cost: 0 });

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
					billingHistory: response.data.patientBills || []  
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
	const handleClickOpen = () => {
        setOpen(true);
    };
	const handleClose = () => {
        setOpen(false);
    };
	const handleAddCharge = async () => {
		
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
        try {
			const response = await axios.post(`${apiUrl}/api/patients/${patient._id}/charges`, newCharge);
			setBillingData(prevState => ({
				...prevState,
				billingHistory: response.data.patientBills
			}));
		} catch (error) {
			console.error("Failed to add new charge:", error);
			alert("Failed to add new charge: " + (error.response?.data?.message || "Unknown error"));
		}
		handleClose();
    };
	const totalOutstanding = billingData.billingHistory.reduce((acc, curr) => {
        if (!curr.datePaid) {
            return acc + parseFloat(curr.cost);
        }
        return acc;
    }, 0);


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
			<Button onClick={handleClickOpen} variant="contained" color = "success" sx = {{ml:2}}>
				Add new Charge
				</Button>
				<Dialog open={open} onClose={handleClose}>
    				<DialogTitle>Add New Charge</DialogTitle>
    				<DialogContent>
       					 <TextField
           					autoFocus
           					margin="dense"
            				id="description"
            				label="Charge Description"
            				type="text"
            				fullWidth
            				variant="standard"
            				value={newCharge.description}
            				onChange={e => setNewCharge({ ...newCharge, description: e.target.value })}
        				/>
        			<TextField
            			margin="dense"
            			id="cost"
            			label="Cost"
            			type="number"
            			fullWidth
            			variant="standard"
            			value={newCharge.cost}
            			onChange={e => setNewCharge({ ...newCharge, cost: parseFloat(e.target.value) })}
        			/>
    			</DialogContent>
    			<DialogActions>
       				<Button onClick={handleClose}>Cancel</Button>
        			<Button onClick={handleAddCharge}>Add Charge</Button>
    			</DialogActions>
			</Dialog>

			<h3>Outstanding Balance: ${totalOutstanding.toFixed(2)}  </h3>
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
