import React from 'react';
import { Box, Typography, Paper, Stack, Divider } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

const patientsProcesses = [
  {
    name: 'John Doe',
    dob: '02/14/1990',
    procedures: [
      { name: 'Initial Consultation', physician: 'Dr. Smith', completed: true },
      { name: 'Blood Test', physician: 'Dr. Johnson', completed: true },
      { name: 'X-Ray', physician: 'Dr. Clark', completed: false },
      { name: 'Surgery', physician: 'Dr. Wilson', completed: false },
    ],
  },
  {
    name: 'Jane Smith',
    dob: '03/22/1985',
    procedures: [
      { name: 'Physical Exam', physician: 'Dr. Adams', completed: true },
      { name: 'MRI Scan', physician: 'Dr. Clark', completed: false },
    ],
  },
];

export default function Dashboard() {
  return (
    <Box sx={{ width: '100%', overflowX: 'auto', p: 2 }}>
      <Typography variant="h4" >Welcome User!</Typography>
      <Typography variant="h4" >Today is April 5, 2024</Typography><br/>
      <Typography variant="h3" >Today's Patients: </Typography><br/>
     

      {patientsProcesses.map((patient, patientIndex) => (
        <Box key={patientIndex} sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>{`Patient: ${patient.name}, DOB: ${patient.dob}`}</Typography>
          
          <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
            {patient.procedures.map((procedure, index) => (
              <Paper key={index} elevation={3} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
                
                {procedure.completed ? (
                  <CheckCircleOutlineIcon color="success" />
                ) : (
                  <HourglassEmptyIcon color="action" />
                )}

                <Box>
                  <Typography variant="h6" component="h1">
                    {procedure.name}
                  </Typography>
                  <Typography>{`Physician: ${procedure.physician}`}</Typography>
                </Box>
              </Paper>
            ))}
          </Stack>
        </Box>
      ))}
    </Box>
  );
}
