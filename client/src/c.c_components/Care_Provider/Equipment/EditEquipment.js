import React from "react";
import { Box } from "@mui/material";
import ScienceIcon from "@mui/icons-material/Science";
import { Button, Typography } from "@mui/material";
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
				<Box
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

					<Box sx={{ display: "flex", justifyContent: "center", gap: "20px" }}>
						<Button onClick={handleSubmit(onSubmit)} variant={"contained"} style={{ marginRight: 20, height: 36 }}>
							Submit
						</Button>
						<Button onClick={() => setCurrentPage("Equipment")} variant={"outlined"} style={{ marginRight: 20, height: 36 }}>
							Cancel
						</Button>
						<Button color="error" variant={"contained"} style={{ marginRight: 20, height: 36 }}>
							Delete
						</Button>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}
