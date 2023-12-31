
import React from "react";
// import axios from "axios";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
// @mui material components
// import { Chart } from 'chart.js/auto';
// // Chart.register(...registerables);
// import Grid from "@mui/material/Grid";

// // Material Dashboard 2 React components
// import MDBox from "../../components/MDBox";



// Material Dashboard 2 React example components
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Footer from "../../examples/Footer";
import Header from "./Header";


function TraderPosition() {

  // let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/"
  let baseUrl1 = process.env.NODE_ENV === "production" ? "/" : "http://localhost:9000/"
  let socket;
  try{
      socket = io.connect(`${baseUrl1}`)
  } catch(err){
      throw new Error(err);
  }

   
    useEffect(()=>{

        //console.log(socket);
        socket.on("connect", ()=>{
            //console.log(socket.id);
            socket.emit("company-ticks", true)
        })
        socket.on("noToken", (data)=>{
            //console.log("no token");
            window.alert(data);
        })
        socket.on("wrongToken", (data)=>{
            //console.log("wrong Token");
            window.alert(data);
        })

    }, []);


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Header />
      <Footer />
    </DashboardLayout>
  );
}

export default TraderPosition;

// todo ---> mismatch