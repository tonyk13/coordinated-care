import React, { useState } from "react";
import { Box, List, ListItem, ListItemText, ListItemIcon, Typography, Divider, Paper, Container, Checkbox, Button } from "@mui/material";

const initialChecklists = {
	"Pre-Operative Checkup": ["Blood Test", "X-Ray", "ECG"],
	"Pre-Operative Services": ["Anesthesia Assessment", "Surgical Assessment"],
	"Day Prior to Treatment": ["No food or drink after midnight", "Shower using antiseptic soap"],
	"Intra-Operative": ["Prepare surgical equipment", "Verify surgical site"],
	"Post Anesthesia Care Unit / Post Discharge": ["Monitor vital signs", "Pain management"],
};

const ChecklistSection = ({ title, items, checkedItems, setCheckedItems }) => (
	<Box>
		<Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
			{title}
		</Typography>
		<List dense>
			{items.map((item, index) => (
				<ListItem key={index}>
					<ListItemIcon>
						<Checkbox
							edge="start"
							checked={checkedItems.includes(item)}
							onChange={() => {
								const currentIndex = checkedItems.indexOf(item);
								const newChecked = [...checkedItems];

								if (currentIndex === -1) {
									newChecked.push(item);
								} else {
									newChecked.splice(currentIndex, 1);
								}

								setCheckedItems(newChecked);
							}}
							inputProps={{ "aria-labelledby": `checkbox-list-label-${index}` }}
						/>
					</ListItemIcon>
					<ListItemText id={`checkbox-list-label-${index}`} primary={item} />
				</ListItem>
			))}
		</List>
	</Box>
);

const EditProcess = ({ setCurrentPage, patient }) => {
	const [checklists, setChecklists] = useState(initialChecklists);

	const handleSave = () => {
		setCurrentPage("ViewProcess");
	};

	return (
		<Container>
			<Typography variant="h6" gutterBottom component="div">
				Process Edit
			</Typography>
			<Paper elevation={3} sx={{ p: 2, my: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<Box>
					<Typography variant="h5">{patient.name}</Typography>
					<Typography variant="subtitle1">{`Date of Birth: ${patient.dob}`}</Typography>
					<Typography variant="subtitle1">{`Treatment: ${patient.treatment}`}</Typography>
					<Typography variant="subtitle1">{`Room: ${patient.room}`}</Typography>
					<Typography variant="subtitle1">{`Last Updated: ${patient.lastUpdated}`}</Typography>
				</Box>
				<Button variant="contained" color="success" onClick={handleSave}>
					Save
				</Button>
			</Paper>
			{Object.entries(checklists).map(([sectionTitle, items]) => (
				<ChecklistSection
					key={sectionTitle}
					title={sectionTitle}
					items={items}
					checkedItems={checklists[sectionTitle]}
					setCheckedItems={(checkedItems) => setChecklists({ ...checklists, [sectionTitle]: checkedItems })}
				/>
			))}
			<Divider sx={{ my: 2 }} />
			<Box>
				<Typography variant="subtitle1">{`Admission Date: ${patient.admissionDate}`}</Typography>
				<Typography variant="subtitle1">{`Expected Discharge: ${patient.expectedDischarge}`}</Typography>
				<Typography variant="subtitle1">{`Equipment: ${patient.equipment}`}</Typography>
			</Box>
		</Container>
	);
};

export default EditProcess;
