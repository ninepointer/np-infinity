import { useState, useEffect } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

// Material Dashboard 2 React components
import MDBox from "../../../components/MDBox";

// Material Dashboard 2 React base styles
import breakpoints from "../../../assets/theme/base/breakpoints";

// Images
import backgroundImage from "../../../assets/images/trading.jpg";
import Accounts from "../ApiKey/Accounts";
import Brokerage from "../Brokerage";
import TradingARToken from "../AccessToken/TradingARToken";
import XTSToken from "../xtsToken/XTSToken";



function TradingAccountHeader({ children }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);


  const handleSetTabValue = (event, newValue) => setTabValue(newValue);


  return (
   
    <MDBox position="relative" mb={5}>

      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="10rem"
        borderRadius="x1"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
      
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={12} lg={12} sx={{ ml: "auto" }}>
            <AppBar position="static">
              {/* <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}> */}
              <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                <Tab
                  label="Accounts"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25}}>
                      home
                    </Icon>
                  }
                />
                <Tab
                  label="Brokerage"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25}}>
                      home
                    </Icon>
                     }
                />
              <Tab
                  label="Trading access request token"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25}}>
                      home
                    </Icon>
                  }
                />
                <Tab
                  label="XTS Token"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25}}>
                      home
                    </Icon>
                  }
                />
                
                
              </Tabs>
            </AppBar>
            <TabPanel value={tabValue} index={0}><Accounts/> </TabPanel>
            <TabPanel value={tabValue} index={1}><Brokerage/> </TabPanel>
            <TabPanel value={tabValue} index={2}><TradingARToken/> </TabPanel>
            <TabPanel value={tabValue} index={3}><XTSToken/> </TabPanel>
            {/* <TabPaneltwo/> */}
          </Grid>
        </Grid>
        </Card>
        {/* {children} */}
     
     </MDBox>
   
    
  );
}

// Setting default props for the Header
TradingAccountHeader.defaultProps = {
  children: "",
};

// Typechecking props for the Header
TradingAccountHeader.propTypes = {
  children: PropTypes.node,
};

function TabPanel(props){
  const{children,value,index}=props;
  return(
    <>
    {
      value === index &&
      <h1>{children}</h1>
    }
     {/* <TableOne/> */}
    </>
   
  )
}

export default TradingAccountHeader;
