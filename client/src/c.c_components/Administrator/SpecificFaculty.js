import React , { useEffect, useState }  from 'react'
import axios from 'axios';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Paper, Typography,FormControl,InputLabel,Select,MenuItem,Button, Snackbar } from '@mui/material';
import "../../stylesheets/App.css"
import Faculty_Information from './Faculty_Information';
import Schedules from "../Staff/Schedules"


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

export default function SpecificFaculty({IdClicked}) {
  const [value, setValue] = React.useState('1');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [facultyInfo, setFacultyInfo] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    role: '',
  });
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setSnackbarOpen(false);
};
  useEffect(() => {
    const fetchFacultyDetails = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
        const response = await axios.get(`${apiUrl}/api/employees/${IdClicked}`);
        const employeeData = response.data.employee; 
        setFacultyInfo({
          firstName: employeeData.firstName,
          lastName: employeeData.lastName,
          username: employeeData.username,
          email: employeeData.email,
          role: employeeData.role,
        });
      } catch (error) {
        console.error('Failed to fetch faculty data:', error);
      }
    };
    fetchFacultyDetails();
  }, [IdClicked]);




  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [Role, setRole] = React.useState('');

  const handleDropDownChange = (event) => {
    const newRole = event.target.value;
    setFacultyInfo(prev => ({ ...prev, role: newRole }));
    updateRole(newRole);

  };
  const updateRole = async (newRole) => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    try {
        await axios.put(`${apiUrl}/api/update-role/${IdClicked}`, { role: newRole });
        setSnackbarMessage('Role updated successfully!');
        setSnackbarOpen(true);
    } catch (error) {
        console.error("There was an error updating the role:", error);
        setSnackbarMessage('Failed to update role.');
        setSnackbarOpen(true);
    }
};

  const handleResetPassword = () => {
    const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
			const apiUrl = `${baseURL}/api/send-reset-email`;
			console.log(IdClicked);

			axios.post(apiUrl, { id: IdClicked } )
            	.then(response => {
                	console.log(response);
            	})
            	.catch(error => {
                	console.error("There was an error resetting password:", error);
        
            });
            setSnackbarMessage('Password reset email sent!');
            setSnackbarOpen(true); 
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
        <h1 className='facultyname'>Dr. {facultyInfo.lastName}</h1>
        <Tab value="1" label="Faculty Information" />
        <Tab value="2" label="LogIn Settings" />
        <Tab value="3" label="Schedule" />
      </Tabs>
      <TabPanel value={value} index="1">
        <Faculty_Information IdClicked={IdClicked}/>
      </TabPanel>
      <TabPanel value={value} index="2">
        <Paper sx={{ p: 2 }}>
        <span className='loginsettings'>Email : {facultyInfo.email}<br/><br/></span><br/><br/>
        <span className='loginsettings'>Role Privileges: </span>
        
        <FormControl sx={{ width: '30%' }} >
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
                 labelId="demo-simple-select-label"
                 id="demo-simple-select"
                 value={facultyInfo.role}
                 label="Role"
                 onChange={handleDropDownChange}
            >
            <MenuItem value={'Admin'}>Admin</MenuItem>
            <MenuItem value={'Care Provider'}>Care Provider</MenuItem>
            </Select>
        </FormControl>
        <br/><br/>
        <Button variant="contained" onClick={handleResetPassword}>Reset Password</Button>
        </Paper>   
      </TabPanel>
      <TabPanel value={value} index="3">
        <Schedules IdClicked={IdClicked} />
      </TabPanel>
      <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
          />
    </Box>
  );
}
