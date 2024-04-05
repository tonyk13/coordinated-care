import React, {useState} from 'react'
import AdminTopbanner from '../AdminTopBanner'
import { Box, Toolbar } from '@mui/material';
import AdminSideNavigationBar from '../AdminSideNavigationBar'
import Discussion_Board from '../Discussion_Board/Discussion_Board';
import Faculty_Staff from './Faculty_Staff';
import Add_new_faculty from './Add_new_faculty';
import UserFeedback from './UserFeedback/UserFeedback';
import Faculty_Information from './Faculty_Information';



import "../../stylesheets/App.css"


export default function Admin() {
    const [currentPage, setCurrentPage] = useState('');
    const [currentFacultyInformation, setCurrentFacultyInformation] = useState([]);


  return (

   <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <AdminTopbanner setCurrentPage={setCurrentPage} />
        <Box sx={{ display: 'flex', flexGrow: 1 }}>

          <AdminSideNavigationBar setCurrentPage={setCurrentPage} />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {currentPage === 'Discussion Board' && (
                <Discussion_Board/>
          )}
          {currentPage === 'Faculty/Staff' && (
                <Faculty_Staff setCurrentPage={setCurrentPage} setCurrentFacultyInformation={setCurrentFacultyInformation} />
          )}

          {currentPage === 'Add New Faculty' && (
                <Add_new_faculty setCurrentPage={setCurrentPage}/>
          )}

          {currentPage === 'View User Feedback' && (
                <UserFeedback />
          )}

            {currentPage === 'Faculty Information' && (
                <Faculty_Information currentFacultyInformation={currentFacultyInformation} />
          )}

          
 
          </Box>
        </Box>

   </Box>
);
}
