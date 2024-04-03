import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";

export const FormInputText = ({ required, name, control, label }) => {
	const rules = required ? { required: "This field is required" } : {};

	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
				<TextField
					helperText={error ? error.message : null}
					size="small"
					error={!!error}
					onChange={onChange}
					value={value}
					fullWidth
					label={label}
					variant="outlined"
				/>
			)}
		/>
	);
};
