import React, { useState } from "react";
import { Button, TextField, Grid, Typography, Box, Link, Container, Pagination, Avatar } from "@mui/material";

// Extra mui materials for Table (datatable is outdated)
import { Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";

export default function Appointments() {
    const sample_appointment_data = [
        {
            date_time: "04/9/2024 10:30am",
            provider_assigned: "Dr. John Murphy",
            type_of_appointments: "Pre-surgical Testing",
            status: "Cancelled",
        },
        {
            date_time: "04/11/2024 1:00pm",
            provider_assigned: "Dr. John Murphy",
            type_of_appointments: "Consultation",
            status: "Pending",
        },
        {
            date_time: "04/13/2024 9:30am",
            provider_assigned: "Dr. John Murphy",
            type_of_appointments: "Vaccine",
            status: "Confirmed",
        },
        {
            date_time: "04/14/2024 9:30am",
            provider_assigned: "Dr. John Murphy",
            type_of_appointments: "Checkup",
            status: "Confirmed",
        },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case "Cancelled":
                return "red";
            case "Pending":
                return "yellow";
            case "Confirmed":
                return "green";
            default:
                return "inherit";
        }
    };

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
                        {sample_appointment_data.map((appointment, index) => (
                            <TableRow key={index} style={{ backgroundColor: index % 2 === 0 ? "White" : "#f9f9f9" }}>
                                <TableCell style={{ color: "blue", textDecoration: "underline" }}>{appointment.date_time}</TableCell>
                                <TableCell>{appointment.provider_assigned}</TableCell>
                                <TableCell>{appointment.type_of_appointments}</TableCell>
                                <TableCell style={{ color: appointment.status === 'Confirmed' ? 'green' : appointment.status === 'Pending' ? '#FFC400' : appointment.status === 'Cancelled' ? 'red' : 'black' }}>
                                    {appointment.status}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </div>
    );
}
