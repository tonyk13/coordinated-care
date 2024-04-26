import React, { useState } from "react";
import { Container, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export default function UploadPatientDocument({ patient, setCurrentPage }) {
	// Successful submit should take you back to the documents tab

	const { isAuthenticated, user } = useAuth0();
	console.log("USER: ", user);

	const [documentName, setDocumentName] = useState("");
	const [uploadedBy, setUploadedBy] = useState(user.name);
	const [documentType, setDocumentType] = useState("");
	const [accessLevel, setAccessLevel] = useState("");
	const [description, setDescription] = useState("");

	const [fileId, setFileId] = useState(null);

	const handleDocumentNameChange = (event) => {
		setDocumentName(event.target.value);
	};

	const handleDocumentTypeChange = (event) => {
		setDocumentType(event.target.value);
	};

	const handleAccessLevelChange = (event) => {
		setAccessLevel(event.target.value);
	};

	const handleDescriptionChange = (event) => {
		setDescription(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (!fileId) return;

		setUploadedBy(user.name);

		const formData = new FormData();
		formData.append("fileId", fileId);
		formData.append("documentName", documentName);
		formData.append("uploadedBy", uploadedBy);
		formData.append("accessLevel", accessLevel);
		formData.append("documentType", documentType);
		formData.append("description", description);

		const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";

		axios
			.post(`${apiUrl}/api/patients/${patient._id}/files/upload`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((response) => {
				// You might want to refresh the list of documents or provide user feedback
				// setDocuments([...documents, response.data.document]);
				console.log("File uploaded successfully:", response.data);
			})
			.catch((error) => {
				console.error("Error uploading file:", error);
			});
	};

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			setFileId(file);
		}
	};

	const handleClick = () => {
		document.getElementById("fileInput").click();
	};

	return (
		<Container>
			<Typography variant="h4" sx={{ mb: 4, color: "dodgerblue" }}>
				Upload a New Patient Document
			</Typography>
			<form onSubmit={handleSubmit}>
				<TextField
					fullWidth
					label="Document Name"
					variant="outlined"
					value={documentName}
					onChange={handleDocumentNameChange}
					sx={{ mb: 2 }}
				/>
				<TextField fullWidth label="Uploaded By" variant="outlined" value={user.name} sx={{ mb: 2 }} />
				<FormControl fullWidth sx={{ mb: 2 }}>
					<InputLabel>Access Level</InputLabel>
					<Select value={accessLevel} label="Access Level" onChange={handleAccessLevelChange}>
						<MenuItem value="Any faculty/staff can view">Any faculty/staff can view</MenuItem>
						<MenuItem value="Only me and the patient can view">Only me and the patient can view</MenuItem>
					</Select>
				</FormControl>
				<FormControl fullWidth sx={{ mb: 2 }}>
					<InputLabel>Type</InputLabel>
					<Select value={documentType} label="Type" onChange={handleDocumentTypeChange}>
						<MenuItem value="Health Record">Health Record</MenuItem>
						<MenuItem value="Medication">Medication</MenuItem>
						<MenuItem value="Test Result">Test Result</MenuItem>
					</Select>
				</FormControl>
				<TextField
					fullWidth
					label="Description"
					variant="outlined"
					multiline
					rows={4}
					value={description}
					onChange={handleDescriptionChange}
					sx={{ mb: 2 }}
				/>
				{fileId && <p>Selected filename: {fileId.name}</p>}
				<input type="file" id="fileInput" onChange={handleFileChange} style={{ display: "none" }} />
				<Button variant="contained" color="success" onClick={handleClick}>
					Select File to Upload
				</Button>
				<Button variant="contained" type="submit" sx={{ ml: 2 }}>
					Submit
				</Button>
				<Button onClick={() => setCurrentPage("PatientInformation")} variant="outlined" sx={{ ml: 2 }}>
					Cancel
				</Button>
			</form>
		</Container>
	);
}
