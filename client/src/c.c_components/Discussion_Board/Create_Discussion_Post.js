import React from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FormInputText } from "../Care_Provider/Equipment/form-components/FormInputText";
import { useAuth0 } from "@auth0/auth0-react";

const defaultValues = {
	title: "",
	summary: "",
	post: "",
};

export default function CreateDiscussionPost({ setCurrentPage }) {
	const { isAuthenticated, user } = useAuth0();

	const { handleSubmit, reset, control } = useForm({
		defaultValues: defaultValues,
	});

	const onSubmit = async (data) => {
		try {
			const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:8000";
			const response = await axios.post(`${baseURL}/api/discussions`, {
				title: data.title,
				summary: data.summary,
				text: data.post, // This assumes your backend expects a key 'text' for the post content
				askedBy: user.nickname,
			});
			console.log("Post created:", response.data);
			setCurrentPage("Discussion Board");
			reset();
		} catch (error) {
			console.error("Error creating post:", error.response ? error.response.data : error);
		}
	};

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
						<Button
							onClick={() => {
								setCurrentPage("Discussion Board");
								reset();
							}}
							variant={"outlined"}
							style={{ marginRight: 20, height: 36 }}
						>
							Cancel
						</Button>
						<Button onClick={handleSubmit(onSubmit)} variant={"contained"} style={{ marginRight: 20, height: 36 }}>
							Submit
						</Button>
					</Box>
				</Paper>
			</Box>
		</Box>
	);
}
