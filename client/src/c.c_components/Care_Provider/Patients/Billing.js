import React from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

export default function Billing({ setCurrentPage }) {
	const billingData = {
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
	};

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
			<Typography variant="body1">Insurance Phone #: {billingData.insurancePhone}</Typography>
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
