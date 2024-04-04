import React from "react";
import { Button } from "@mui/material";

export default function Information({ setCurrentPage }) {
	return (
		<div>
			<h1>Placeholder Patient Information Page</h1>
			<Button onClick={() => setCurrentPage("Billing")}>Navigate to Patient Billing</Button>
			<Button onClick={() => setCurrentPage("Order Lab Test")}>Order Lab Test</Button>
		</div>
	);
}
