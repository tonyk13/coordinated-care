import React from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormInputText } from "../Equipment/form-components/FormInputText";
import { FormInputDate } from "../Equipment/form-components/FormInputDate";

const defaultValues = {
	textValue: "",
	dateValue: new Date(),
	dropdownValue: "",
};

export default function OrderLabTest({ setCurrentPage }) {
	const { handleSubmit, reset, control, setValue } = useForm({
		defaultValues: defaultValues,
	});

	const onSubmit = (data) => console.log(data);

	return (
		<Box sx={{ display: "flex", flexDirection: "column", height: "85vh" }}>
			<Box sx={{ display: "flex", flexGrow: 1 }}>
				<Paper
					style={{
						display: "grid",
						gridRowGap: "10px",
						paddingLeft: "100px",
						paddingRight: "100px",
						width: "80vw",
					}}
				>
					<Box style={{ display: "flex", justifyContent: "left", gap: "2.5vw", paddingTop: "30px" }}>
						<Typography variant="h4" sx={{ fontWeight: "bold" }}>
							Order Lab Test
						</Typography>
					</Box>
					<FormInputText required name="lab test name" control={control} label="Lab Test Name*" />
					<FormInputDate name="dateValue" control={control} label="Date*" />
					<FormInputText required name="requested by" control={control} label="Requested By*" />
					<FormInputText required={false} name="notes" control={control} label="Notes" multiline={true} rows={7} />
					<Box style={{ display: "flex", justifyContent: "center", gap: "5vw", paddingBottom: "30px" }}>
						<Button onClick={handleSubmit(onSubmit)} variant={"contained"} sx={{ padding: "6px 50px" }}>
							Submit
						</Button>
					</Box>
				</Paper>
			</Box>
		</Box>
	);
}
