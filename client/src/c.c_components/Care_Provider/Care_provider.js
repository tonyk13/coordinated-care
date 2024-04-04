import React, {useState} from 'react'
import Topbanner from '../Top_banner'
import Side_navigation_bar from '../Side_navigation_bar'
import Discussion_Board from '../Discussion_Board/Discussion_Board'
import { Box, Toolbar } from '@mui/material';

import "../../stylesheets/App.css"

export default function CareProvider() {
    const [currentPage, setCurrentPage] = useState('');

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Topbanner />
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <Side_navigation_bar setCurrentPage={setCurrentPage} />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
    
            {currentPage === 'Discussion Board' && (
                <Discussion_Board/>
          )}
          </Box>
        </Box>
      </Box>
    );
  }