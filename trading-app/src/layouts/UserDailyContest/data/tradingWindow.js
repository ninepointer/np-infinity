import { React, useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { userContext } from '../../../AuthContext';
import moment from 'moment'

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";
import tradesicon from '../../../assets/images/tradesicon.png'

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "../../../components/MDBox";

// Material Dashboard 2 React base styles

// Images
import MDButton from "../../../components/MDButton";
import MDTypography from "../../../components/MDTypography";
import {InfinityTraderRole, tenxTrader} from "../../../variables";
import ContestCup from '../../../assets/images/candlestick-chart.png'
import ContestCarousel from '../../../assets/images/target.png'
import Timer from '../timer'
import ProgressBar from "../progressBar";
import { HiUserGroup } from 'react-icons/hi';
import AMargin from '../../../assets/images/amargin.png'
import Profit from '../../../assets/images/profit.png'
import Tcost from '../../../assets/images/tcost.png'
import Chain from '../../../assets/images/chain.png'
import Nifty from '../../../assets/images/niftycharticon.png'
import BNifty from '../../../assets/images/bniftycharticon.png'
import FNifty from '../../../assets/images/fniftycharticon.png'

import { Divider } from "@mui/material";



function Header({ e }) {


  return (
            <>  
            <MDBox color="dark" mt={2} mb={1} borderRadius={10} minHeight='80vH'>
                <MDBox bgColor="lightgrey" display='flex' p={2} borderRadius={10}>
                    <MDBox width='100%' minHeight='auto' display='flex' justifyContent='center'>
                    <Grid container spacing={2} xs={12} md={12} lg={12}> 
                    <Grid item xs={12} md={6} lg={3}>
                            <MDButton style={{minWidth:'100%'}}>
                                <MDBox display='flex' alignItems='center'>
                                    <MDBox display='flex' justifyContent='flex-start'><img src={AMargin} width='40px' height='40px'/></MDBox>
                                    <MDBox><MDTypography ml={1} fontSize={13} fontWeight='bold'>Margin:</MDTypography></MDBox>
                                    <MDBox><MDTypography ml={1} fontSize={13}>1,000,000</MDTypography></MDBox>
                                </MDBox>
                            </MDButton>
                    </Grid> 
                    <Grid item xs={12} md={6} lg={3}>
                            <MDButton style={{minWidth:'100%'}}>
                                <MDBox display='flex' alignItems='center'>
                                    <MDBox display='flex' justifyContent='flex-start'><img src={Profit} width='40px' height='40px'/></MDBox>
                                    <MDBox><MDTypography ml={1} fontSize={13} fontWeight='bold'>Gross Profit:</MDTypography></MDBox>
                                    <MDBox><MDTypography ml={1} fontSize={13}>1,000,000</MDTypography></MDBox>
                                </MDBox>
                            </MDButton>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                            <MDButton style={{minWidth:'100%'}}>
                                <MDBox display='flex' alignItems='center'>
                                    <MDBox display='flex' justifyContent='flex-start'><img src={Profit} width='40px' height='40px'/></MDBox>
                                    <MDBox><MDTypography ml={1} fontSize={13} fontWeight='bold'>Net Profit:</MDTypography></MDBox>
                                    <MDBox><MDTypography ml={1} fontSize={13}>1,000,000</MDTypography></MDBox>
                                </MDBox>
                            </MDButton>
                    </Grid> 
                    <Grid item xs={12} md={6} lg={3}>
                            <MDButton style={{minWidth:'100%'}}>
                                <MDBox display='flex' alignItems='center'>
                                    <MDBox display='flex' justifyContent='flex-start'><img src={Tcost} width='40px' height='40px'/></MDBox>
                                    <MDBox><MDTypography ml={1} fontSize={13} fontWeight='bold'>Brokerage:</MDTypography></MDBox>
                                    <MDBox><MDTypography ml={1} fontSize={13}>1,000,000</MDTypography></MDBox>
                                </MDBox>
                            </MDButton>
                    </Grid> 
                    
                            
                    </Grid>
                    </MDBox>
                </MDBox>

                <MDBox bgColor="lightgrey" display='flex' p={2} mt={1} borderRadius={10}>
                    <MDBox width='100%' minHeight='auto' display='flex' justifyContent='center'>
                    <Grid container spacing={2} xs={12} md={12} lg={12}> 
                    <Grid item xs={12} md={6} lg={3}>
                            <MDButton style={{minWidth:'100%'}}>
                                <MDBox display='flex' alignItems='center'>
                                    <MDBox display='flex' justifyContent='flex-start'><img src={Chain} width='40px' height='40px'/></MDBox>
                                    <MDBox><MDTypography ml={1} fontSize={13} fontWeight='bold'>Option Chain</MDTypography></MDBox>
                                </MDBox>
                            </MDButton>
                    </Grid> 
                    <Grid item xs={12} md={6} lg={3}>
                            <MDButton style={{minWidth:'100%'}}>
                                <MDBox display='flex' alignItems='center'>
                                    <MDBox display='flex' justifyContent='flex-start'><img src={Nifty} width='40px' height='40px'/></MDBox>
                                    <MDBox><MDTypography ml={1} fontSize={13} fontWeight='bold'>NIFTY:</MDTypography></MDBox>
                                    <MDBox><MDTypography ml={1} fontSize={13}>1,000,000</MDTypography></MDBox>
                                </MDBox>
                            </MDButton>
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                            <MDButton style={{minWidth:'100%'}}>
                                <MDBox display='flex' alignItems='center'>
                                    <MDBox display='flex' justifyContent='flex-start'><img src={BNifty} width='40px' height='40px'/></MDBox>
                                    <MDBox><MDTypography ml={1} fontSize={13} fontWeight='bold'>BANK NIFTY:</MDTypography></MDBox>
                                    <MDBox><MDTypography ml={1} fontSize={13}>1,000,000</MDTypography></MDBox>
                                </MDBox>
                            </MDButton>
                    </Grid> 
                    <Grid item xs={12} md={6} lg={3}>
                            <MDButton style={{minWidth:'100%'}}>
                                <MDBox display='flex' alignItems='center'>
                                    <MDBox display='flex' justifyContent='flex-start'><img src={FNifty} width='40px' height='40px'/></MDBox>
                                    <MDBox><MDTypography ml={1} fontSize={13} fontWeight='bold'>FINNIFTY:</MDTypography></MDBox>
                                    <MDBox><MDTypography ml={1} fontSize={13}>1,000,000</MDTypography></MDBox>
                                </MDBox>
                            </MDButton>
                    </Grid> 
                    
                            
                    </Grid>
                    </MDBox>
                </MDBox>
            </MDBox>
</>
            
                

  );
}

export default Header;
