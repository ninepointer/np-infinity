import { Box, Button, Card, CardContent, Grid, Paper, TableContainer, TextField, Typography } from '@mui/material';
import React from 'react';
import MDBox from '../../../components/MDBox';
import MDButton from '../../../components/MDButton';
import MDTypography from '../../../components/MDTypography';
import {CircularProgress, Tooltip} from '@mui/material';
import {useState, useEffect} from 'react';
import axios from "axios";


const BrokerReports = () => {

  let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/"
  let [skip, setSkip] = useState(0);
  const limitSetting = 4;
  const [count, setCount] = useState(0);
  const [isLoading,setIsLoading] = useState(false);
  let [brokerReportData,setBrokerReportData] = useState([])
  

useEffect(()=>{
  let call1 = axios.get((`${baseUrl}api/v1/brokerreport/`),{
              withCredentials: true,
              headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Credentials": true
                },
              })
  Promise.all([call1])
  .then(([api1Response]) => {
    console.log('report',api1Response.data.data);
    // Process the responses here
    setBrokerReportData(api1Response.data.data)
    setCount(api1Response.data.count)
  })
  .catch((error) => {
    // Handle errors here
    console.error(error);
  });
  
},[])

function backHandler(){
  if(skip <= 0){
      return;
  }
  setSkip(prev => prev-limitSetting);
  setBrokerReportData([]);
  setIsLoading(true)
  axios.get(`${baseUrl}api/v1/brokerreport/?skip=${skip-limitSetting}&limit=${limitSetting}`,{
      withCredentials: true,
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true
      },
  })
  .then((res) => {
      setBrokerReportData(res.data.data)
      setCount(res.data.count)
      setTimeout(()=>{
          setIsLoading(false)
        },500)
  }).catch((err) => {
      setIsLoading(false)
      return new Error(err);
  })
}

function nextHandler(){
  if(skip+limitSetting >= count){ 
    return;
  }
  console.log("inside next handler")
  setSkip(prev => prev+limitSetting);
  setBrokerReportData([]);
  setIsLoading(true)
  axios.get(`${baseUrl}api/v1/brokerreport/?skip=${skip+limitSetting}&limit=${limitSetting}`,{
      withCredentials: true,
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true
      },
  })
  .then((res) => {
      console.log('report',res.data.data);
      setBrokerReportData(res.data.data)
      setCount(res.data.count)
      setTimeout(()=>{
          setIsLoading(false)
        },500)
  }).catch((err) => {
      setIsLoading(false)
      return new Error(err);
  })
}

function Delete(id){
  console.log(id)
  axios.get(`${baseUrl}api/v1/brokerreport/delete/${id}`,{
    withCredentials: true,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
    },
  })
  .then((res) => {
      setTimeout(()=>{
          setIsLoading(false)
        },500)
  }).catch((err) => {
      setIsLoading(false)
      return new Error(err);
  })
}

  return (
    <MDBox bgColor="dark" color="light" mb={1} borderRadius={10} minWidth='100%' minHeight='auto'>
      <MDTypography fontSize={15} color='light' p={1} sx={{textAlign:'center'}}>Broker Reports</MDTypography>
      <Grid container spacing={2} p={2}>
        {!isLoading ?
             brokerReportData?.map((elem, index)=>{    
                return(    
                    
                   <MDBox>
                    <MDTypography color='light'>{elem?.brokerName}</MDTypography>
                   </MDBox>
                  
                )
            })
            :
            // <Grid container display="flex" justifyContent="center" alignContent='center' alignItems="center">
                <Grid item display="flex" justifyContent="center" alignContent='center' alignItems="center" lg={12}>
                <MDBox mt={5} mb={5}>
                    <CircularProgress color="info" />
                </MDBox>
                </Grid>
            // </Grid>
            }
            {!isLoading && count !== 0 &&
            <MDBox m={2} display="flex" justifyContent="space-between" alignItems='center' width='100%'>
              <MDButton variant='outlined' color='warning' disabled={(skip+limitSetting)/limitSetting === 1 ? true : false} size="small" onClick={backHandler}>Back</MDButton>
              <MDTypography color="light" fontSize={15} fontWeight='bold'>Total Reports: {!count ? 0 : count} | Page {(skip+limitSetting)/limitSetting} of {!count ? 1 : Math.ceil(count/limitSetting)}</MDTypography>
              <MDButton variant='outlined' color='warning' disabled={Math.ceil(count/limitSetting) === (skip+limitSetting)/limitSetting ? true : !count ? true : false} size="small" onClick={nextHandler}>Next</MDButton>
            </MDBox>
            }
      </Grid>
    </MDBox>
  )
}

export default BrokerReports

















