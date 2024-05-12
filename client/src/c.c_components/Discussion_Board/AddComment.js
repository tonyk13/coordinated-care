import React, { useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FormInputText } from "../Care_Provider/Equipment/form-components/FormInputText";
import { useAuth0 } from "@auth0/auth0-react";

const defaultValues = {
	comment: "",
};

export default function AddComment({ setCurrentPage, discussionId }) {
	const { isAuthenticated, user } = useAuth0();

	const { handleSubmit, reset, control } = useForm({
		defaultValues: defaultValues,
	});

	const onSubmit = async (data) => {
		try {
			const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
			const response = await axios.post(`${baseURL}/api/discussions/${discussionId}/addComment`, {
				text: data.comment,
				commentedBy: user.nickname,
			});
			console.log("Comment added:", response.data);
			reset();
			setCurrentPage("Discussion Board");
		} catch (error) {
			console.error("Error adding comment:", error.response ? error.response.data : error);
		}
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "column", height: "50vh" }}>
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
							New Discussion Comment
						</Typography>
					</Box>
					<FormInputText required={true} name="comment" control={control} label="Comment" multiline={true} rows={5} />
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
