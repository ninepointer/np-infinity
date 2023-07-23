import {useState, useEffect, useContext} from 'react';
import axios from "axios";
import MDBox from '../../../components/MDBox';
import Grid from "@mui/material/Grid";
import { userContext } from '../../../AuthContext';
import MDTypography from '../../../components/MDTypography';
import { Paper } from '@mui/material';

//icons
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

//data



export default function Dashboard({overallRevenue}) {
console.log(overallRevenue)

const withdrawalData = {
    totalRevenue: 0,
    revenueToday: 0,
    revenueYesterday: 0,
    revenueThisWeek: 0,
    revenueLastWeek: 0,
    revenueThisMonth: 0,
    revenueLastMonth: 0,
    revenueThisYear: 0,
    revenueLastYear: 0
  };
  
  Object.entries(overallRevenue).forEach(([title, details]) => {
    if (title.includes("Withdrawal") && !title.includes("Refund")) {
      withdrawalData.totalRevenue += Math.abs(details.totalRevenue);
      withdrawalData.revenueToday += Math.abs(details.revenueToday);
      withdrawalData.revenueYesterday += Math.abs(details.revenueYesterday);
      withdrawalData.revenueThisWeek += Math.abs(details.revenueThisWeek);
      withdrawalData.revenueLastWeek += Math.abs(details.revenueLastWeek);
      withdrawalData.revenueThisMonth += Math.abs(details.revenueThisMonth);
      withdrawalData.revenueLastMonth += Math.abs(details.revenueLastMonth);
      withdrawalData.revenueThisYear += Math.abs(details.revenueThisYear);
      withdrawalData.revenueLastYear += Math.abs(details.revenueLastYear);
    }
  });
  
  console.log(withdrawalData);

  return (
    
            <Grid container spacing={.5} p={0.5} xs={12} md={12} lg={12} display='flex' justifyContent='center' alignItems='center'>

                <Grid item xs={12} md={3} lg={2.4}>
                    <MDBox bgColor='light' p={1} borderRadius={5} display='flex' justifyContent='center' flexDirection='column' minWidth='100%'>
                        <MDBox>
                            <MDTypography fontSize={13} fontWeight="bold" style={{textAlign:'center'}}>
                                Revenue (Today)
                            </MDTypography>
                        </MDBox>
                        <MDBox>
                            <MDTypography fontSize={13} color={overallRevenue["Amount Credit"]?.revenueToday > overallRevenue["Amount Credit"]?.revenueYesterday ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                             ₹{new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(overallRevenue["Amount Credit"].revenueToday)}
                            </MDTypography>
                            <MDTypography display='flex' justifyContent='center' alignItems='center' fontSize={10} color={overallRevenue["Amount Credit"].revenueToday > overallRevenue["Amount Credit"].revenueYesterday ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{((Math.abs(overallRevenue["Amount Credit"].revenueToday-overallRevenue["Amount Credit"].revenueYesterday))/(overallRevenue["Amount Credit"].revenueYesterday === 0 ? overallRevenue["Amount Credit"].revenueToday : overallRevenue["Amount Credit"].revenueYesterday)*100).toFixed(0)}%</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{overallRevenue["Amount Credit"].revenueToday > overallRevenue["Amount Credit"].revenueYesterday ? <ArrowUpwardIcon alignItems='center'/> : <ArrowDownwardIcon alignItems='center'/>}</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>from yesterday</span>
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                </Grid>

                <Grid item xs={12} md={3} lg={2.4}>
                    <MDBox bgColor='light' p={1} borderRadius={5} display='flex' justifyContent='center' flexDirection='column' minWidth='100%'>
                        <MDBox>
                            <MDTypography fontSize={13} fontWeight="bold" style={{textAlign:'center'}}>
                                Revenue (Week)
                            </MDTypography>
                        </MDBox>
                        <MDBox>
                            <MDTypography fontSize={13} color={overallRevenue["Amount Credit"].revenueThisWeek > overallRevenue["Amount Credit"].revenueLastWeek ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                             ₹{new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(overallRevenue["Amount Credit"].revenueThisWeek)}
                            </MDTypography>
                            <MDTypography display='flex' justifyContent='center' alignItems='center' fontSize={10} color={overallRevenue["Amount Credit"].revenueThisWeek > overallRevenue["Amount Credit"].revenueLastWeek ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{((Math.abs(overallRevenue["Amount Credit"].revenueThisWeek-overallRevenue["Amount Credit"].revenueLastWeek))/(overallRevenue["Amount Credit"].revenueLastWeek === 0 ? overallRevenue["Amount Credit"].revenueThisWeek : overallRevenue["Amount Credit"].revenueLastWeek)*100).toFixed(0)}%</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{overallRevenue["Amount Credit"].revenueThisWeek > overallRevenue["Amount Credit"].revenueLastWeek ? <ArrowUpwardIcon alignItems='center'/> : <ArrowDownwardIcon alignItems='center'/>}</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>from week</span>
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                </Grid>

                <Grid item xs={12} md={3} lg={2.4}>
                    <MDBox bgColor='light' p={1} borderRadius={5} display='flex' justifyContent='center' flexDirection='column' minWidth='100%'>
                        <MDBox>
                            <MDTypography fontSize={13} fontWeight="bold" style={{textAlign:'center'}}>
                                Revenue (Month)
                            </MDTypography>
                        </MDBox>
                        <MDBox>
                            <MDTypography fontSize={13} color={overallRevenue["Amount Credit"].revenueThisMonth > overallRevenue["Amount Credit"].revenueLastMonth ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                             ₹{new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(overallRevenue["Amount Credit"].revenueThisMonth)}
                            </MDTypography>
                            <MDTypography display='flex' justifyContent='center' alignItems='center' fontSize={10} color={overallRevenue["Amount Credit"].revenueThisMonth > overallRevenue["Amount Credit"].revenueLastMonth ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{((Math.abs(overallRevenue["Amount Credit"].revenueThisMonth-overallRevenue["Amount Credit"].revenueLastMonth))/(overallRevenue["Amount Credit"].revenueLastMonth === 0 ? overallRevenue["Amount Credit"].revenueThisMonth : overallRevenue["Amount Credit"].revenueLastMonth)*100).toFixed(0)}%</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{overallRevenue["Amount Credit"].revenueThisMonth > overallRevenue["Amount Credit"].revenueLastMonth ? <ArrowUpwardIcon alignItems='center'/> : <ArrowDownwardIcon alignItems='center'/>}</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>from last month</span>
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                </Grid>

                <Grid item xs={12} md={3} lg={2.4}>
                    <MDBox bgColor='light' p={1} borderRadius={5} display='flex' justifyContent='center' flexDirection='column' minWidth='100%'>
                        <MDBox>
                            <MDTypography fontSize={13} fontWeight="bold" style={{textAlign:'center'}}>
                                Revenue (Year)
                            </MDTypography>
                        </MDBox>
                        <MDBox>
                            <MDTypography fontSize={13} color={overallRevenue["Amount Credit"].revenueThisYear > overallRevenue["Amount Credit"].revenueLastYear ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                             ₹{new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(overallRevenue["Amount Credit"].revenueThisYear)}
                            </MDTypography>
                            <MDTypography display='flex' justifyContent='center' alignItems='center' fontSize={10} color={overallRevenue["Amount Credit"].revenueThisYear > overallRevenue["Amount Credit"].revenueLastYear ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{((Math.abs(overallRevenue["Amount Credit"].revenueThisYear-overallRevenue["Amount Credit"].revenueLastYear))/(overallRevenue["Amount Credit"].revenueLastYear === 0 ? overallRevenue["Amount Credit"].revenueThisYear : overallRevenue["Amount Credit"].revenueLastYear)*100).toFixed(0)}%</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{overallRevenue["Amount Credit"].revenueThisYear > overallRevenue["Amount Credit"].revenueLastYear ? <ArrowUpwardIcon alignItems='center'/> : <ArrowDownwardIcon alignItems='center'/>}</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>from last year</span>
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                </Grid>

                <Grid item xs={12} md={3} lg={2.4}>
                    <MDBox bgColor='light' p={1} borderRadius={5} display='flex' justifyContent='center' flexDirection='column' minWidth='100%'>
                        <MDBox>
                            <MDTypography fontSize={13} fontWeight="bold" style={{textAlign:'center'}}>
                                Total Revenue
                            </MDTypography>
                        </MDBox>
                        <MDBox>
                            <MDTypography fontSize={13} color='success' fontWeight="bold" style={{textAlign:'center'}}>
                             ₹{new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(overallRevenue["Amount Credit"].totalRevenue)}
                            </MDTypography>
                            <MDTypography display='flex' justifyContent='center' alignItems='center' fontSize={10} color='success' fontWeight="bold" style={{textAlign:'center'}}>
                                {/* <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{((Math.abs(overallRevenue["Amount Credit"].revenueThisMonth-overallRevenue["Amount Credit"].revenueLastMonth))/(overallRevenue["Amount Credit"].revenueLastMonth === 0 ? overallRevenue["Amount Credit"].revenueThisMonth : overallRevenue["Amount Credit"].revenueLastMonth)*100).toFixed(0)}%</span>&nbsp; */}
                                {/* <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{overallRevenue["Amount Credit"].revenueThisMonth > overallRevenue["Amount Credit"].revenueLastMonth ? <ArrowUpwardIcon alignItems='center'/> : <ArrowDownwardIcon alignItems='center'/>}</span>&nbsp; */}
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>and growing</span>
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                </Grid>

                <Grid item xs={12} md={3} lg={2.4}>
                    <MDBox bgColor='light' p={1} borderRadius={5} display='flex' justifyContent='center' flexDirection='column' minWidth='100%'>
                        <MDBox>
                            <MDTypography fontSize={13} fontWeight="bold" style={{textAlign:'center'}}>
                                Contest Payout (Today)
                            </MDTypography>
                        </MDBox>
                        <MDBox>
                            <MDTypography fontSize={13} color={overallRevenue["Contest Credit"]?.revenueToday > overallRevenue["Contest Credit"]?.revenueYesterday ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                             ₹{new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(overallRevenue["Contest Credit"]?.revenueToday)}
                            </MDTypography>
                            <MDTypography display='flex' justifyContent='center' alignItems='center' fontSize={10} color={overallRevenue["Contest Credit"]?.revenueToday > overallRevenue["Contest Credit"]?.revenueYesterday ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{((Math.abs(overallRevenue["Contest Credit"]?.revenueToday-overallRevenue["Contest Credit"]?.revenueYesterday))/(overallRevenue["Contest Credit"]?.revenueYesterday === 0 ? overallRevenue["Contest Credit"]?.revenueToday : overallRevenue["Contest Credit"]?.revenueYesterday)*100).toFixed(0)}%</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{overallRevenue["Contest Credit"]?.revenueThisYear > overallRevenue["Contest Credit"]?.revenueYesterday ? <ArrowUpwardIcon alignItems='center'/> : <ArrowDownwardIcon alignItems='center'/>}</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>from yesterday</span>
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                </Grid>

                <Grid item xs={12} md={3} lg={2.4}>
                    <MDBox bgColor='light' p={1} borderRadius={5} display='flex' justifyContent='center' flexDirection='column' minWidth='100%'>
                        <MDBox>
                            <MDTypography fontSize={13} fontWeight="bold" style={{textAlign:'center'}}>
                                Contest Payout (Week)
                            </MDTypography>
                        </MDBox>
                        <MDBox>
                            <MDTypography fontSize={13} color={overallRevenue["Contest Credit"]?.revenueThisWeek > overallRevenue["Contest Credit"]?.revenueLastWeek ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                             ₹{new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(overallRevenue["Contest Credit"]?.revenueThisWeek)}
                            </MDTypography>
                            <MDTypography display='flex' justifyContent='center' alignItems='center' fontSize={10} color={overallRevenue["Contest Credit"]?.revenueThisWeek > overallRevenue["Contest Credit"]?.revenueLastWeek ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{((Math.abs(overallRevenue["Contest Credit"]?.revenueThisWeek-overallRevenue["Contest Credit"]?.revenueLastWeek))/(overallRevenue["Contest Credit"]?.revenueLastWeek === 0 ? overallRevenue["Contest Credit"]?.revenueThisWeek : overallRevenue["Contest Credit"]?.revenueLastWeek)*100).toFixed(0)}%</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{overallRevenue["Contest Credit"]?.revenueThisWeek > overallRevenue["Contest Credit"]?.revenueLastWeek ? <ArrowUpwardIcon alignItems='center'/> : <ArrowDownwardIcon alignItems='center'/>}</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>from last week</span>
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                </Grid>

                <Grid item xs={12} md={3} lg={2.4}>
                    <MDBox bgColor='light' p={1} borderRadius={5} display='flex' justifyContent='center' flexDirection='column' minWidth='100%'>
                        <MDBox>
                            <MDTypography fontSize={13} fontWeight="bold" style={{textAlign:'center'}}>
                                Contest Payout (Month)
                            </MDTypography>
                        </MDBox>
                        <MDBox>
                            <MDTypography fontSize={13} color={overallRevenue["Contest Credit"]?.revenueThisMonth > overallRevenue["Contest Credit"]?.revenueLastMonth ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                             ₹{new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(overallRevenue["Contest Credit"]?.revenueThisMonth)}
                            </MDTypography>
                            <MDTypography display='flex' justifyContent='center' alignItems='center' fontSize={10} color={overallRevenue["Contest Credit"]?.revenueThisMonth > overallRevenue["Contest Credit"]?.revenueLastMonth ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{((Math.abs(overallRevenue["Contest Credit"]?.revenueThisMonth-overallRevenue["Contest Credit"]?.revenueLastMonth))/(overallRevenue["Contest Credit"]?.revenueLastMonth === 0 ? overallRevenue["Contest Credit"]?.revenueThisMonth : overallRevenue["Contest Credit"]?.revenueLastMonth)*100).toFixed(0)}%</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{overallRevenue["Contest Credit"]?.revenueThisMonth > overallRevenue["Contest Credit"]?.revenueLastMonth ? <ArrowUpwardIcon alignItems='center'/> : <ArrowDownwardIcon alignItems='center'/>}</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>from last month</span>
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                </Grid>

                <Grid item xs={12} md={3} lg={2.4}>
                    <MDBox bgColor='light' p={1} borderRadius={5} display='flex' justifyContent='center' flexDirection='column' minWidth='100%'>
                        <MDBox>
                            <MDTypography fontSize={13} fontWeight="bold" style={{textAlign:'center'}}>
                                Contest Payout (Year)
                            </MDTypography>
                        </MDBox>
                        <MDBox>
                            <MDTypography fontSize={13} color={overallRevenue["Contest Credit"]?.revenueThisYear > overallRevenue["Contest Credit"]?.revenueLastYear ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                             ₹{new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(overallRevenue["Contest Credit"]?.revenueThisYear)}
                            </MDTypography>
                            <MDTypography display='flex' justifyContent='center' alignItems='center' fontSize={10} color={overallRevenue["Contest Credit"]?.revenueThisYear > overallRevenue["Contest Credit"]?.revenueLastYear ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{((Math.abs(overallRevenue["Contest Credit"]?.revenueThisYear-overallRevenue["Contest Credit"]?.revenueLastYear))/(overallRevenue["Contest Credit"]?.revenueLastYear === 0 ? overallRevenue["Contest Credit"]?.revenueThisYear : overallRevenue["Contest Credit"]?.revenueLastYear)*100).toFixed(0)}%</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{overallRevenue["Contest Credit"]?.revenueThisYear > overallRevenue["Contest Credit"]?.revenueLastYear ? <ArrowUpwardIcon alignItems='center'/> : <ArrowDownwardIcon alignItems='center'/>}</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>from last year</span>
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                </Grid>

                <Grid item xs={12} md={3} lg={2.4}>
                    <MDBox bgColor='light' p={1} borderRadius={5} display='flex' justifyContent='center' flexDirection='column' minWidth='100%'>
                        <MDBox>
                            <MDTypography fontSize={13} fontWeight="bold" style={{textAlign:'center'}}>
                                Total Contest Payout
                            </MDTypography>
                        </MDBox>
                        <MDBox>
                            <MDTypography fontSize={13} color='success' fontWeight="bold" style={{textAlign:'center'}}>
                             ₹{new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(overallRevenue["Contest Credit"]?.totalRevenue)}
                            </MDTypography>
                            <MDTypography display='flex' justifyContent='center' alignItems='center' fontSize={10} color='success' fontWeight="bold" style={{textAlign:'center'}}>
                                {/* <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{((Math.abs(overallRevenue["Contest Credit"]?.revenueThisYear-overallRevenue["Contest Credit"]?.revenueLastYear))/(overallRevenue["Contest Credit"]?.revenueLastYear === 0 ? overallRevenue["Contest Credit"]?.revenueThisYear : overallRevenue["Contest Credit"]?.revenueLastYear)*100).toFixed(0)}%</span>&nbsp; */}
                                {/* <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{overallRevenue["Contest Credit"]?.revenueThisYear > overallRevenue["Contest Credit"]?.revenueLastYear ? <ArrowUpwardIcon alignItems='center'/> : <ArrowDownwardIcon alignItems='center'/>}</span>&nbsp; */}
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>and growing</span>
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                </Grid>

                <Grid item xs={12} md={3} lg={2.4}>
                    <MDBox bgColor='light' p={1} borderRadius={5} display='flex' justifyContent='center' flexDirection='column' minWidth='100%'>
                        <MDBox>
                            <MDTypography fontSize={13} fontWeight="bold" style={{textAlign:'center'}}>
                                TenX Payout (Today)
                            </MDTypography>
                        </MDBox>
                        <MDBox>
                            <MDTypography fontSize={13} color={overallRevenue["TenX Trading Payout"]?.revenueToday > overallRevenue["TenX Trading Payout"]?.revenueYesterday ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                             ₹{new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(overallRevenue["TenX Trading Payout"]?.revenueToday)}
                            </MDTypography>
                            <MDTypography display='flex' justifyContent='center' alignItems='center' fontSize={10} color={overallRevenue["TenX Trading Payout"]?.revenueToday > overallRevenue["TenX Trading Payout"]?.revenueYesterday ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{((Math.abs(overallRevenue["TenX Trading Payout"]?.revenueToday-overallRevenue["TenX Trading Payout"]?.revenueYesterday))/(overallRevenue["TenX Trading Payout"]?.revenueYesterday === 0 ? overallRevenue["TenX Trading Payout"]?.revenueToday : overallRevenue["TenX Trading Payout"]?.revenueYesterday)*100).toFixed(0)}%</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{overallRevenue["TenX Trading Payout"]?.revenueToday > overallRevenue["TenX Trading Payout"]?.revenueYesterday ? <ArrowUpwardIcon alignItems='center'/> : <ArrowDownwardIcon alignItems='center'/>}</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>from yesterday</span>
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                </Grid>

                <Grid item xs={12} md={3} lg={2.4}>
                    <MDBox bgColor='light' p={1} borderRadius={5} display='flex' justifyContent='center' flexDirection='column' minWidth='100%'>
                        <MDBox>
                            <MDTypography fontSize={13} fontWeight="bold" style={{textAlign:'center'}}>
                                TenX Payout (Week)
                            </MDTypography>
                        </MDBox>
                        <MDBox>
                            <MDTypography fontSize={13} color={overallRevenue["TenX Trading Payout"]?.revenueThisWeek > overallRevenue["TenX Trading Payout"]?.revenueLastWeek ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                             ₹{new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(overallRevenue["TenX Trading Payout"]?.revenueThisWeek)}
                            </MDTypography>
                            <MDTypography display='flex' justifyContent='center' alignItems='center' fontSize={10} color={overallRevenue["TenX Trading Payout"]?.revenueThisWeek > overallRevenue["TenX Trading Payout"]?.revenueLastWeek ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{((Math.abs(overallRevenue["TenX Trading Payout"]?.revenueThisWeek-overallRevenue["TenX Trading Payout"]?.revenueLastWeek))/(overallRevenue["TenX Trading Payout"]?.revenueLastWeek === 0 ? overallRevenue["TenX Trading Payout"]?.revenueThisWeek : overallRevenue["TenX Trading Payout"]?.revenueLastWeek)*100).toFixed(0)}%</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{overallRevenue["TenX Trading Payout"]?.revenueThisWeek > overallRevenue["TenX Trading Payout"]?.revenueLastWeek ? <ArrowUpwardIcon alignItems='center'/> : <ArrowDownwardIcon alignItems='center'/>}</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>from last week</span>
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                </Grid>

                <Grid item xs={12} md={3} lg={2.4}>
                    <MDBox bgColor='light' p={1} borderRadius={5} display='flex' justifyContent='center' flexDirection='column' minWidth='100%'>
                        <MDBox>
                            <MDTypography fontSize={13} fontWeight="bold" style={{textAlign:'center'}}>
                                TenX Payout (Month)
                            </MDTypography>
                        </MDBox>
                        <MDBox>
                            <MDTypography fontSize={13} color={overallRevenue["TenX Trading Payout"]?.revenueThisMonth > overallRevenue["TenX Trading Payout"]?.revenueLastMonth ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                             ₹{new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(overallRevenue["TenX Trading Payout"]?.revenueThisMonth)}
                            </MDTypography>
                            <MDTypography display='flex' justifyContent='center' alignItems='center' fontSize={10} color={overallRevenue["TenX Trading Payout"]?.revenueThisMonth > overallRevenue["TenX Trading Payout"]?.revenueLastMonth ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{((Math.abs(overallRevenue["TenX Trading Payout"]?.revenueThisMonth-overallRevenue["TenX Trading Payout"]?.revenueLastMonth))/(overallRevenue["TenX Trading Payout"]?.revenueLastMonth === 0 ? overallRevenue["TenX Trading Payout"]?.revenueThisMonth : overallRevenue["TenX Trading Payout"]?.revenueLastMonth)*100).toFixed(0)}%</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{overallRevenue["TenX Trading Payout"]?.revenueThisMonth > overallRevenue["TenX Trading Payout"]?.revenueLastMonth ? <ArrowUpwardIcon alignItems='center'/> : <ArrowDownwardIcon alignItems='center'/>}</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>from last month</span>
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                </Grid>

                <Grid item xs={12} md={3} lg={2.4}>
                    <MDBox bgColor='light' p={1} borderRadius={5} display='flex' justifyContent='center' flexDirection='column' minWidth='100%'>
                        <MDBox>
                            <MDTypography fontSize={13} fontWeight="bold" style={{textAlign:'center'}}>
                                TenX Payout (Year)
                            </MDTypography>
                        </MDBox>
                        <MDBox>
                            <MDTypography fontSize={13} color={overallRevenue["TenX Trading Payout"]?.revenueThisYear > overallRevenue["TenX Trading Payout"]?.revenueLastYear ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                             ₹{new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(overallRevenue["TenX Trading Payout"]?.revenueThisYear)}
                            </MDTypography>
                            <MDTypography display='flex' justifyContent='center' alignItems='center' fontSize={10} color={overallRevenue["TenX Trading Payout"]?.revenueThisYear > overallRevenue["TenX Trading Payout"]?.revenueLastYear ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{((Math.abs(overallRevenue["TenX Trading Payout"]?.revenueThisYear-overallRevenue["TenX Trading Payout"]?.revenueLastYear))/(overallRevenue["TenX Trading Payout"]?.revenueLastYear === 0 ? overallRevenue["TenX Trading Payout"]?.revenueThisYear : overallRevenue["TenX Trading Payout"]?.revenueLastYear)*100).toFixed(0)}%</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{overallRevenue["TenX Trading Payout"]?.revenueThisYear > overallRevenue["TenX Trading Payout"]?.revenueLastYear ? <ArrowUpwardIcon alignItems='center'/> : <ArrowDownwardIcon alignItems='center'/>}</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>from last year</span>
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                </Grid>

                <Grid item xs={12} md={3} lg={2.4}>
                    <MDBox bgColor='light' p={1} borderRadius={5} display='flex' justifyContent='center' flexDirection='column' minWidth='100%'>
                        <MDBox>
                            <MDTypography fontSize={13} fontWeight="bold" style={{textAlign:'center'}}>
                                Total TenX Payout
                            </MDTypography>
                        </MDBox>
                        <MDBox>
                            <MDTypography fontSize={13} color='success' fontWeight="bold" style={{textAlign:'center'}}>
                             ₹{new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(overallRevenue["TenX Trading Payout"]?.totalRevenue)}
                            </MDTypography>
                            <MDTypography display='flex' justifyContent='center' alignItems='center' fontSize={10} color='success' fontWeight="bold" style={{textAlign:'center'}}>
                                {/* <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{((Math.abs(overallRevenue["TenX Trading Payout"]?.revenueThisYear-overallRevenue["TenX Trading Payout"]?.revenueLastYear))/(overallRevenue["TenX Trading Payout"]?.revenueLastYear === 0 ? overallRevenue["TenX Trading Payout"]?.revenueThisYear : overallRevenue["TenX Trading Payout"]?.revenueLastYear)*100).toFixed(0)}%</span>&nbsp; */}
                                {/* <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{overallRevenue["TenX Trading Payout"]?.revenueThisYear > overallRevenue["TenX Trading Payout"]?.revenueLastYear ? <ArrowUpwardIcon alignItems='center'/> : <ArrowDownwardIcon alignItems='center'/>}</span>&nbsp; */}
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>and growing</span>
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                </Grid>

                <Grid item xs={12} md={3} lg={2.4}>
                    <MDBox bgColor='light' p={1} borderRadius={5} display='flex' justifyContent='center' flexDirection='column' minWidth='100%'>
                        <MDBox>
                            <MDTypography fontSize={13} fontWeight="bold" style={{textAlign:'center'}}>
                                Internship Payout (Today)
                            </MDTypography>
                        </MDBox>
                        <MDBox>
                            <MDTypography fontSize={13} color={overallRevenue["Internship Payout"]?.revenueToday > overallRevenue["Internship Payout"]?.revenueYesterday ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                             ₹{new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(overallRevenue["Internship Payout"]?.revenueToday)}
                            </MDTypography>
                            <MDTypography display='flex' justifyContent='center' alignItems='center' fontSize={10} color={overallRevenue["Internship Payout"]?.revenueToday > overallRevenue["Internship Payout"]?.revenueYesterday ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{isNaN(((Math.abs((overallRevenue["Internship Payout"]?.revenueToday??0)-(overallRevenue["Internship Payout"]?.revenueYesterday??0)))/(overallRevenue["Internship Payout"]?.revenueYesterday??0 === 0 ? overallRevenue["Internship Payout"]?.revenueToday??0 : overallRevenue["Internship Payout"]?.revenueYesterday??0)*100).toFixed(0)) ? 0 : ((Math.abs((overallRevenue["Internship Payout"]?.revenueToday??0)-(overallRevenue["Internship Payout"]?.revenueYesterday??0)))/(overallRevenue["Internship Payout"]?.revenueYesterday??0 === 0 ? overallRevenue["Internship Payout"]?.revenueToday??0 : overallRevenue["Internship Payout"]?.revenueYesterday??0)*100).toFixed(0)}%</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{overallRevenue["Internship Payout"]?.revenueToday > overallRevenue["Internship Payout"]?.revenueYesterday ? <ArrowUpwardIcon alignItems='center'/> : <ArrowDownwardIcon alignItems='center'/>}</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>from yesterday</span>
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                </Grid>

                <Grid item xs={12} md={3} lg={2.4}>
                    <MDBox bgColor='light' p={1} borderRadius={5} display='flex' justifyContent='center' flexDirection='column' minWidth='100%'>
                        <MDBox>
                            <MDTypography fontSize={13} fontWeight="bold" style={{textAlign:'center'}}>
                                Internship Payout (Week)
                            </MDTypography>
                        </MDBox>
                        <MDBox>
                            <MDTypography fontSize={13} color={overallRevenue["Internship Payout"]?.revenueThisWeek > overallRevenue["Internship Payout"]?.revenueLastWeek ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                             ₹{new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(overallRevenue["Internship Payout"]?.revenueThisWeek??0)}
                            </MDTypography>
                            <MDTypography display='flex' justifyContent='center' alignItems='center' fontSize={10} color={overallRevenue["Internship Payout"]?.revenueThisWeek > overallRevenue["Internship Payout"]?.revenueLastWeek ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{isNaN(((Math.abs((overallRevenue["Internship Payout"]?.revenueThisWeek??0)-(overallRevenue["Internship Payout"]?.revenueLastWeek??0)))/(overallRevenue["Internship Payout"]?.revenueLastWeek??0 === 0 ? overallRevenue["Internship Payout"]?.revenueThisWeek??0 : overallRevenue["Internship Payout"]?.revenueLastWeek??0)*100).toFixed(0)) ? 0 : ((Math.abs((overallRevenue["Internship Payout"]?.revenueThisWeek??0)-(overallRevenue["Internship Payout"]?.revenueLastWeek??0)))/(overallRevenue["Internship Payout"]?.revenueLastWeek??0 === 0 ? overallRevenue["Internship Payout"]?.revenueThisWeek??0 : overallRevenue["Internship Payout"]?.revenueLastWeek??0)*100).toFixed(0)}%</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{overallRevenue["Internship Payout"]?.revenueThisWeek??0 > overallRevenue["Internship Payout"]?.revenueLastWeek??0 ? <ArrowUpwardIcon alignItems='center'/> : <ArrowDownwardIcon alignItems='center'/>}</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>from last week</span>
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                </Grid>

                <Grid item xs={12} md={3} lg={2.4}>
                    <MDBox bgColor='light' p={1} borderRadius={5} display='flex' justifyContent='center' flexDirection='column' minWidth='100%'>
                        <MDBox>
                            <MDTypography fontSize={13} fontWeight="bold" style={{textAlign:'center'}}>
                                Internship Payout (Month)
                            </MDTypography>
                        </MDBox>
                        <MDBox>
                            <MDTypography fontSize={13} color={overallRevenue["Internship Payout"]?.revenueThisMonth > overallRevenue["Internship Payout"]?.revenueLastMonth ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                             ₹{new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(overallRevenue["Internship Payout"]?.revenueThisMonth)}
                            </MDTypography>
                            <MDTypography display='flex' justifyContent='center' alignItems='center' fontSize={10} color={overallRevenue["Internship Payout"]?.revenueThisMonth > overallRevenue["Internship Payout"]?.revenueLastMonth ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{((Math.abs(overallRevenue["Internship Payout"]?.revenueThisMonth-overallRevenue["Internship Payout"]?.revenueLastMonth))/(overallRevenue["Internship Payout"]?.revenueLastMonth === 0 ? overallRevenue["Internship Payout"]?.revenueThisMonth : overallRevenue["Internship Payout"]?.revenueLastMonth)*100).toFixed(0)}%</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{overallRevenue["Internship Payout"]?.revenueThisMonth > overallRevenue["Internship Payout"]?.revenueLastMonth ? <ArrowUpwardIcon alignItems='center'/> : <ArrowDownwardIcon alignItems='center'/>}</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>from last Month</span>
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                </Grid>

                <Grid item xs={12} md={3} lg={2.4}>
                    <MDBox bgColor='light' p={1} borderRadius={5} display='flex' justifyContent='center' flexDirection='column' minWidth='100%'>
                        <MDBox>
                            <MDTypography fontSize={13} fontWeight="bold" style={{textAlign:'center'}}>
                                Internship Payout (Year)
                            </MDTypography>
                        </MDBox>
                        <MDBox>
                            <MDTypography fontSize={13} color={overallRevenue["Internship Payout"]?.revenueThisYear > overallRevenue["Internship Payout"]?.revenueLastYear ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                             ₹{new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(overallRevenue["Internship Payout"]?.revenueThisYear)}
                            </MDTypography>
                            <MDTypography display='flex' justifyContent='center' alignItems='center' fontSize={10} color={overallRevenue["Internship Payout"]?.revenueThisYear > overallRevenue["Internship Payout"]?.revenueLastYear ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{((Math.abs(overallRevenue["Internship Payout"]?.revenueThisYear-overallRevenue["Internship Payout"]?.revenueLastYear))/(overallRevenue["Internship Payout"]?.revenueLastYear === 0 ? overallRevenue["Internship Payout"]?.revenueThisYear : overallRevenue["Internship Payout"]?.revenueLastYear)*100).toFixed(0)}%</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{overallRevenue["Internship Payout"]?.revenueThisYear > overallRevenue["Internship Payout"]?.revenueLastYear ? <ArrowUpwardIcon alignItems='center'/> : <ArrowDownwardIcon alignItems='center'/>}</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>from last year</span>
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                </Grid>

                <Grid item xs={12} md={3} lg={2.4}>
                    <MDBox bgColor='light' p={1} borderRadius={5} display='flex' justifyContent='center' flexDirection='column' minWidth='100%'>
                        <MDBox>
                            <MDTypography fontSize={13} fontWeight="bold" style={{textAlign:'center'}}>
                                Total Internship Payout
                            </MDTypography>
                        </MDBox>
                        <MDBox>
                            <MDTypography fontSize={13} color='success' fontWeight="bold" style={{textAlign:'center'}}>
                             ₹{new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(overallRevenue["Internship Payout"]?.totalRevenue??0)}
                            </MDTypography>
                            <MDTypography display='flex' justifyContent='center' alignItems='center' fontSize={10} color='success' fontWeight="bold" style={{textAlign:'center'}}>
                                {/* <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{((Math.abs(overallRevenue["Internship Payout"]?.revenueThisYear-overallRevenue["Internship Payout"]?.revenueLastYear))/(overallRevenue["Internship Payout"]?.revenueLastYear === 0 ? overallRevenue["Internship Payout"]?.revenueThisYear : overallRevenue["Internship Payout"]?.revenueLastYear)*100).toFixed(0)}%</span>&nbsp; */}
                                {/* <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{overallRevenue["Internship Payout"]?.revenueThisYear > overallRevenue["Internship Payout"]?.revenueLastYear ? <ArrowUpwardIcon alignItems='center'/> : <ArrowDownwardIcon alignItems='center'/>}</span>&nbsp; */}
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>and growing</span>
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                </Grid>

                <Grid item xs={12} md={3} lg={2.4}>
                    <MDBox bgColor='light' p={1} borderRadius={5} display='flex' justifyContent='center' flexDirection='column' minWidth='100%'>
                        <MDBox>
                            <MDTypography fontSize={13} fontWeight="bold" style={{textAlign:'center'}}>
                                Referral Payout (Today)
                            </MDTypography>
                        </MDBox>
                        <MDBox>
                            <MDTypography fontSize={13} color={overallRevenue["Referral Credit"]?.revenueToday > overallRevenue["Referral Credit"]?.revenueYesterday ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                             ₹{new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(overallRevenue["Referral Credit"]?.revenueToday)}
                            </MDTypography>
                            <MDTypography display='flex' justifyContent='center' alignItems='center' fontSize={10} color={overallRevenue["Referral Credit"]?.revenueToday > overallRevenue["Referral Credit"]?.revenueYesterday ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{((Math.abs(overallRevenue["Referral Credit"]?.revenueToday-overallRevenue["Referral Credit"]?.revenueYesterday))/(overallRevenue["Referral Credit"]?.revenueYesterday === 0 ? overallRevenue["Referral Credit"]?.revenueToday : overallRevenue["Referral Credit"]?.revenueYesterday)*100).toFixed(0)}%</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{overallRevenue["Referral Credit"]?.revenueToday > overallRevenue["Referral Credit"]?.revenueYesterday ? <ArrowUpwardIcon alignItems='center'/> : <ArrowDownwardIcon alignItems='center'/>}</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>from yesterday</span>
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                </Grid>

                <Grid item xs={12} md={3} lg={2.4}>
                    <MDBox bgColor='light' p={1} borderRadius={5} display='flex' justifyContent='center' flexDirection='column' minWidth='100%'>
                        <MDBox>
                            <MDTypography fontSize={13} fontWeight="bold" style={{textAlign:'center'}}>
                                Referral Payout (Week)
                            </MDTypography>
                        </MDBox>
                        <MDBox>
                            <MDTypography fontSize={13} color={overallRevenue["Referral Credit"]?.revenueThisWeek > overallRevenue["Referral Credit"]?.revenueLastWeek ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                             ₹{new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(overallRevenue["Referral Credit"]?.revenueThisWeek)}
                            </MDTypography>
                            <MDTypography display='flex' justifyContent='center' alignItems='center' fontSize={10} color={overallRevenue["Referral Credit"]?.revenueThisWeek > overallRevenue["Referral Credit"]?.revenueLastWeek ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{((Math.abs(overallRevenue["Referral Credit"]?.revenueThisWeek-overallRevenue["Referral Credit"]?.revenueLastWeek))/(overallRevenue["Referral Credit"]?.revenueLastWeek === 0 ? overallRevenue["Referral Credit"]?.revenueThisWeek : overallRevenue["Referral Credit"]?.revenueLastWeek)*100).toFixed(0)}%</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{overallRevenue["Referral Credit"]?.revenueThisWeek > overallRevenue["Referral Credit"]?.revenueLastWeek ? <ArrowUpwardIcon alignItems='center'/> : <ArrowDownwardIcon alignItems='center'/>}</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>from last week</span>
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                </Grid>

                <Grid item xs={12} md={3} lg={2.4}>
                    <MDBox bgColor='light' p={1} borderRadius={5} display='flex' justifyContent='center' flexDirection='column' minWidth='100%'>
                        <MDBox>
                            <MDTypography fontSize={13} fontWeight="bold" style={{textAlign:'center'}}>
                                Referral Payout (Month)
                            </MDTypography>
                        </MDBox>
                        <MDBox>
                            <MDTypography fontSize={13} color={overallRevenue["Referral Credit"]?.revenueThisMonth > overallRevenue["Referral Credit"]?.revenueLastMonth ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                             ₹{new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(overallRevenue["Referral Credit"]?.revenueThisMonth)}
                            </MDTypography>
                            <MDTypography display='flex' justifyContent='center' alignItems='center' fontSize={10} color={overallRevenue["Referral Credit"]?.revenueThisMonth > overallRevenue["Referral Credit"]?.revenueLastMonth ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{((Math.abs(overallRevenue["Referral Credit"]?.revenueThisMonth-overallRevenue["Referral Credit"]?.revenueLastMonth))/(overallRevenue["Referral Credit"]?.revenueLastMonth === 0 ? overallRevenue["Referral Credit"]?.revenueThisMonth : overallRevenue["Referral Credit"]?.revenueLastMonth)*100).toFixed(0)}%</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{overallRevenue["Referral Credit"]?.revenueThisMonth > overallRevenue["Referral Credit"]?.revenueLastMonth ? <ArrowUpwardIcon alignItems='center'/> : <ArrowDownwardIcon alignItems='center'/>}</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>from last month</span>
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                </Grid>

                <Grid item xs={12} md={3} lg={2.4}>
                    <MDBox bgColor='light' p={1} borderRadius={5} display='flex' justifyContent='center' flexDirection='column' minWidth='100%'>
                        <MDBox>
                            <MDTypography fontSize={13} fontWeight="bold" style={{textAlign:'center'}}>
                                Referral Payout (Year)
                            </MDTypography>
                        </MDBox>
                        <MDBox>
                            <MDTypography fontSize={13} color={overallRevenue["Referral Credit"]?.revenueThisYear > overallRevenue["Referral Credit"]?.revenueLastYear ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                             ₹{new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(overallRevenue["Referral Credit"]?.revenueThisYear)}
                            </MDTypography>
                            <MDTypography display='flex' justifyContent='center' alignItems='center' fontSize={10} color={overallRevenue["Referral Credit"]?.revenueThisYear > overallRevenue["Referral Credit"]?.revenueLastYear ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{((Math.abs(overallRevenue["Referral Credit"]?.revenueThisYear-overallRevenue["Referral Credit"]?.revenueLastYear))/(overallRevenue["Referral Credit"]?.revenueLastYear === 0 ? overallRevenue["Referral Credit"]?.revenueThisYear : overallRevenue["Referral Credit"]?.revenueLastYear)*100).toFixed(0)}%</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{overallRevenue["Referral Credit"]?.revenueThisYear > overallRevenue["Referral Credit"]?.revenueLastYear ? <ArrowUpwardIcon alignItems='center'/> : <ArrowDownwardIcon alignItems='center'/>}</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>from last year</span>
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                </Grid>

                <Grid item xs={12} md={3} lg={2.4}>
                    <MDBox bgColor='light' p={1} borderRadius={5} display='flex' justifyContent='center' flexDirection='column' minWidth='100%'>
                        <MDBox>
                            <MDTypography fontSize={13} fontWeight="bold" style={{textAlign:'center'}}>
                                Total Referral Payout
                            </MDTypography>
                        </MDBox>
                        <MDBox>
                            <MDTypography fontSize={13} color='success' fontWeight="bold" style={{textAlign:'center'}}>
                             ₹{new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(overallRevenue["Referral Credit"]?.totalRevenue)}
                            </MDTypography>
                            <MDTypography display='flex' justifyContent='center' alignItems='center' fontSize={10} color='success' fontWeight="bold" style={{textAlign:'center'}}>
                                {/* <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{((Math.abs(overallRevenue["Referral Credit"]?.revenueThisYear-overallRevenue["Referral Credit"]?.revenueLastYear))/(overallRevenue["Referral Credit"]?.revenueLastYear === 0 ? overallRevenue["Referral Credit"]?.revenueThisYear : overallRevenue["Referral Credit"]?.revenueLastYear)*100).toFixed(0)}%</span>&nbsp; */}
                                {/* <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{overallRevenue["Referral Credit"]?.revenueThisYear > overallRevenue["Referral Credit"]?.revenueLastYear ? <ArrowUpwardIcon alignItems='center'/> : <ArrowDownwardIcon alignItems='center'/>}</span>&nbsp; */}
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>and growing</span>
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                </Grid>


                <Grid item xs={12} md={3} lg={2.4}>
                    <MDBox bgColor='light' p={1} borderRadius={5} display='flex' justifyContent='center' flexDirection='column' minWidth='100%'>
                        <MDBox>
                            <MDTypography fontSize={13} fontWeight="bold" style={{textAlign:'center'}}>
                                Withdrawals (Today)
                            </MDTypography>
                        </MDBox>
                        <MDBox>
                            <MDTypography fontSize={13} color={withdrawalData?.revenueToday > withdrawalData?.revenueYesterday ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                             ₹{new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(withdrawalData?.revenueToday)}
                            </MDTypography>
                            <MDTypography display='flex' justifyContent='center' alignItems='center' fontSize={10} color={withdrawalData?.revenueToday > withdrawalData?.revenueYesterday ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{((withdrawalData?.revenueToday-withdrawalData?.revenueYesterday)/(withdrawalData?.revenueYesterday === 0 ? withdrawalData?.revenueToday : withdrawalData?.revenueYesterday)*100).toFixed(0)}%</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{withdrawalData?.revenueToday > withdrawalData?.revenueYesterday ? <ArrowUpwardIcon alignItems='center'/> : <ArrowDownwardIcon alignItems='center'/>}</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>from yesterday</span>
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                </Grid>

                <Grid item xs={12} md={3} lg={2.4}>
                    <MDBox bgColor='light' p={1} borderRadius={5} display='flex' justifyContent='center' flexDirection='column' minWidth='100%'>
                        <MDBox>
                            <MDTypography fontSize={13} fontWeight="bold" style={{textAlign:'center'}}>
                                Withdrawals (Week)
                            </MDTypography>
                        </MDBox>
                        <MDBox>
                            <MDTypography fontSize={13} color={withdrawalData?.revenueThisWeek > withdrawalData?.revenueLastWeek ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                             ₹{new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(withdrawalData?.revenueThisWeek)}
                            </MDTypography>
                            <MDTypography display='flex' justifyContent='center' alignItems='center' fontSize={10} color={withdrawalData?.revenueThisWeek > withdrawalData?.revenueLastWeek ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{((withdrawalData?.revenueThisWeek-withdrawalData?.revenueLastWeek)/(withdrawalData?.revenueLastWeek === 0 ? withdrawalData?.revenueThisWeek : withdrawalData?.revenueLastWeek)*100).toFixed(0)}%</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{withdrawalData?.revenueThisWeek > withdrawalData?.revenueLastWeek ? <ArrowUpwardIcon alignItems='center'/> : <ArrowDownwardIcon alignItems='center'/>}</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>from last week</span>
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                </Grid>

                <Grid item xs={12} md={3} lg={2.4}>
                    <MDBox bgColor='light' p={1} borderRadius={5} display='flex' justifyContent='center' flexDirection='column' minWidth='100%'>
                        <MDBox>
                            <MDTypography fontSize={13} fontWeight="bold" style={{textAlign:'center'}}>
                                Withdrawals (Month)
                            </MDTypography>
                        </MDBox>
                        <MDBox>
                            <MDTypography fontSize={13} color={withdrawalData?.revenueThisMonth > withdrawalData?.revenueLastMonth ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                             ₹{new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(withdrawalData?.revenueThisMonth)}
                            </MDTypography>
                            <MDTypography display='flex' justifyContent='center' alignItems='center' fontSize={10} color={withdrawalData?.revenueThisMonth > withdrawalData?.revenueLastMonth ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{((withdrawalData?.revenueThisMonth-withdrawalData?.revenueLastMonth)/(withdrawalData?.revenueLastMonth === 0 ? withdrawalData?.revenueThisMonth : withdrawalData?.revenueLastMonth)*100).toFixed(0)}%</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{withdrawalData?.revenueThisMonth > withdrawalData?.revenueLastMonth ? <ArrowUpwardIcon alignItems='center'/> : <ArrowDownwardIcon alignItems='center'/>}</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>from last month</span>
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                </Grid>

                <Grid item xs={12} md={3} lg={2.4}>
                    <MDBox bgColor='light' p={1} borderRadius={5} display='flex' justifyContent='center' flexDirection='column' minWidth='100%'>
                        <MDBox>
                            <MDTypography fontSize={13} fontWeight="bold" style={{textAlign:'center'}}>
                              Withdrawals (Year)
                            </MDTypography>
                        </MDBox>
                        <MDBox>
                            <MDTypography fontSize={13} color={withdrawalData?.revenueThisYear > withdrawalData?.revenueLastYear ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                             ₹{new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Math.abs(withdrawalData?.revenueThisYear))}
                            </MDTypography>
                            <MDTypography display='flex' justifyContent='center' alignItems='center' fontSize={10} color={withdrawalData?.revenueThisYear > withdrawalData?.revenueLastYear ? 'success' : 'error'} fontWeight="bold" style={{textAlign:'center'}}>
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{((withdrawalData?.revenueThisYear-withdrawalData?.revenueLastYear)/(withdrawalData?.revenueLastYear === 0 ? withdrawalData?.revenueThisYear : withdrawalData?.revenueLastYear)*100).toFixed(0)}%</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{withdrawalData?.revenueThisYear > overallRevenue["Referral Credit"]?.revenueLastYear ? <ArrowUpwardIcon alignItems='center'/> : <ArrowDownwardIcon alignItems='center'/>}</span>&nbsp;
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>from last year</span>
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                </Grid>

                <Grid item xs={12} md={3} lg={2.4}>
                    <MDBox bgColor='light' p={1} borderRadius={5} display='flex' justifyContent='center' flexDirection='column' minWidth='100%'>
                        <MDBox>
                            <MDTypography fontSize={13} fontWeight="bold" style={{textAlign:'center'}}>
                                Total Withdrawals
                            </MDTypography>
                        </MDBox>
                        <MDBox>
                            <MDTypography fontSize={13} color='success' fontWeight="bold" style={{textAlign:'center'}}>
                             ₹{new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(withdrawalData?.totalRevenue)}
                            </MDTypography>
                            <MDTypography display='flex' justifyContent='center' alignItems='center' fontSize={10} color='success' fontWeight="bold" style={{textAlign:'center'}}>
                                {/* <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{((Math.abs(overallRevenue["Referral Credit"]?.revenueThisYear-overallRevenue["Referral Credit"]?.revenueLastYear))/(overallRevenue["Referral Credit"]?.revenueLastYear === 0 ? overallRevenue["Referral Credit"]?.revenueThisYear : overallRevenue["Referral Credit"]?.revenueLastYear)*100).toFixed(0)}%</span>&nbsp; */}
                                {/* <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{overallRevenue["Referral Credit"]?.revenueThisYear > overallRevenue["Referral Credit"]?.revenueLastYear ? <ArrowUpwardIcon alignItems='center'/> : <ArrowDownwardIcon alignItems='center'/>}</span>&nbsp; */}
                                <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>and growing</span>
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                </Grid>
          </Grid>
       
  );
}