import Home from './Home';
import Swap from './Swap'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import theme from '../utils/theme/index';
import { Box } from '@mui/material';
import { ThemeProvider } from 'styled-components';
import About from './About';
import Navbar from '../components/Navbars/Navbar';
import Footer from '../components/Footers/Footer';
import Internship from './Internship';
import JobDescription from './JobDescription';

const App = () => {
  return (
    <div style={{background:"#06070A",}}>
    <ThemeProvider theme={theme}>
      <div style={{background:"#06070A",}}>

    <Navbar/>
      </div>
    <Box sx={{bgcolor:"white",height:"100vh",display:"flex",justifyContent:"center",alignItems:"center",}}>
      <Internship/>
      
    </Box>

    <Footer/>
    </ThemeProvider>
    </div>
  )
}

export default App