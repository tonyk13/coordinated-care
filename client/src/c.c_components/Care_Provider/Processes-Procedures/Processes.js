import React from 'react'
import { Button } from '@mui/material'

export default function Processes({setCurrentPage}) {

    const handleNewProcessClick = (event) =>{
        setCurrentPage('Create_new_process');

    };

  return (
    <>
    <h2 style={{color: 'dodgerblue'}}>Processes</h2>
    <Button variant='contained' onClick={handleNewProcessClick}> Add new Process</Button>
    </>

  )
}
