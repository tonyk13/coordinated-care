import React, { useState , useEffect } from "react";
import {
	Container,
	Typography,
	TextField,
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@mui/material";
import axios from 'axios';


export default function EditableBilling({ setCurrentPage, isEditing, setIsEditing, patient }) {
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
				const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
                const response = await axios.get(`${apiUrl}/api/patients/${patient._id}`); 
	
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
    }, []);

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleSave = async () => {
		console.log("Saving data:", billingData);
	
		try {
			const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
			const updateUrl = `${apiUrl}/api/patients/update_billing/${patient._id}`;
	
			const response = await axios.put(updateUrl, {
				insuranceProvider: billingData.insuranceProvider,
				memberID: billingData.memberID,
				effectiveSince: billingData.effectiveSince,
				insurancePhoneNumber: billingData.insurancePhoneNumber,
				billingHistory: billingData.billingHistory
			});
	
			console.log("Update successful:", response.data);
			setIsEditing(false); 
		} catch (error) {
			console.error("Error updating billing data:", error);
		}
	};

	const handleCancel = () => {
		setIsEditing(false);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setBillingData({ ...billingData, [name]: value });
	};

	return (
		<Container>
			<Typography variant="subtitle1" gutterBottom sx={{ mt: 4 }}>
				Billing Information:
			</Typography>

			<TextField
				label="Insurance Provider"
				name="insuranceProvider"
				value={billingData.insuranceProvider}
				onChange={handleChange}
				disabled={!isEditing}
				fullWidth
				margin="normal"
			/>
			<TextField
				label="Member ID"
				name="memberID"
				value={billingData.memberID}
				onChange={handleChange}
				disabled={!isEditing}
				fullWidth
				margin="normal"
			/>
			<TextField
				type="date"
				label="Effective Since"
				name="effectiveSince"
				value={billingData.effectiveSince}
				onChange={handleChange}
				disabled={!isEditing}
				fullWidth
				margin="normal"
			/>
			<TextField
				label="Insurance Phone #"
				name="insurancePhoneNumber"
				value={billingData.insurancePhoneNumber}
				onChange={handleChange}
				disabled={!isEditing}
				fullWidth
				margin="normal"
			/>

			{!isEditing ? (
				<Button variant="contained" color="primary" onClick={handleEdit} sx={{ mt: 2, mr: 1 }}>
					Edit Billing
				</Button>
			) : (
				<>
					<Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2, mr: 1 }}>
						Save
					</Button>
					<Button variant="contained" color="error" onClick={handleCancel} sx={{ mt: 2 }}>
						Cancel
					</Button>
				</>
			)}

			<Typography variant="subtitle1" gutterBottom sx={{ mt: 4 }}>
				Billing History:
			</Typography>
			<TableContainer component={Paper} sx={{ mt: 4 }}>
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
						{billingData.billingHistory && billingData.billingHistory.map((row, index) => (
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
