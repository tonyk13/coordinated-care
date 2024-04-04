import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller } from "react-hook-form";

export const FormInputDate = ({ name, control, label }) => {
	const today = new Date();

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<Controller
				name={name}
				control={control}
				rules={{ required: "This field is required" }}
				render={({ field, fieldState: { error } }) => (
					<DatePicker
						label={label}
						value={field.value}
						onChange={field.onChange}
						renderInput={(params) => (
							<TextField {...params} error={!!error} helperText={error ? error.message : null} required />
						)}
						minDate={today}
					/>
				)}
			/>
		</LocalizationProvider>
	);
};
