import React, { useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

const EditProcedure = ({ setCurrentPage }) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		mode: "onChange",
	});

	useEffect(() => {
		const fetchedProcedure = {
			name: "Knee Replacement",
			patient: "John Doe",
			date: "2024-04-15",
		};

		setValue("name", fetchedProcedure.name);
		setValue("patient", fetchedProcedure.patient);
		setValue("date", fetchedProcedure.date);
	}, [setValue]);

	const onSubmit = (data) => {
		console.log("Procedure updated:", data);
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "column", width: "50vw" }}>
			<Typography variant="h5" component="h1">
				Edit Procedure
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<TextField
					fullWidth
					label="Procedure Name"
					{...register("name", { required: "Procedure Name is required" })}
					margin="normal"
					error={!!errors.name}
					helperText={errors.name?.message}
					required
				/>
				<TextField
					fullWidth
					label="Patient"
					{...register("patient", { required: "Patient Name is required" })}
					margin="normal"
					error={!!errors.patient}
					helperText={errors.patient?.message}
					required
				/>
				<TextField
					fullWidth
					label="Date"
					type="date"
					{...register("date", { required: "Date is required" })}
					margin="normal"
					InputLabelProps={{
						shrink: true,
					}}
					error={!!errors.date}
					helperText={errors.date?.message}
					required
				/>
				<Box sx={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: 2 }}>
					<Button onClick={() => setCurrentPage("Procedures")} variant="outlined" color="primary" sx={{ width: "100px" }}>
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

export default EditProcedure;
