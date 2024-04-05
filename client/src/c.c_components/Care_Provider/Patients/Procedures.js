import React, { useState } from "react";
import { Button, TextField, Grid, Typography, Box, Link, Container, Pagination, Avatar } from "@mui/material";

// Extra mui materials for Table (datatable is outdated)
import { Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";

export default function Procedures() {
	const sample_procedure_data = [
		{
            date_time: "04/10/2024 10:30am",
            provider_assigned: "Dr. John Murphy",
            type_of_procedures: "Endoscopy",
            location: "Rm.402",
		},
        {
            date_time: "04/16/2024 1:00pm",
            provider_assigned: "Dr. John Murphy",
            type_of_procedures: "Biopsy",
            location: "Rm.110",
		},
        {
            date_time: "04/20/2024 9:30am",
            provider_assigned: "Dr. John Murphy",
            type_of_procedures: "Dialysis",
            location: "Rm.220",
		},	
	];

	return (
        <div>
            <Box mt="10px">
                <Table>
                    <TableHead>
                        <TableRow style={{ backgroundColor: "#f2f2f2", fontWeight: "bold", height: "100px", backgroundColor: "#b0b0b0" }}>
                            <TableCell>Date-Time</TableCell>
                            <TableCell>Provider Assigned</TableCell>
                            <TableCell>Type of Procedure</TableCell>
                            <TableCell>Location</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sample_procedure_data.map((procedure, index) => (
                            <TableRow key={index} style={{ backgroundColor: index % 2 === 0 ? "White" : "#f9f9f9" }}>
                                <TableCell style={{ color: "blue", textDecoration: "underline" }}>{procedure.date_time}</TableCell>
                                <TableCell>{procedure.provider_assigned}</TableCell>
                                <TableCell>{procedure.type_of_procedures}</TableCell>
                                <TableCell>{procedure.location}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </div>
    );
}
