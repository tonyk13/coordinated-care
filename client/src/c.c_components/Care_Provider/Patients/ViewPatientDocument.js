import React, { useState, useEffect } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import "@react-pdf-viewer/zoom/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import axios from "axios";
import { Button, Paper, Typography } from "@mui/material";

export default function ViewPatientDocument({ setCurrentPage, selectedDocument }) {
	const [pdfUrl, setPdfUrl] = useState(null);

	const zoomPluginInstance = zoomPlugin();
	const { CurrentScale, ZoomIn, ZoomOut } = zoomPluginInstance;

	useEffect(() => {
		const fetchPdfFile = async () => {
			try {
				const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";

				const response = await axios.get(`${apiUrl}/api/patients/files/${selectedDocument.fileId}`, {
					responseType: "blob",
				});

				const url = URL.createObjectURL(response.data);

				setPdfUrl(url);
			} catch (error) {
				console.error("Error fetching PDF:", error);
				throw error;
			}
		};

		if (selectedDocument.fileId) {
			fetchPdfFile().catch((error) => {
				console.error("Error fetching PDF:", error);
			});
		}

		return () => {
			URL.revokeObjectURL(pdfUrl);
		};
	}, [selectedDocument.fileId]);

	const goBack = () => {
		setCurrentPage("PatientInformation");
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				height: "100%",
			}}
		>
			<Paper elevation={3} sx={{ p: 2 }}>
				<Typography variant="h5">{selectedDocument.documentName}</Typography>
				<Typography variant="subtitle1">{`Document Type: ${selectedDocument.documentType}`}</Typography>
				<Typography variant="subtitle1">{`Uploaded By: ${selectedDocument.uploadedBy}`}</Typography>
				<Typography variant="subtitle1">{`Last Updated: ${selectedDocument.lastUpdated}`}</Typography>
				<Typography variant="subtitle1">{`Access Level: ${selectedDocument.accessLevel}`}</Typography>
			</Paper>

			<div
				style={{
					alignItems: "center",
					backgroundColor: "#eeeeee",
					borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
					display: "flex",
					justifyContent: "center",
					padding: "10px",
					marginTop: "20px",
				}}
			>
				<div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
					<div style={{ padding: "0px 10px" }}>
						<ZoomOut>
							{(props) => (
								<button
									style={{
										backgroundColor: "#357edd",
										border: "none",
										borderRadius: "4px",
										color: "#ffffff",
										cursor: "pointer",
										padding: "8px",
									}}
									onClick={props.onClick}
								>
									Zoom out
								</button>
							)}
						</ZoomOut>
					</div>

					<div style={{ padding: "5px 10px" }}>
						<CurrentScale>{(props) => <>{`${Math.round(props.scale * 100)}%`}</>}</CurrentScale>
					</div>

					<div style={{ padding: "0px 10px" }}>
						<ZoomIn>
							{(props) => (
								<button
									style={{
										backgroundColor: "#357edd",
										border: "none",
										borderRadius: "4px",
										color: "#ffffff",
										cursor: "pointer",
										padding: "8px",
									}}
									onClick={props.onClick}
								>
									Zoom in
								</button>
							)}
						</ZoomIn>
					</div>
				</div>

				<div style={{ margin: "0px 10px" }}>
					<Button variant="outlined" onClick={goBack} sx={{ width: "100px" }}>
						Go Back
					</Button>
				</div>
			</div>

			<div
				style={{
					flex: 1,
					overflow: "hidden",
				}}
			>
				<Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
					<div style={{ height: "750px", width: "90%", marginLeft: "5%", border: "1px solid rgba(0,0,0,0.2)" }}>
						{pdfUrl ? <Viewer plugins={[zoomPluginInstance]} fileUrl={pdfUrl} /> : <p>Loading...</p>}
					</div>
				</Worker>
			</div>
		</div>
	);
}
