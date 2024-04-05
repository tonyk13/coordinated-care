import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";

const options = [
	{
		label: "Dropdown Option 1",
		value: "1",
	},
	{
		label: "Dropdown Option 2",
		value: "2",
	},
];

export const FormInputDropdown = ({ name, control, label }) => {
	const generateSingleOptions = () => {
		return options.map((option) => {
			return (
				<MenuItem key={option.value} value={option.value}>
					{option.label}
				</MenuItem>
			);
		});
	};
	return (
		<FormControl size={"small"}>
			<InputLabel>{label}</InputLabel>
			<Controller
				render={({ field: { onChange, value } }) => (
					<Select onChange={onChange} value={value}>
						{generateSingleOptions()}
					</Select>
				)}
				control={control}
				rules={{ required: "This field is required" }}
				name={name}
			/>
		</FormControl>
	);
};
