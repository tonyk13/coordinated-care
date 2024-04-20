import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, List, ListItemButton, ListItemText, Divider, Button } from "@mui/material";
import Discussion_Post from "./Discussion_Post";
import axios from "axios";

export default function DiscussionBoard({ setCurrentPage }) {
	const [topics, setTopics] = useState([]);

	const [selectedTopic, setSelectedTopic] = useState(null);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";

				const response = await axios.get(`${baseURL}/api/discussions/allDiscussionPosts`);

				setTopics(response.data);
			} catch (error) {
				console.error("There was a problem with the fetch operation:", error);
			}
		};

		fetchPosts();
	}, []);

	const handleTopicClick = (topic) => {
		setSelectedTopic(topic);
	};

	return (
		<Box sx={{ width: "100%", maxWidth: 800, mx: "auto", my: 4 }}>
			<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
				<Typography className="discussionBoardHeader" variant="h4">
					Discussion Board
				</Typography>
				{!selectedTopic && (
					<Button className="addPostButton" variant="contained" onClick={() => setCurrentPage("CreateDiscussionPost")}>
						Add Post
					</Button>
				)}
			</Box>

			{!selectedTopic && (
				<Paper sx={{ p: 2 }}>
					<Typography className="postsHeader" variant="h6" sx={{ mb: 2 }}>
						Posts
					</Typography>
					<List className="listOfDiscussionPosts">
						{topics.map((topic, index) => (
							<React.Fragment key={topic._id}>
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
