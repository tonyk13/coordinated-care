import React from "react";
import { Box } from "@mui/material";
import { Button, Paper, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormInputText } from "../Care_Provider/Equipment/form-components/FormInputText";

const defaultValues = {
	textValue: "",
	radioValue: "",
	checkboxValue: [],
	dateValue: new Date(),
	dropdownValue: "",
	sliderValue: 0,
};

export default function CreateDiscussionPost() {
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
							New Discussion Post
						</Typography>
					</Box>
					<FormInputText required name="title" control={control} label="Title*" />
					<FormInputText required name="summary" control={control} label="Summary*" />
					<FormInputText required={false} name="post" control={control} label="Post" multiline={true} rows={7} />
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
