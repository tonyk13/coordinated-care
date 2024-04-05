import { Button } from '@mui/material'
import React from 'react'

export default function Procedures({setCurrentPage}) {
    const handleNewProcedureClick = (event) =>{
        setCurrentPage('Create_new_procedure');

    };

  return (
    <>
    <h2 style={{color: 'dodgerblue'}}>Procedures</h2>
    <Button variant='contained' onClick={handleNewProcedureClick}> Add new Procedure</Button>
    </>
  )
}
