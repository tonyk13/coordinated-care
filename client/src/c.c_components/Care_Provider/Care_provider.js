import React, {useState} from 'react'
import Topbanner from '../Top_banner'
import Side_navigation_bar from '../Side_navigation_bar'
import Discussion_Board from '../Discussion_Board/Discussion_Board'
import Profile from './/Profile/Profile'
import Send_Feedback from './/Send_Feedback/Send_Feedback'
import { Box, Toolbar } from '@mui/material';

import "../../stylesheets/App.css"

export default function CareProvider() {
    const [currentPage, setCurrentPage] = useState('');

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Topbanner setCurrentPage={setCurrentPage} />
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <Side_navigation_bar setCurrentPage={setCurrentPage} />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
    
            {currentPage === 'Discussion Board' && (
                <Discussion_Board/>
          )}
            {currentPage === 'profile-screen' && (
                <Profile setCurrentPage={setCurrentPage}/>
          )}
            {currentPage === 'User Feedback' && (
                <Send_Feedback setCurrentPage={setCurrentPage}/>
          )}
          </Box>
        </Box>
      </Box>
    );
  }