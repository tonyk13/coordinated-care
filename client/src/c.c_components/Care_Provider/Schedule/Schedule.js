import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import { Button, Grid, Typography, Box, Avatar, Container, Link} from "@mui/material";
import { DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import { DayPilot } from "@daypilot/daypilot-lite-react";
import dayjs from 'dayjs';

export default function Schedule({IdClicked}) {
    const calendarRef = useRef();
    // const employeeProcedures;
    // const employeeAppointments;
    const employee_id = IdClicked;
    const [employeeProcedures, setEmployeeProcedures] = useState([]);	
    const [employeeAppointments, setEmployeeAppointments] = useState([]);	
    useEffect(() => {
      const fetchPatientProcedures = async () => {
        try {
          const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
          const response = await axios.get(`${baseURL}/api/patients/get_procedures_for_employee/${employee_id}`);
          const procedures = response.data.procedures;
          const patientInfoOfProcedures = response.data.patientInfoOfProcedure
          for (let i = 0; i < procedures.length; i++) {
            procedures[i].patientFirstName = patientInfoOfProcedures[i].patientFirstName;
            procedures[i].patientLastName = patientInfoOfProcedures[i].patientLastName;
            procedures[i].patient = patientInfoOfProcedures[i].patient;
          }
          const promises = procedures.map(async (procedure) => {
            const providerId = procedure.providerAssigned;
            const providerNameResponse = await axios.get(`${baseURL}/api/employees/${providerId}`);
            procedure.providerFullName = `${providerNameResponse.data.employee.firstName} ${providerNameResponse.data.employee.lastName}`;
          });
          await Promise.all(promises);

          const promises2 = procedures.map(async (procedure) => {
            const roomId = procedure.room;
            const roomResponse = await axios.get(`${baseURL}/api/rooms/${roomId}`);
            procedure.roomNumber = `${roomResponse.data.roomNumber}`;
          });
          await Promise.all(promises2);
          setEmployeeProcedures(procedures);
        } catch (error) {
          console.error('Error fetching patient appointments:', error);
        }
      };
    
      fetchPatientProcedures();
    }, []);


    useEffect(() => {
      const fetchEmployeeAppointments = async () => {
        try {
          const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
          const response = await axios.get(`${baseURL}/api/patients/get_appointments_for_employee/${employee_id}`);
          const appointments = response.data.appointments;
          const patientInfoOfAppointment = response.data.patientInfoOfAppointment
          // console.log(appointments)
          for (let i = 0; i < appointments.length; i++) {
            appointments[i].patientFirstName = patientInfoOfAppointment[i].patientFirstName;
            appointments[i].patientLastName = patientInfoOfAppointment[i].patientLastName;
            appointments[i].patient = patientInfoOfAppointment[i].patient;
          }
          const promises = appointments.map(async (appointment) => {
            const providerId = appointment.providerAssigned;
            const providerNameResponse = await axios.get(`${baseURL}/api/employees/${providerId}`);
            appointment.providerFullName = `${providerNameResponse.data.employee.firstName} ${providerNameResponse.data.employee.lastName}`;
          });
          await Promise.all(promises);
          setEmployeeAppointments(appointments);
        } catch (error) {
          console.error('Error fetching patient appointments:', error);
        }
      };
    
      fetchEmployeeAppointments();
    }, []);
  
    useEffect(() => {
      const procedureEvents = employeeProcedures.map(procedure => ({
        id: DayPilot.guid(),
        text: procedure.typeOfProcedure,
        start: dayjs(procedure.dateTime, "MM/DD/YYYY hh:mm A").format(),
        end: dayjs(procedure.dateTime, "MM/DD/YYYY hh:mm A").add(2, 'hour').format(),
        backColor: "#1e90ff"
      }));

      const appointmentEvents = employeeAppointments.map(appointment => ({
        id: DayPilot.guid(),
        text: appointment.typeOfProcedure,
        start: dayjs(appointment.dateTime, "MM/DD/YYYY hh:mm A").format(),
        end: dayjs(appointment.dateTime, "MM/DD/YYYY hh:mm A").add(2, 'hour').format(),
        backColor: "#ff474c"
      }));
      const events = procedureEvents.concat(appointmentEvents);
      console.log(events)
      console.log(employeeAppointments)
      console.log(employeeProcedures)
      calendarRef.current.control.update({ events });
    }, [employeeAppointments, employeeProcedures]);
  
    const [calendarConfig] = useState({
      viewType: "Week",
      cellHeight: 30,
      hideFreeCells: true,
    });
  
    return (
      <div>
        <div className="DpCalendar">
          <DayPilotCalendar {...calendarConfig} ref={calendarRef} />
        </div>
      </div>
    );
  }