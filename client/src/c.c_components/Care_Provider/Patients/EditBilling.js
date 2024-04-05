import React, { useState } from "react";
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

export default function EditableBilling({ setCurrentPage, isEditing, setIsEditing }) {
	const [billingData, setBillingData] = useState({
		insuranceProvider: "Blue Cross",
		memberID: "23232332",
		effectiveSince: "01/01/2021",
		insurancePhone: "(888)939-3322",
		billingHistory: [
			{
				description: "Annual Checkup",
				cost: "$206.74",
				datePaid: "10/21/2020",
				paymentMethod: "Insurance",
			},
		],
	});

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleSave = () => {
		console.log("Saved data:", billingData);
		setIsEditing(false);
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
				name="insurancePhone"
				value={billingData.insurancePhone}
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
