import React, { useState } from 'react';
import { Button, Container,TextField, Typography, IconButton, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';


const availableProcedures = [
  'Blood Test',
  'X-Ray',
  'MRI Scan',
  'CT Scan',
  'EKG',
];

export default function CreateNewProcess() {
  const [processName, setProcessName] = useState('');
  const [procedures, setProcedures] = useState(['']);

  const handleProcessNameChange = (event) => {
    setProcessName(event.target.value);
  };

  const handleProcedureChange = (index, event) => {
    const newProcedures = procedures.map((procedure, i) => index === i ? event.target.value : procedure);
    setProcedures(newProcedures);
  };

  const handleAddProcedure = () => {
    setProcedures([...procedures, '']);
  };

  const handleRemoveProcedure = (index) => {
    const newProcedures = procedures.filter((_, i) => i !== index);
    setProcedures(newProcedures);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Container >
      <Typography variant="h4" sx={{ mb: 2 }}>Create New Process</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Process Name"
          variant="outlined"
          value={processName}
          onChange={handleProcessNameChange}
          sx={{ mb: 2 }}
        />
        {procedures.map((procedure, index) => (
          <Box key={index} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <FormControl fullWidth sx={{ mr: 1 }}>
              <InputLabel>{`Procedure ${index + 1}`}</InputLabel>
              <Select
                value={procedure}
                label={`Procedure ${index + 1}`}
                onChange={(event) => handleProcedureChange(index, event)}
              >
                {availableProcedures.map((procedureName) => (
                  <MenuItem key={procedureName} value={procedureName}>{procedureName}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <IconButton onClick={handleAddProcedure}>
              <AddCircleOutlineIcon />
            </IconButton>
            {procedures.length > 1 && (
              <IconButton onClick={() => handleRemoveProcedure(index)}>
                <RemoveCircleOutlineIcon />
              </IconButton>
            )}
          </Box>
        ))}
        <Button variant="contained" type="submit" sx={{ mt: 2 }}>Submit</Button>
      </form>
    </Container>
  );
}

