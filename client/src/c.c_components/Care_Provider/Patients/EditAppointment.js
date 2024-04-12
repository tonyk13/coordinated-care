import React, { useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

const EditAppointment = ({ setCurrentPage }) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		mode: "onChange",
	});

	useEffect(() => {
		const fetchedAppointment = {
			date: "2024-04-14T09:30",
			doctor: "Dr. John Murphy",
			procedure: "Pre-Surgical Testing",
			status: "Confirmed",
		};

		setValue("date", fetchedAppointment.date);
		setValue("doctor", fetchedAppointment.doctor);
		setValue("procedure", fetchedAppointment.procedure);
		setValue("status", fetchedAppointment.status);
	}, [setValue]);

	const onSubmit = (data) => {
		console.log("Procedure updated:", data);
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "column", width: "50vw" }}>
			<Typography variant="h5" component="h1">
				Edit Appointment
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<TextField
					fullWidth
					label="Doctor Assigned"
					{...register("doctor", { required: "Doctor's Name is required" })}
					margin="normal"
					error={!!errors.doctor}
					helperText={errors.doctor?.message}
					required
				/>
				<TextField
					fullWidth
					label="Type of Procedure"
					{...register("procedure", { required: "Procedure Type is required" })}
					margin="normal"
					error={!!errors.procedure}
					helperText={errors.procedure?.message}
					required
				/>
				<TextField
					fullWidth
					label="Status"
					{...register("status", { required: "Status is required" })}
					margin="normal"
					error={!!errors.status}
					helperText={errors.status?.message}
					required
				/>

				<Box sx={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: 2 }}>
					<Button onClick={() => setCurrentPage("PatientInformation")} variant="outlined" color="primary" sx={{ width: "100px" }}>
						Cancel
					</Button>
					<Button type="submit" variant="contained" color="primary" sx={{ width: "100px" }}>
						Save
					</Button>
				</Box>
			</form>
		</Box>
	);
};

export default EditAppointment;
