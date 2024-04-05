import React from "react";
import { Box } from "@mui/material";
import ScienceIcon from "@mui/icons-material/Science";
import { Button, Paper, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormInputText } from "./form-components/FormInputText";
import { FormInputDropdown } from "./form-components/FormInputDropdown";
import { FormInputDate } from "./form-components/FormInputDate";

const defaultValues = {
	textValue: "",
	radioValue: "",
	checkboxValue: [],
	dateValue: new Date(),
	dropdownValue: "",
	sliderValue: 0,
};

export default function EditEquipment({ setCurrentPage }) {
	const { handleSubmit, reset, control, setValue } = useForm({
		defaultValues: defaultValues,
	});

	const onSubmit = (data) => console.log(data);

	return (
		<Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
			<Box sx={{ display: "flex", flexGrow: 1 }}>
				<Paper
					style={{
						display: "grid",
						gridRowGap: "10px",
						padding: "20px",
						width: "50vw",
					}}
				>
					<Box style={{ display: "flex", justifyContent: "center", gap: "2.5vw" }}>
						<ScienceIcon sx={{ fontSize: "48px" }} />
						<Typography variant="h4" color="dodgerblue" sx={{ fontWeight: "bold" }}>
							Edit Equipment
						</Typography>
					</Box>
					<FormInputDate name="dateValue" control={control} label="Date Input*" />
					<FormInputDropdown name="equipment" control={control} label="Equipment*" />
					<FormInputText required name="textValue" control={control} label="Quantity*" />
					<FormInputText required={false} name="notesValue" control={control} label="Notes" />

					<Box style={{ display: "flex", justifyContent: "center", gap: "5vw" }}>
						<Button onClick={handleSubmit(onSubmit)} variant={"contained"} sx={{ padding: "6px 50px" }}>
							Submit
						</Button>
						<Button onClick={() => reset()} variant={"outlined"} sx={{ padding: "6px 50px" }}>
							Reset
						</Button>
						<Button color="error" variant={"contained"} sx={{ padding: "6px 50px" }}>
							Delete
						</Button>
					</Box>
				</Paper>
			</Box>
		</Box>
	);
}