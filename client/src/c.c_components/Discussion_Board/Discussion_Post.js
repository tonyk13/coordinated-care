import React from "react";
import { Box, Typography, Paper, List, ListItem, ListItemText, Divider, Button } from "@mui/material";

export default function Discussion_Post({ selectedTopic, setSelectedTopic, setCurrentPage }) {
	return (
		<Paper sx={{ p: 2 }}>
			<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
				<Typography component="span" variant="h6" color="text.primary">
					{selectedTopic.title}
				</Typography>
				<Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 1 }}>
					Asked by <span style={{ color: "dodgerblue" }}>{selectedTopic.askedBy}</span> on{" "}
					{new Date(selectedTopic.askDateTime).toLocaleDateString()}
				</Typography>
			</Box>
			<br />
			<Typography paragraph>{selectedTopic.text}</Typography>
			<Typography paragraph color="text.secondary">
				Summary: {selectedTopic.summary}
			</Typography>

			<List sx={{ mt: 2, pl: 4 }}>
				{selectedTopic.comments.map((comment, index) => (
					<React.Fragment key={index}>
						{index > 0 && <Divider />}
						<ListItem sx={{ pl: 4 }}>
							<ListItemText
								primary={comment.text}
								secondary={`Commented by ${comment.commentedBy} on ${new Date(
									comment.commentDateTime
								).toLocaleDateString()}`}
							/>
						</ListItem>
					</React.Fragment>
				))}
			</List>
			<Button variant="contained" onClick={() => setSelectedTopic(null)}>
				Back to topics
			</Button>
			<Button variant="contained" color="success" sx={{ ml: 2 }} onClick={() => setCurrentPage("AddComment")}>
				Add Comment
			</Button>
		</Paper>
	);
}
