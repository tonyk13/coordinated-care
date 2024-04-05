import React, { useState } from "react";
import { Button, TextField, Grid, Typography, Box, Link, Container, Pagination, Avatar } from "@mui/material";

// Extra mui materials for Table (datatable is outdated)
import { Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";

export default function Documents() {
	const sample_document_data = [
		{
			document_type: "Vaccinations",
            last_updated: "3/26/2024",
            access_level: "Public",
		},
        {
            document_type: "Vaccinations",
            last_updated: "4/1/2024",
            access_level: "Public",
		},
        {
			document_type: "Prescriptions",
            last_updated: "4/1/2024",
            access_level: "Public",
		},	
	];

	return (
        <div>
            <Box mt="10px">
                <Table>
                    <TableHead>
                        <TableRow style={{ backgroundColor: "#f2f2f2", fontWeight: "bold", height: "100px", backgroundColor: "#b0b0b0" }}>
                            <TableCell>Document Type</TableCell>
                            <TableCell>Last Updated</TableCell>
                            <TableCell>Access Level</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sample_document_data.map((document, index) => (
                            <TableRow key={index} style={{ backgroundColor: index % 2 === 0 ? "White" : "#f9f9f9" }}>
                                <TableCell style={{ color: "blue", textDecoration: "underline" }}>{document.document_type}</TableCell>
                                <TableCell>{document.last_updated}</TableCell>
                                <TableCell>{document.access_level}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </div>
    );
}
