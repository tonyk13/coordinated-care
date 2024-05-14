import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableHead, TableRow, TableCell, TableBody, Box, Button } from "@mui/material";

export default function Documents({ setCurrentPage, patient, setFileId, setSelectedDocument }) {
	const [documents, setDocuments] = useState([]);

	// Fetch this patient's documents
	useEffect(() => {
		const patientId = patient._id;
		console.log("Patient ID: ", patientId);

		const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";

		axios
			.get(`${apiUrl}/api/patients/${patientId}/documents`)
			.then((response) => {
				console.log("Documents in client side: ", response.data || []);
				setDocuments(response.data || []);
			})
			.catch((error) => {
				console.error("Error fetching documents:", error);
				setDocuments([]);
			});
	}, [patient._id]);

	const handleUploadClick = () => {
		setCurrentPage("UploadPatientDocument");
	};

	const handleViewDocumentClick = (document) => {
		setFileId(document.fileId);
		setSelectedDocument(document);
		setCurrentPage("ViewPatientDocument");
	};

	return (
		<div>
			<Box mt="10px">
				<Table>
					<TableHead>
						<TableRow style={{ backgroundColor: "#b0b0b0", fontWeight: "bold", height: "100px" }}>
							<TableCell>Document Name</TableCell>
							<TableCell>Document Type</TableCell>
							<TableCell>Uploaded By</TableCell>
							<TableCell>Date Uploaded</TableCell>
							<TableCell>Access Level</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{documents.length > 0 ? (
							documents.map((document, index) => (
								<TableRow key={index} style={{ backgroundColor: index % 2 === 0 ? "white" : "#f9f9f9" }}>
									<TableCell style={{ color: "blue", textDecoration: "underline" }}>
										<span
											onClick={() => handleViewDocumentClick(document)}
											style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
											role="button"
										>
											{document.documentName}
										</span>
									</TableCell>
									<TableCell>{document.documentType}</TableCell>
									<TableCell>{document.uploadedBy}</TableCell>
									<TableCell>{new Date(document.lastUpdated).toLocaleDateString()}</TableCell>
									<TableCell>{document.accessLevel}</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={3}>No documents found</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
				<Button variant="contained" component="span" onClick={handleUploadClick} style={{ marginTop: "10px" }}>
					Upload a New Patient Document
				</Button>
			</Box>
		</div>
	);
}
