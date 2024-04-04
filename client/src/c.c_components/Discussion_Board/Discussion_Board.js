import React, { useState } from "react";
import { Box, Typography, Paper, List, ListItem, ListItemButton, ListItemText, Divider, TextField, Button } from "@mui/material";
import Discussion_Post from "./Discussion_Post";

export default function DiscussionBoard({ setCurrentPage }) {
	const topics = [
		{
			id: 1,
			title: "Latest Research on Non-Invasive Cardiac Imaging Techniques",
			summary:
				"A recent study published in the Journal of Cardiac Imaging introduced a new non-invasive imaging technique that promises greater accuracy in detecting coronary artery disease. Would love to hear thoughts on its ....",
			comments: ["comment1", "comment2", "comment3"],
			askedBy: "john",
		},
		{
			id: 2,
			title: "Latest Research on Non-Invasive Cardiac Imaging Techniques",
			summary:
				"A recent study published in the Journal of Cardiac Imaging introduced a new non-invasive imaging technique that promises greater accuracy in detecting coronary artery disease. Would love to hear thoughts on its ....",
			comments: ["comment1", "comment2", "comment3"],
			askedBy: "john",
		},
		{
			id: 3,
			title: "Latest Research on Non-Invasive Cardiac Imaging Techniques",
			summary:
				"A recent study published in the Journal of Cardiac Imaging introduced a new non-invasive imaging technique that promises greater accuracy in detecting coronary artery disease. Would love to hear thoughts on its ....",
			comments: ["comment1", "comment2", "comment3"],
			askedBy: "john",
		},
		{
			id: 4,
			title: "Latest Research on Non-Invasive Cardiac Imaging Techniques",
			summary:
				"A recent study published in the Journal of Cardiac Imaging introduced a new non-invasive imaging technique that promises greater accuracy in detecting coronary artery disease. Would love to hear thoughts on its ....",
			comments: ["comment1", "comment2", "comment3"],
			askedBy: "john",
		},
		{
			id: 5,
			title: "Latest Research on Non-Invasive Cardiac Imaging Techniques",
			summary:
				"A recent study published in the Journal of Cardiac Imaging introduced a new non-invasive imaging technique that promises greater accuracy in detecting coronary artery disease. Would love to hear thoughts on its ....",
			comments: ["comment1", "comment2", "comment3"],
			askedBy: "john",
		},
	];
	const [selectedTopic, setSelectedTopic] = useState(null);

	const handleTopicClick = (topic) => {
		setSelectedTopic(topic);
	};

	return (
		<Box sx={{ width: "100%", maxWidth: 800, mx: "auto", my: 4 }}>
			<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
				<Typography variant="h4">Discussion Board</Typography>
				<Button variant="contained" onClick={() => setCurrentPage("createDiscussionPost")}>
					Add Post
				</Button>
			</Box>

			{!selectedTopic && (
				<Paper sx={{ p: 2 }}>
					<Typography variant="h6" sx={{ mb: 2 }}>
						Topics
					</Typography>
					<List>
						{topics.map((topic, index) => (
							<React.Fragment key={topic.id}>
								{index > 0 && <Divider />}
								<ListItemButton onClick={() => handleTopicClick(topic)}>
									<ListItemText
										primary={topic.title}
										secondary={
											<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
												<Typography component="span" variant="body2" color="text.primary">
													{topic.summary}
												</Typography>
												<Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 1 }}>
													Asked by <span style={{ color: "dodgerblue" }}>{topic.askedBy}</span>
												</Typography>
											</Box>
										}
									/>
								</ListItemButton>
							</React.Fragment>
						))}
					</List>
				</Paper>
			)}
			{selectedTopic && <Discussion_Post setSelectedTopic={setSelectedTopic} selectedTopic={selectedTopic} />}
		</Box>
	);
}
