import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
// import { userContext } from "../../AuthContext";

// @mui material components
import Grid from "@mui/material/Grid";
// import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "../../components/MDBox";
// import MDTypography from "../../components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Footer from "../../examples/Footer";
import ProfileInfoCard from "../../examples/Cards/InfoCards/ProfileInfoCard";
// import ProfilesList from "../../examples/Lists/ProfilesList";
// import DefaultProjectCard from "../../examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "./components/Header";
import PlatformSettings from "./components/PlatformSettings";
import MarginSettings from "./components/MarginSettings";

// Data
// import profilesListData from "./data/profilesListData";

// Images
import TraderSettingView from "./TraderSettingView";
import {xtsAccountType} from "../../variables";

function Setting() {

  const [marginData,setMarginData] = useState([]);
  const [accountIdData, setAccountIdData] = useState([]);
  const [showSetting, setShowSetting] = useState(false);
  const [settingData, setSettingData] = useState([]);
  const [marginEndPoint, setMarginEndPoint] = useState("");
  const [reRender, setReRender] = useState(true);

  let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/"

  useEffect(()=>{
    axios.get(`${baseUrl}api/v1/${marginEndPoint}`)
      .then((res) => {
        console.log(res.data.data);
        setMarginData(res.data.data)
      }).catch((err) => {
        return new Error(err);
      })
  }, [marginEndPoint])

  // useEffect(() => {

  //   axios.get(`${baseUrl}api/v1/readAccountDetails`)
  //     .then((res) => {
  //       let data = res.data;
  //       let active = data.filter((elem) => {
  //         return elem.status === "Active"
  //       })
  //       setAccountIdData(active);
  //       console.log(active);

  //     }).catch((err) => {
  //       return new Error(err);
  //     })


  // }, [])

  useEffect(()=>{
    axios.get(`${baseUrl}api/v1/readsetting`, {withCredentials: true})
      .then((res) => {
        setSettingData(res.data)
        setMarginEndPoint(res.data[0]?.toggle?.liveOrder == xtsAccountType ? "xtsMargin" : "getmargin");
        console.log("settings", res.data);
      }).catch((err) => {
        //window.alert("Server Down");
        return new Error(err);
      })
  }, [reRender])

  // console.log("marginData", marginData);


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header setShowSetting={setShowSetting} showSetting={showSetting}>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            {!showSetting ? 
            <>
            <Grid item xs={12} md={6} xl={4}>
              <PlatformSettings reRender={reRender} setReRender={setReRender} settingData={settingData}/>
            </Grid>
            <Grid item xs={12} md={6} xl={4}>
              <MarginSettings settingData={settingData}/>
            </Grid>
                <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
                  {/* {marginEndPoint == "xtsMargin" ?
                    <ProfileInfoCard
                      title="Margin Information"
                      info={{
                        AccountId: process.env.XTS_CLIENTID ? process.env.XTS_CLIENTID : "Account Id not available",
                        AvailableMargin: `₹${new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(marginData?.netMarginAvailable)}`,
                        UsedMargin: `₹${new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(marginData?.marginUtilized)}`,
                        AvailableCash: `₹${new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(marginData?.cashAvailable)}`,

                      }}
                      social={[
                        {
                          link: "https://www.facebook.com/stoxhero/",
                          icon: <FacebookIcon />,
                          color: "facebook",
                        },
                        {
                          link: "https://twitter.com/stoxhero",
                          icon: <TwitterIcon />,
                          color: "twitter",
                        },
                        {
                          link: "https://www.instagram.com/stoxhero/",
                          icon: <InstagramIcon />,
                          color: "instagram",
                        },
                      ]}
                      action={{ route: "", tooltip: "Edit Profile" }}

                      shadow={false}
                    /> : */}

                    <ProfileInfoCard
                      title="Margin Information"
                      info={{
                        AccountId: accountIdData[0] ? accountIdData[0]?.accountId : "Account Id not available",
                        AvailableMargin: marginData?.available ? (marginData?.available?.live_balance) >= 0.00 ? "+₹" + ((marginData?.available.live_balance).toFixed(2)) : "-₹" + ((-(marginData?.available?.live_balance)).toFixed(2)) : 0,
                        UsedMargin: marginData?.utilised ? marginData?.utilised.debits >= 0.00 ? "+₹" + (marginData?.utilised.debits.toFixed(2)) : "-₹" + ((-marginData.utilised.debits).toFixed(2)) : 0,
                        AvailableCash: marginData?.net ? marginData?.net >= 0.00 ? "+₹" + (marginData?.net.toFixed(2)) : "-₹" + ((-marginData?.net).toFixed(2)) : 0,
                        OpeningBalance: marginData?.available ? marginData.available.opening_balance >= 0.00 ? "+₹" + (marginData?.available.opening_balance.toFixed(2)) : "-₹" + ((-marginData?.available?.opening_balance).toFixed(2)) : 0,
                        Payin: marginData?.available ? marginData?.available?.intraday_payin >= 0.00 ? "+₹" + (marginData?.available.intraday_payin.toFixed(2)) : "-₹" + ((-marginData?.available?.intraday_payin).toFixed(2)) : 0,
                        Payout: marginData?.utilised ? marginData?.utilised?.payout >= 0.00 ? "+₹" + (marginData?.utilised.payout.toFixed(2)) : "-₹" + ((-marginData?.utilised?.payout).toFixed(2)) : 0,
                        Span: marginData?.utilised ? marginData?.utilised?.span >= 0.00 ? "+₹" + (marginData?.utilised.span.toFixed(2)) : "-₹" + ((-marginData?.utilised?.span).toFixed(2)) : 0,
                        Exposure: marginData?.utilised ? marginData?.utilised?.exposure >= 0.00 ? "+₹" + (marginData?.utilised.exposure.toFixed(2)) : "-₹" + ((-marginData?.utilised?.exposure).toFixed(2)) : 0,
                        DeliveryMargin: marginData?.utilised ? marginData?.utilised.delivery >= 0.00 ? "+₹" + (marginData?.utilised.delivery.toFixed(2)) : "-₹" + ((-marginData?.utilised?.delivery).toFixed(2)) : 0,

                      }}
                      social={[
                        {
                          link: "https://www.facebook.com/stoxhero/",
                          icon: <FacebookIcon />,
                          color: "facebook",
                        },
                        {
                          link: "https://twitter.com/stoxhero",
                          icon: <TwitterIcon />,
                          color: "twitter",
                        },
                        {
                          link: "https://www.instagram.com/stoxhero/",
                          icon: <InstagramIcon />,
                          color: "instagram",
                        },
                      ]}
                      action={{ route: "", tooltip: "Edit Profile" }}

                      shadow={false}
                    />
                    {/* } */}
                </Grid>
            </>
            :
            <Grid item xs={12} md={6} xl={4}>
            <TraderSettingView  />
            </Grid>
              }
          </Grid>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Setting;

