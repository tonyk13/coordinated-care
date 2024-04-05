import React, { useState } from 'react';
import { Container, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function CreateNewProcedure() {
  const [procedureName, setProcedureName] = useState('');
  const [procedureType, setProcedureType] = useState('');
  const [description, setDescription] = useState('');

  const handleProcedureNameChange = (event) => {
    setProcedureName(event.target.value);
  };

  const handleProcedureTypeChange = (event) => {
    setProcedureType(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Container >
      <Typography variant="h4" sx={{ mb: 4, color:'dodgerblue' }}>Create New Procedure</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Procedure Name"
          variant="outlined"
          value={procedureName}
          onChange={handleProcedureNameChange}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Type</InputLabel>
          <Select
            value={procedureType}
            label="Type"
            onChange={handleProcedureTypeChange}
          >
            <MenuItem value="Surgical">Surgical</MenuItem>
            <MenuItem value="Non-Surgical">Non-Surgical</MenuItem>
            <MenuItem value="Diagnostic">Diagnostic</MenuItem>

          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Description"
          variant="outlined"
          multiline
          rows={4}
          value={description}
          onChange={handleDescriptionChange}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" type="submit">Submit</Button>
      </form>
    </Container>
  );
}
