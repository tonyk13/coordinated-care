import React from 'react'

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Paper, Typography,FormControl,InputLabel,Select,MenuItem,Button } from '@mui/material';
import "../../stylesheets/App.css"
import Faculty_Information from './Faculty_Information';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

export default function SpecificFaculty({nameClicked}) {
  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [Role, setRole] = React.useState('');

  const handleDropDownChange = (event) => {
    setRole(event.target.value);
  };
  


  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        centered
      >
        <h1 className='facultyname'>Dr. {nameClicked}</h1>
        <Tab value="1" label="Faculty Information" />
        <Tab value="2" label="LogIn Settings" />
      </Tabs>
      <TabPanel value={value} index="1">
        <Faculty_Information nameClicked={nameClicked}/>
        
      </TabPanel>
      <TabPanel value={value} index="2">
        <Paper sx={{ p: 2 }}>
        <span className='loginsettings'>UserName : {nameClicked}<br/><br/>Email Address: janedoe@email.com</span><br/><br/>
        <span className='loginsettings'>Role Privileges: </span>
        
        <FormControl sx={{ width: '30%' }} >
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
                 labelId="demo-simple-select-label"
                 id="demo-simple-select"
                 value={Role}
                 label="Role"
                 onChange={handleDropDownChange}
            >
            <MenuItem value={'Admin'}>Admin</MenuItem>
            <MenuItem value={'Care Provider'}>Care Provider</MenuItem>
            </Select>
        </FormControl>
        <br/><br/>
        <Button variant="contained">Reset Password</Button>
        


        </Paper>

       
      </TabPanel>
    </Box>
  );
}
