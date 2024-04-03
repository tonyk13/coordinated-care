import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller } from "react-hook-form";

export const FormInputDate = ({ name, control, label }) => {
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<Controller
				name={name}
				control={control}
				render={({ field: { onChange, value } }) => <DatePicker value={value} onChange={onChange} />}
			/>
		</LocalizationProvider>
	);
};
