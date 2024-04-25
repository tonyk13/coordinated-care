import React, { useState, useEffect } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import "@react-pdf-viewer/zoom/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import axios from "axios";

export default function ViewPatientDocument({ setCurrentPage, fileId }) {
	// Add a "Go Back" button
	// Add the document information at the top of the page

	const [pdfUrl, setPdfUrl] = useState(null);

	const zoomPluginInstance = zoomPlugin();
	const { CurrentScale, ZoomIn, ZoomOut } = zoomPluginInstance;

	useEffect(() => {
		const fetchPdfFile = async () => {
			try {
				const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";

				// console.log("in fetchPdfFile, about to make request...");
				const response = await axios.get(`${apiUrl}/api/patients/files/${fileId}`, {
					responseType: "blob",
				});
				// console.log("Response: ", response);
				const url = URL.createObjectURL(response.data);
				// console.log("URL: ", url);
				setPdfUrl(url);
			} catch (error) {
				console.error("Error fetching PDF:", error);
				throw error;
			}
		};

		if (fileId) {
			fetchPdfFile().catch((error) => {
				console.error("Error fetching PDF:", error);
			});
		}

		return () => {
			URL.revokeObjectURL(pdfUrl);
		};
	}, [fileId]);

	return (
		<div
			style={{
				border: "1px solid rgba(0, 0, 0, 0.3)",
				display: "flex",
				flexDirection: "column",
				height: "100%",
			}}
		>
			<div
				style={{
					alignItems: "center",
					backgroundColor: "#eeeeee",
					borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
					display: "flex",
					justifyContent: "center",
					padding: "4px",
				}}
			>
				<div style={{ padding: "0px 2px" }}>
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
				<div style={{ padding: "0px 2px" }}>
					<CurrentScale>{(props) => <>{`${Math.round(props.scale * 100)}%`}</>}</CurrentScale>
				</div>
				<div style={{ padding: "0px 2px" }}>
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
