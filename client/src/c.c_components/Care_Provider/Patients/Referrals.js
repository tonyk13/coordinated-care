import React from "react";
import { Box } from "@mui/material";

// Extra mui materials for Table (datatable is outdated)
import { Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";

export default function Referrals() {
	const sample_document_data = [
		{
			name: "Urologist Referral",
			specialist: "Dr. Smith",
			date: "3/26/2024",
		},
		{
			name: "Dermatologist Referral",
			specialist: "Dr. Johnson",
			date: "3/30/2024",
		},
		{
			name: "Cardiologist Referral",
			specialist: "Dr. Doe",
			date: "4/1/2024",
		},
	];

	return (
		<div>
			<Box mt="10px">
				<Table>
					<TableHead>
						<TableRow style={{ backgroundColor: "#f2f2f2", fontWeight: "bold", height: "100px", backgroundColor: "#b0b0b0" }}>
							<TableCell>Referral Name</TableCell>
							<TableCell>Specialist</TableCell>
							<TableCell>Referral Date</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{sample_document_data.map((document, index) => (
							<TableRow key={index} style={{ backgroundColor: index % 2 === 0 ? "White" : "#f9f9f9" }}>
								<TableCell style={{ color: "blue", textDecoration: "underline" }}>{document.name}</TableCell>
								<TableCell>{document.specialist}</TableCell>
								<TableCell>{document.date}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Box>
		</div>
	);
}
