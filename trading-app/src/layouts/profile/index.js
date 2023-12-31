import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { userContext } from "../../AuthContext";

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Footer from "../../examples/Footer";
import ProfileInfoCard from "../../examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "../../examples/Lists/ProfilesList";
import DefaultProjectCard from "../../examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "./components/Header";
import PlatformSettings from "./components/PlatformSettings";

// Data
import profilesListData from "./data/profilesListData";

// Images
import homeDecor1 from "../../assets/images/home-decor-1.jpg";
import homeDecor2 from "../../assets/images/home-decor-2.jpg";
import homeDecor3 from "../../assets/images/home-decor-3.jpg";
import homeDecor4 from "../../assets/images/home-decor-4.jpeg";
import team1 from "../../assets/images/team-1.jpg";
import team2 from "../../assets/images/team-2.jpg";
import team3 from "../../assets/images/team-3.jpg";
import team4 from "../../assets/images/team-4.jpg";

function Overview() {

  const [userDetail,setuserDetail] = useState([]);
  const getDetails = useContext(userContext);
  console.log("getDetails", getDetails)
  let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/"

 useEffect(()=>{
       axios.get(`${baseUrl}api/v1/readparticularuserdetails/${getDetails.userDetails.email}`)
      .then((res)=>{
          console.log(res.data);
          setuserDetail(res.data)
      }).catch((err)=>{
          //window.alert("Server Down");
          return new Error(err);
      })
  },[getDetails])

  //console.log("Logged In user details: "+userDetail);


  return (
    // <DashboardLayout>
    //   <DashboardNavbar />
    //   <MDBox mb={2} />
    //   <Header>
    //     <MDBox mt={5} mb={3}>
    //       <Grid container spacing={1}>
    //         <Grid item xs={12} md={6} xl={12}>
    //           <PlatformSettings />
    //         </Grid>
    //         {/* <Grid item xs={12} md={6} xl={6} sx={{ display: "flex" }}>
    //           <Divider orientation="vertical" sx={{ ml: 20, mr: 10 }} />
    //           <ProfileInfoCard
    //             title="profile information"
    //             // description="Profile Details"
    //             info={{
    //               fullName: userDetail.first_name ? userDetail.first_name + " " + userDetail.last_name : "Data Not Available",
    //               EmployeeID: userDetail.employeeid ? userDetail.employeeid : "Data Not Available",
    //               mobile: userDetail.mobile ? userDetail.mobile : "Data Not Available",
    //               email: userDetail.email ? userDetail.email : "Data Not Available",
    //               location: userDetail.location ? userDetail.location : "Data Not Available",
    //               degree: userDetail.degree ? userDetail.degree : "Data Not Available",
    //               DOJ: userDetail.joining_date ? userDetail.joining_date : "Data Not Available",
    //               DOB: userDetail.dob ? userDetail.dob : "Data Not Available",
    //             }}
    //             social={[
    //               {
    //                 link: "https://www.facebook.com/stoxhero/",
    //                 icon: <FacebookIcon />,
    //                 color: "facebook",
    //               },
    //               {
    //                 link: "https://twitter.com/stoxhero",
    //                 icon: <TwitterIcon />,
    //                 color: "twitter",
    //               },
    //               {
    //                 link: "https://www.instagram.com/stoxhero/",
    //                 icon: <InstagramIcon />,
    //                 color: "instagram",
    //               },
    //             ]}
    //             action={{ route: "", tooltip: "Edit Profile" }}
    //             shadow={false}
    //           />
    //           <Divider orientation="vertical" sx={{ mx: 0 }} />
    //         </Grid> */}
    //         {/* <Grid item xs={12} xl={4}>
    //           <ProfilesList title="conversations" profiles={profilesListData} shadow={false} />
    //         </Grid> */}
    //       </Grid>
    //     </MDBox>
    //     {/* <MDBox pt={2} px={2} lineHeight={1.25}>
    //       <MDTypography variant="h6" fontWeight="medium">
    //         Projects
    //       </MDTypography>
    //       <MDBox mb={1}>
    //         <MDTypography variant="button" color="text">
    //           Architects design houses
    //         </MDTypography>
    //       </MDBox>
    //     </MDBox>
    //     <MDBox p={2}>
    //       <Grid container spacing={6}>
    //         <Grid item xs={12} md={6} xl={3}>
    //           <DefaultProjectCard
    //             image={homeDecor1}
    //             label="project #2"
    //             title="modern"
    //             description="As Uber works through a huge amount of internal management turmoil."
    //             action={{
    //               type: "internal",
    //               route: "/pages/profile/profile-overview",
    //               color: "info",
    //               label: "view project",
    //             }}
    //             authors={[
    //               { image: team1, name: "Elena Morison" },
    //               { image: team2, name: "Ryan Milly" },
    //               { image: team3, name: "Nick Daniel" },
    //               { image: team4, name: "Peterson" },
    //             ]}
    //           />
    //         </Grid>
    //         <Grid item xs={12} md={6} xl={3}>
    //           <DefaultProjectCard
    //             image={homeDecor2}
    //             label="project #1"
    //             title="scandinavian"
    //             description="Music is something that everyone has their own specific opinion about."
    //             action={{
    //               type: "internal",
    //               route: "/pages/profile/profile-overview",
    //               color: "info",
    //               label: "view project",
    //             }}
    //             authors={[
    //               { image: team3, name: "Nick Daniel" },
    //               { image: team4, name: "Peterson" },
    //               { image: team1, name: "Elena Morison" },
    //               { image: team2, name: "Ryan Milly" },
    //             ]}
    //           />
    //         </Grid>
    //         <Grid item xs={12} md={6} xl={3}>
    //           <DefaultProjectCard
    //             image={homeDecor3}
    //             label="project #3"
    //             title="minimalist"
    //             description="Different people have different taste, and various types of music."
    //             action={{
    //               type: "internal",
    //               route: "/pages/profile/profile-overview",
    //               color: "info",
    //               label: "view project",
    //             }}
    //             authors={[
    //               { image: team4, name: "Peterson" },
    //               { image: team3, name: "Nick Daniel" },
    //               { image: team2, name: "Ryan Milly" },
    //               { image: team1, name: "Elena Morison" },
    //             ]}
    //           />
    //         </Grid>
    //         <Grid item xs={12} md={6} xl={3}>
    //           <DefaultProjectCard
    //             image={homeDecor4}
    //             label="project #4"
    //             title="gothic"
    //             description="Why would anyone pick blue over pink? Pink is obviously a better color."
    //             action={{
    //               type: "internal",
    //               route: "/pages/profile/profile-overview",
    //               color: "info",
    //               label: "view project",
    //             }}
    //             authors={[
    //               { image: team4, name: "Peterson" },
    //               { image: team3, name: "Nick Daniel" },
    //               { image: team2, name: "Ryan Milly" },
    //               { image: team1, name: "Elena Morison" },
    //             ]}
    //           />
    //         </Grid>
    //       </Grid>
    //     </MDBox> */}
    //   </Header>
    //   <Footer />
    // </DashboardLayout>
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header/>
    </DashboardLayout>
  );
}

export default Overview;
