import React, { useState, useEffect } from 'react';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from 'axios';

export default function RequestEquipment({ setCurrentPage }) {
    const [equipment, setEquipment] = useState([]);
    const [selectedEquipment, setSelectedEquipment] = useState('');
    const [requestDate, setRequestDate] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [reservedDates, setReservedDates] = useState([]);

    const isDateReserved = (date) => {
        const dateString = date.toISOString().split('T')[0]; 

        return reservedDates.some(reservedDate =>
            new Date(reservedDate).toISOString().split('T')[0] === dateString
        );
    };



    useEffect(() => {
        const fetchEquipmentAndEmployees = async () => {
            try {
                const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
                
                const equipmentData = await axios.get(`${baseURL}/api/equipment`);
                //console.log("request: equipment data: ",equipmentData.data);
                const employeeData = await axios.get(`${baseURL}/api/getAllEmployees`);
                console.log("request: employee data: ",employeeData.data.data);
                setEquipment(equipmentData.data);
                setEmployees(employeeData.data.data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchEquipmentAndEmployees();
    }, []);
    useEffect(() => {
        const fetchReservedDates = async () => {
            if (selectedEquipment) {
                try {
                    const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
                    const response = await axios.get(`${baseURL}/api/equipment/${selectedEquipment}/reservations`);
                    const dates = response.data.map(reservation => reservation.date);
                    setReservedDates(dates);
                } catch (error) {
                    console.error('Error fetching reserved dates:', error);
                }
            }
        };
    
        fetchReservedDates();
    }, [selectedEquipment]);
    const handleRequest = async () => {
        if (!selectedEquipment || !requestDate || !selectedEmployee) {
            alert('Please fill all the fields.');
            return;
        }
        try {
            const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";

            await axios.put(`${baseURL}/api/equipment_reservation`, {
                equipmentId: selectedEquipment,
                date: requestDate,
                employeeId: selectedEmployee
            });
            alert('Equipment requested successfully.');
            setCurrentPage("Equipment")
        } catch (error) {
            console.error('Error making request:', error);
            alert('Failed to make the request.');
        }
    };
    const handleCancel = () =>{
        setCurrentPage("Equipment");
    }

    return (
        <div>
            <h1>Request Equipment</h1>
            <FormControl fullWidth>
                <InputLabel id="equipment-label">Equipment</InputLabel>
                <Select
                    labelId="equipment-label"
                    value={selectedEquipment}
                    label="Equipment"
                    onChange={(e) => setSelectedEquipment(e.target.value)}
                >
                    {equipment.map((eq) => (
                        <MenuItem key={eq._id} value={eq.id}>{eq.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <br/><br/>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
            label="Request Date"
            value={requestDate}
            onChange={(newValue) => setRequestDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
            shouldDisableDate={isDateReserved}
            components={{
                OpenPickerIcon: 'KeyboardArrowDown', 
                ClearButton: 'Clear',
            }}
            componentsProps={{
                textField: {
                    fullWidth: true,
                    variant: 'outlined',
                    helperText: 'Select the request date',
                },
            }}
        />
    </LocalizationProvider>
            <br/><br/>
            <FormControl fullWidth>
                <InputLabel id="employee-label">Employee</InputLabel>
                <Select
                    labelId="employee-label"
                    value={selectedEmployee}
                    label="Employee"
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                >
                {Array.isArray(employees) && employees.map((emp) => (
                    <MenuItem key={emp._id} value={emp._id}>{`${emp.firstName} ${emp.lastName}`}</MenuItem>
                ))}
                </Select>
            </FormControl>
            <br/><br/>
            <Button onClick={handleRequest} variant="contained" color="primary">
                Request
            </Button>
            <Button onClick={handleCancel} variant="contained" color="error" style={{ marginLeft: "10px" }}>
                Cancel
            </Button>
        </div>
    );
}
