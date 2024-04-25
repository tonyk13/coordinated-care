import React from "react";
import Privacy_Settings from "./Privacy_Settings";
import Notification_Settings from "./Notification_Settings";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
			{value === index && (
				<Box sx={{ pl: 3, pr: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

export default function Settings() {
	const [value, setValue] = React.useState("1");
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: "100%" }}>
			<Tabs value={value} onChange={handleChange} textColor="primary" indicatorColor="primary" centered>
				<Tab value="1" label="Privacy Settings" />
				<Tab value="2" label="Notification Settings" />
			</Tabs>
			<TabPanel value={value} index="1">
				<Privacy_Settings />
			</TabPanel>
			<TabPanel value={value} index="2">
				<Notification_Settings />
			</TabPanel>
		</Box>
	);
}
