import React, {memo, useContext} from "react";
import Grid from "@mui/material/Grid";
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";

import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { NetPnlContext } from "../../../PnlContext";
import {AiOutlineLineChart} from 'react-icons/ai'


function StockIndex({socket}) {
    console.log("rendering : stock index")
    //console.log("rendering stock index")
    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/"
    const [indexData, setIndexData] = useState([]);
    const [indexLiveData, setIndexLiveData] = useState([]);
    const pnl = useContext(NetPnlContext);
    const lightTheme = createTheme({ palette: { mode: 'light' } });
    const gpnlcolor = pnl.netPnl >= 0 ? "success" : "error";
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`${baseUrl}api/v1/stockindex`, {withCredentials: true})
        .then((res) => {
            setIndexData(res.data);
        }).catch((err) => {
            return new Error(err);
        })
    }, [])

    useEffect(()=>{
        socket?.on("index-tick", (data) => {
            setIndexLiveData(prevInstruments => {
              const instrumentMap = new Map(prevInstruments.map(instrument => [instrument.instrument_token, instrument]));
              data.forEach(instrument => {
                instrumentMap.set(instrument.instrument_token, instrument);
              });
              return Array.from(instrumentMap.values());
            });
      
          })
    }, [])

    let finalArr = [];
    indexLiveData?.map((elem)=>{
        let obj = {};
        let name = indexData.filter((subElem)=>{
            return subElem.instrumentToken == elem.instrument_token;
        })

        let previousPrice = (elem?.last_price*100)/(100+elem?.change);
        obj.instrument = (
            <MDTypography variant="caption" fontWeight="medium">
              {name[0]?.displayName}
            </MDTypography>
          );
        obj.ltp = (
        <MDTypography variant="caption" fontWeight="medium">
            {elem?.last_price?.toFixed(2)}
        </MDTypography>
        );
        obj.percentageChange = (
        <MDTypography variant="caption" color="text" fontWeight="medium">
            {elem?.change?.toFixed(2)}
        </MDTypography>
        );
        obj.valueChange = (
        <MDTypography variant="caption" color="text" fontWeight="medium">
            {(elem?.last_price - previousPrice)?.toFixed(2)}
        </MDTypography>
        );
        obj.elevation = (
        <MDTypography variant="caption" color="text" fontWeight="medium">
            {2}
        </MDTypography>
        );

        if(name[0]?.displayName !== "FINNIFTY"){
            finalArr.push(obj);
        }
    
        
    })

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 40,
        lineHeight: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

//console.log("finalArr", finalArr)
  return (
    <MDBox mb={0} mt={0}>
        <Grid container spacing={3}>
        {[lightTheme].map((theme, index) => (
            <Grid item xs={12} key={index} >
            <ThemeProvider theme={theme}>
                <MDBox
                sx={{
                    p: 1,
                    pb:2,
                    // bgcolor: 'background.default',
                    bgcolor: 'none',
                    display: 'grid',
                    gridTemplateColumns: { md: '1fr 1fr 1fr' },
                    gap: 3,
                }}
                >
                {finalArr.map((e) => {
                    return (
                        <Item key={e.instrument.props.children} elevation={e.elevation.props.children}>           
                        <MDBox m={0.5} fontWeight={700}>{e.instrument.props.children}</MDBox>
                        <MDBox m={0.5} fontWeight={700} color={e.percentageChange.props.children >= 0 ? "success" : "error"}>{ (e.ltp.props.children) >= 0 ? "+₹" + (new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(e.ltp.props.children)) : "-₹" + (new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(-e.ltp.props.children))}</MDBox>
                        <MDBox ml={0.5} fontWeight={700} mr={0.5} mt={0.5} mb={0.2} fontSize={10} color={e.valueChange.props.children >= 0 ? "success" : "error"}>{e.valueChange.props.children>=0 ? '+₹' : '-₹'}{Math.abs(e.valueChange.props.children).toFixed(2)}</MDBox>
                        <MDBox ml={0.5} fontWeight={700} mr={0.5} mt={0.5} mb={0.2} fontSize={10} color={e.percentageChange.props.children >= 0 ? "success" : "error"}>({e.percentageChange.props.children>0 ? '+' : ''}{e.percentageChange.props.children}%)</MDBox>
                        {/* <MDBox ml={0.5} fontWeight={700} mr={0.5} mt={0.5} mb={0.2} fontSize={10} 
                            style={{display:'flex', alignItems:'center'}} onClick={()=>{window.open(`/chart?instrument=${e.instrument.props.children.includes('NIFTY 50')?'NIFTY-I':'BANKNIFTY-I'}`, '_blank')}}><AiOutlineLineChart size={20}/>
                        </MDBox> */}
                        </Item>
                    )})}
                    <Item elevation={2}>           
                    <MDBox m={0.5} fontWeight={700} >Net P&L:</MDBox>
                    <MDBox m={0.5} fontWeight={700} color={gpnlcolor}>{ (pnl.netPnl) >= 0 ? "+₹" + (new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(pnl.netPnl)) : "-₹" + (new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(-pnl.netPnl))}</MDBox>
                    </Item>
                </MDBox>
            </ThemeProvider>
            </Grid>
        ))}

        </Grid>
    </MDBox>
    )
}

export default memo(StockIndex);
