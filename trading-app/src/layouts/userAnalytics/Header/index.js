import React, {useState} from 'react';
import { CircularProgress, Grid } from '@mui/material';
import MDBox from '../../../components/MDBox';
import MDTypography from '../../../components/MDTypography';
import MDButton from '../../../components/MDButton';
import MDAvatar from '../../../components/MDAvatar';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {Tooltip} from '@mui/material';
import stock from "../../../assets/images/analyticspnl.png"
import PNLMetrics from '../data/PNLMetrics';
import MonthLineChart from '../data/MonthLineChart'
import DayLineChart from '../data/DayLineChart'
import BrokerageChart from '../data/BrokerageChart'
import OrdersChart from '../data/OrderChart'
import NetPNLChart from '../data/NetPNLChart'
import GrossPNLChart from '../data/GrossPNLChart'
import DateRangeComponent from '../data/dateRangeSelection'
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function LabTabs() {
  const [value, setValue] = React.useState('1');
  const [isLoading,setIsLoading] = useState(false);
  const [alignment, setAlignment] = React.useState('Paper Trading');
  const [textColor,setTextColor] = React.useState('info');
  const date = new Date();
  const [startDate,setStartDate] = React.useState(dayjs(date));
  const [endDate,setEndDate] = React.useState(dayjs(date));

  // let color = (alignment === 'Paper Trading' ? 'linear-gradient(195deg, #49a3f1, #1A73E8)' : 'white')

  const handleChangeView = (event, newAlignment) => {
    console.log("New Alignment",newAlignment)
    setTextColor("info");
    setAlignment(newAlignment);
  };


  const handleChange = (event, newValue) => {
    setIsLoading(true)
    setValue(newValue);
    setTimeout(() => {
      setIsLoading(false)
    }, 500);
  };

  return (
   
    <MDBox bgColor="dark" color="light" mt={2} mb={1} p={2} borderRadius={10} minHeight='100vh'>
    
    <MDBox mb={2} style={{border:'1px solid white', borderRadius:5}} display="flex" justifyContent="space-between">
      <MDTypography color="light" fontSize={15} fontWeight="bold" p={1} alignItem="center">P&L Metrics</MDTypography>
      <ToggleButtonGroup
      color={textColor}
      style={{backgroundColor:"white",margin:3}}
      value={alignment}
      size='small'
      exclusive
      onChange={handleChangeView}
      aria-label="Platform"
      >
      <ToggleButton style={{paddingLeft:14,paddingRight:14,fontSize:10,fontWeight:700}} value="Paper Trading">Paper Trading</ToggleButton>
      <ToggleButton style={{paddingLeft:14,paddingRight:14,fontSize:10,fontWeight:700}} value="StoxHero Trading">StoxHero Trading</ToggleButton>
      </ToggleButtonGroup>
    </MDBox>

        <PNLMetrics traderType={alignment}/>

        <Grid mt={3} container>
          <Grid item xs={12} md={6} lg={12}>
              <MDBox bgColor="light" borderRadius={5}>

              <MDBox>
                    <Grid container spacing={0} p={1} display="flex" justifyContent="space-around" alignContent="center" alignItems="center">
                    
                      <Grid item xs={12} md={6} lg={3} mt={1} mb={1} display="flex" justifyContent="center" alignContent="center" alignItems="center">
                          <MDTypography color="dark" fontSize={15} fontWeight="bold">Select Date Range</MDTypography>
                      </Grid>

                    <Grid item xs={12} md={6} lg={3} mb={1}>
                    <MDBox display="flex" justifyContent="center" alignContent="center" alignItems="center"  borderRadius={5}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                          <DatePicker
                            label="Start Date"
                            // disabled={true}
                            defaultValue={dayjs(date)}
                            // value={dayjs(date)}
                            // onChange={(e) => {setFormStatePD(prevState => ({
                            //   ...prevState,
                            //   dateField: dayjs(e)
                            // }))}}
                            sx={{ width: '100%'}}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </MDBox>
                    </Grid>
                    

                    <Grid item xs={12} md={6} lg={3} mb={1}>
                    <MDBox display="flex" justifyContent="center" alignContent="center" alignItems="center" borderRadius={4}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                          <DatePicker
                            label="End Date"
                            // disabled={true}
                            defaultValue={dayjs(date)}
                            // value={dayjs(date)}
                            // onChange={(e) => {setFormStatePD(prevState => ({
                            //   ...prevState,
                            //   dateField: dayjs(e)
                            // }))}}
                            sx={{ width: '100%' }}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </MDBox>
                    </Grid>

                    <Grid item xs={12} md={6} lg={3} mt={1} mb={1} display="flex" justifyContent="center" alignContent="center" alignItems="center">
                        <MDButton variant="contained" color="info">Show Details</MDButton>
                    </Grid>

                    </Grid>
                </MDBox>

              </MDBox>
          </Grid>
        </Grid>

        <Grid mt={3} container>
          <Grid item xs={12} md={6} lg={12}>
              <MDBox bgColor="light" borderRadius={5}>

              <MDBox>
                    <Grid container spacing={0} p={2} display="flex" justifyContent="space-around" alignContent="center" alignItems="center">

                    {/* <MDBox display="flex" justifyContent="center" alignContent="center" alignItems="center"> */}
                    <Grid item xs={12} md={6} lg={1.7} display="flex" justifyContent="center" alignContent="center" alignItems="center">
                      <MDBox display="flex" justifyContent="center" alignContent="center" alignItems="center" borderRadius={5} border='1px solid grey' p={1}>
                      <MDTypography fontSize={15} fontWeight="bold">Gross:&nbsp;</MDTypography>
                      <MDTypography fontSize={15} fontWeight="bold" color="success">+₹1500000</MDTypography>
                      </MDBox>
                    </Grid>

                    <Grid item xs={12} md={6} lg={1.7} display="flex" justifyContent="center" alignContent="center" alignItems="center">
                      <MDBox display="flex" justifyContent="center" alignContent="center" alignItems="center" borderRadius={5} border='1px solid grey' p={1}>
                      <MDTypography fontSize={15} fontWeight="bold">Net:&nbsp;</MDTypography>
                      <MDTypography fontSize={15} fontWeight="bold" color="success">+₹1000000</MDTypography>
                      </MDBox>
                    </Grid>

                    <Grid item xs={12} md={6} lg={1.7} display="flex" justifyContent="center" alignContent="center" alignItems="center">
                      <MDBox display="flex" justifyContent="center" alignContent="center" alignItems="center" borderRadius={5} border='1px solid grey' p={1}>
                      <MDTypography fontSize={15} fontWeight="bold">Brokerage:&nbsp;</MDTypography>
                      <MDTypography fontSize={15} fontWeight="bold" color="info">₹10000</MDTypography>
                      </MDBox>
                    </Grid>

                    <Grid item xs={12} md={6} lg={1.7} display="flex" justifyContent="center" alignContent="center" alignItems="center">
                      <MDBox display="flex" justifyContent="center" alignContent="center" alignItems="center" borderRadius={5} border='1px solid grey' p={1}>
                      <MDTypography fontSize={15} fontWeight="bold">Orders:&nbsp;</MDTypography>
                      <MDTypography fontSize={15} fontWeight="bold" color="#344767">1000</MDTypography>
                      </MDBox>
                    </Grid>

                    <Grid item xs={12} md={6} lg={1.7} display="flex" justifyContent="center" alignContent="center" alignItems="center">
                      <MDBox display="flex" justifyContent="center" alignContent="center" alignItems="center" borderRadius={5} border='1px solid grey' p={1}>
                      <MDTypography fontSize={15} fontWeight="bold">Trading Days:&nbsp;</MDTypography>
                      <MDTypography fontSize={15} fontWeight="bold" color="#344767">100</MDTypography>
                      </MDBox>
                    </Grid>

                    <Grid item xs={12} md={6} lg={1.7} display="flex" justifyContent="center" alignContent="center" alignItems="center">
                      <MDBox display="flex" justifyContent="center" alignContent="center" alignItems="center" borderRadius={5} border='1px solid grey' p={1}>
                      <MDTypography fontSize={15} fontWeight="bold">Green Days:&nbsp;</MDTypography>
                      <MDTypography fontSize={15} fontWeight="bold" color="success">10</MDTypography>
                      </MDBox>
                    </Grid>

                    <Grid item xs={12} md={6} lg={1.7} display="flex" justifyContent="center" alignContent="center" alignItems="center">
                      <MDBox display="flex" justifyContent="center" alignContent="center" alignItems="center" borderRadius={5} border='1px solid grey' p={1}>
                      <MDTypography fontSize={15} fontWeight="bold">Red Days:&nbsp;</MDTypography>
                      <MDTypography fontSize={15} fontWeight="bold" color="error">90</MDTypography>
                      </MDBox>
                    </Grid>
                    {/* </MDBox> */}

                    </Grid>
                </MDBox>

              </MDBox>
          </Grid>
        </Grid>

        <Grid mt={0} container spacing={3}>
          
          <Grid item xs={12} md={6} lg={6} overflow='auto'>
          <MDBox p={1} bgColor="light" borderRadius={4}>
            <GrossPNLChart traderType={alignment}/>
          </MDBox>
          </Grid>
          
          <Grid item xs={12} md={6} lg={6} overflow='auto'>
          <MDBox p={1} bgColor="light" borderRadius={4}>
            <NetPNLChart traderType={alignment}/>
          </MDBox>
          </Grid>
          
          <Grid item xs={12} md={6} lg={6} overflow='auto'>
          <MDBox p={1} bgColor="light" borderRadius={4}>
            <BrokerageChart traderType={alignment}/>
          </MDBox>
          </Grid>
          
          <Grid item xs={12} md={6} lg={6} overflow='auto'>
          <MDBox p={1} bgColor="light" borderRadius={4}>
            <OrdersChart traderType={alignment}/>
          </MDBox>
          </Grid>
          
          <Grid item xs={12} md={6} lg={12} overflow='auto'>
          <MDBox p={1} bgColor="light" borderRadius={4}>
            <DayLineChart traderType={alignment}/>
          </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={12} overflow='auto'>
          <MDBox p={1} bgColor="light" borderRadius={4}>
            <MonthLineChart traderType={alignment}/>
          </MDBox>
          </Grid>

        </Grid>

    </MDBox>
  );
}