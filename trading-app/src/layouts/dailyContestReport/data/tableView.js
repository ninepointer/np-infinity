import React from "react";
// import axios from "axios";
import { useState } from "react";
// import { userContext } from '../../../AuthContext';
// import moment from 'moment';
//

// Material Dashboard 2 React components
import MDBox from "../../../components/MDBox";
// import MDButton from "../../../components/MDButton";
import MDTypography from "../../../components/MDTypography";
import {CircularProgress} from "@mui/material";
import { Grid } from "@mui/material";


export default function TableView({ dateWiseData, contestData, tab}) {
  const [isLoading,setIsLoading] = useState(false);
console.log("contestData", contestData)

  return (

    <MDBox bgColor="dark" color="light" mb={0} borderRadius={10} minWidth='100%' minHeight='auto'>
      {tab === "Trader Side" ?
        <Grid container spacing={1}>
        <Grid container p={1} style={{ border: '1px solid white', borderRadius: 5 }}>
          <Grid item xs={12} md={2} lg={2} display="flex" justifyContent="center" alignContent="center" alignItems="center">
            <MDTypography color="light" fontSize={9} fontWeight="bold">TRADER NAME</MDTypography>
          </Grid>

          <Grid item xs={12} md={2} lg={2} display="flex" justifyContent="center" alignContent="center" alignItems="center">
            <MDTypography color="light" fontSize={9} fontWeight="bold">GROSS P&L</MDTypography>
          </Grid>
          <Grid item xs={12} md={2} lg={2} display="flex" justifyContent="center" alignContent="center" alignItems="center">
            <MDTypography color="light" fontSize={9} fontWeight="bold">TRANSACTION COST</MDTypography>
          </Grid>
          <Grid item xs={12} md={2} lg={2} display="flex" justifyContent="center" alignContent="center" alignItems="center">
            <MDTypography color="light" fontSize={9} fontWeight="bold">NET P&L</MDTypography>
          </Grid>
          <Grid item xs={12} md={2} lg={2} display="flex" justifyContent="center" alignContent="center" alignItems="center">
            <MDTypography color="light" fontSize={9} fontWeight="bold"># OF TRADES</MDTypography>
          </Grid>
          <Grid item xs={12} md={2} lg={2}>
            <MDTypography color="light" fontSize={9} fontWeight="bold" display="flex" justifyContent="center" alignContent="center" alignItems="center">PAYOUT</MDTypography>
          </Grid>
        </Grid>


        {!isLoading ?
          dateWiseData?.map((elem) => {

            const gpnlcolor = (elem?.gpnl) >= 0 ? "success" : "error"
            const npnlcolor = (elem?.npnl) >= 0 ? "success" : "error"
        
            return (


              <Grid container mt={1} p={1} style={{ border: '1px solid white', borderRadius: 5 }}>
                <Grid item xs={12} md={2} lg={2} display="flex" justifyContent="center" alignContent="center" alignItems="center">
                  <MDTypography color="light" fontSize={10} fontWeight="bold">{elem?.name}</MDTypography>
                </Grid>

                <Grid item xs={12} md={2} lg={2} display="flex" justifyContent="center" alignContent="center" alignItems="center">
                  <MDTypography color={gpnlcolor} fontSize={10} fontWeight="bold">{ (elem?.gpnl) >= 0 ? "+₹" + (new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(elem?.gpnl)) : "-₹" + (new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(-elem?.gpnl))}</MDTypography>
                </Grid>
                <Grid item xs={12} md={2} lg={2} display="flex" justifyContent="center" alignContent="center" alignItems="center">
                  <MDTypography color="light" fontSize={10} fontWeight="bold">₹{new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Math.abs(elem?.brokerage))}</MDTypography>
                </Grid>
                <Grid item xs={12} md={2} lg={2} display="flex" justifyContent="center" alignContent="center" alignItems="center">
                  <MDTypography color={npnlcolor} fontSize={10} fontWeight="bold">{ (elem?.npnl) >= 0 ? "+₹" + (new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(elem?.npnl)) : "-₹" + (new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(-elem?.npnl))}</MDTypography>
                </Grid>
                <Grid item xs={12} md={2} lg={2} display="flex" justifyContent="center" alignContent="center" alignItems="center">
                  <MDTypography color={"light"} fontSize={10} fontWeight="bold">{elem?.noOfTrade}</MDTypography>
                </Grid>
                  <Grid item xs={12} md={2} lg={2}>
                  <MDTypography color="light" fontSize={10} fontWeight="bold" display="flex" justifyContent="center" alignContent="center" alignItems="center">{ (elem?.npnl*contestData?.payoutPercentage)/100 >= 0 ? "+₹" + (new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format((elem?.npnl*contestData?.payoutPercentage)/100)) : "-₹" + 0.00}</MDTypography>
                </Grid>
              </Grid>


            )
          })
          :
          <Grid container display="flex" justifyContent="center" alignContent='center' alignItems="center">
            <Grid item display="flex" justifyContent="center" alignContent='center' alignItems="center" lg={12}>
              <MDBox mt={5} mb={5}>
                <CircularProgress color="info" />
              </MDBox>
            </Grid>
          </Grid>
        }

      </Grid>

        :
        <Grid container spacing={1}>
          <Grid container p={1} style={{ border: '1px solid white', borderRadius: 5 }}>
            <Grid item xs={12} md={2} lg={2.4} display="flex" justifyContent="center" alignContent="center" alignItems="center">
              <MDTypography color="light" fontSize={9} fontWeight="bold">TRADER NAME</MDTypography>
            </Grid>

            <Grid item xs={12} md={2} lg={2.4} display="flex" justifyContent="center" alignContent="center" alignItems="center">
              <MDTypography color="light" fontSize={9} fontWeight="bold">GROSS P&L</MDTypography>
            </Grid>
            <Grid item xs={12} md={2} lg={2.4} display="flex" justifyContent="center" alignContent="center" alignItems="center">
              <MDTypography color="light" fontSize={9} fontWeight="bold">TRANSACTION COST</MDTypography>
            </Grid>
            <Grid item xs={12} md={2} lg={2.4} display="flex" justifyContent="center" alignContent="center" alignItems="center">
              <MDTypography color="light" fontSize={9} fontWeight="bold">NET P&L</MDTypography>
            </Grid>
            <Grid item xs={12} md={2} lg={2.4} display="flex" justifyContent="center" alignContent="center" alignItems="center">
              <MDTypography color="light" fontSize={9} fontWeight="bold"># OF TRADES</MDTypography>
            </Grid>
            {/* <Grid item xs={12} md={2} lg={2}>
              <MDTypography color="light" fontSize={9} fontWeight="bold" display="flex" justifyContent="center" alignContent="center" alignItems="center">TRADING DAYS</MDTypography>
            </Grid> */}
          </Grid>


          {!isLoading ?
            dateWiseData?.map((elem) => {

              const gpnlcolor = (elem?.gpnl) >= 0 ? "success" : "error"
              const npnlcolor = (elem?.npnl) >= 0 ? "success" : "error"
              // const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][elem?.dayOfWeek-1];
          
              return (


                <Grid container mt={1} p={1} style={{ border: '1px solid white', borderRadius: 5 }}>
                  <Grid item xs={12} md={2} lg={2.4} display="flex" justifyContent="center" alignContent="center" alignItems="center">
                    <MDTypography color="light" fontSize={10} fontWeight="bold">{elem?.name}</MDTypography>
                  </Grid>

                  <Grid item xs={12} md={2} lg={2.4} display="flex" justifyContent="center" alignContent="center" alignItems="center">
                  <MDTypography color={gpnlcolor} fontSize={10} fontWeight="bold">{ (elem?.gpnl) >= 0 ? "+₹" + (new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(elem?.gpnl)) : "-₹" + (new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(-elem?.gpnl))}</MDTypography>
                  </Grid>
                  <Grid item xs={12} md={2} lg={2.4} display="flex" justifyContent="center" alignContent="center" alignItems="center">
                    <MDTypography color="light" fontSize={10} fontWeight="bold">₹{new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Math.abs(elem?.brokerage))}</MDTypography>
                  </Grid>
                  <Grid item xs={12} md={2} lg={2.4} display="flex" justifyContent="center" alignContent="center" alignItems="center">
                  <MDTypography color={npnlcolor} fontSize={10} fontWeight="bold">{ (elem?.npnl) >= 0 ? "+₹" + (new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(elem?.npnl)) : "-₹" + (new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(-elem?.npnl))}</MDTypography>
                  </Grid>
                  <Grid item xs={12} md={2} lg={2.4} display="flex" justifyContent="center" alignContent="center" alignItems="center">
                    <MDTypography color={"light"} fontSize={10} fontWeight="bold">{elem?.noOfTrade}</MDTypography>
                  </Grid>
                    {/* <Grid item xs={12} md={2} lg={2.4}>
                    <MDTypography color="light" fontSize={10} fontWeight="bold" display="flex" justifyContent="center" alignContent="center" alignItems="center">{elem?.tradingDays}</MDTypography>
                  </Grid> */}
                </Grid>


              )
            })
            :
            <Grid container display="flex" justifyContent="center" alignContent='center' alignItems="center">
              <Grid item display="flex" justifyContent="center" alignContent='center' alignItems="center" lg={12}>
                <MDBox mt={5} mb={5}>
                  <CircularProgress color="info" />
                </MDBox>
              </Grid>
            </Grid>
          }

        </Grid>
      }
    </MDBox>

  );
}
