import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';


const accountRequests = [
  { id: 1, firstName: 'Alice', lastName: 'Johnson', email: 'alice@example.com', dob: '1990-01-01', dateRequested: '2024-04-01' },
  { id: 2, firstName: 'Bob', lastName: 'Smith', email: 'bob@example.com', dob: '1992-02-02', dateRequested: '2024-04-02' },
  { id: 3, firstName: 'Charlie', lastName: 'Davis', email: 'charlie@example.com', dob: '1993-03-03', dateRequested: '2024-04-03' },
];

export default function AccountRequests() {
  const handleApprove = (id) => {
    console.log(`Approved request `);

  };

  const handleReject = (id) => {
    console.log(`Rejected request `);

  };

  return (
    <div>
      <h2>Account Requests:</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Date Requested</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accountRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.firstName}</TableCell>
                <TableCell>{request.lastName}</TableCell>
                <TableCell>{request.email}</TableCell>
                <TableCell>{request.dob}</TableCell>
                <TableCell>{request.dateRequested}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleApprove(request.id)}>
                    Approve
                  </Button>
                  {' '}
                  <Button variant="outlined" color="secondary" onClick={() => handleReject(request.id)}>
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
