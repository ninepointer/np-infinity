import React from 'react'

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";

// Material Dashboard 2 React example components
// import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
// import Footer from "../../examples/Footer";
import DataTable from "../../examples/Tables/DataTable";

// Data
// import authorsTableData from "./data/authorsTableData";
// import projectsTableData from "./data/projectsTableData";
// import AlgoHeader from "./Header";
import BrokerageData from './data/BrokerageData';
import BrokerageModel from './BrokerageModel';

const Brokerage = () => {
  const { columns, rows } = BrokerageData();
//   const { columns: pColumns, rows: pRows } = projectsTableData();
  return (
    <>
        <MDBox pt={6} pb={3}>
            <Grid container spacing={6}>
                <Grid item xs={12} md={12} lg={12}>
                    <Card>
                        <MDBox
                            mx={2}
                            mt={-3}
                            py={1}
                            px={2}
                            variant="gradient"
                            bgColor="info"
                            borderRadius="lg"
                            coloredShadow="info"
                            sx={{
                                display: 'flex',
                                justifyContent: "space-between",
                                }}>

                            <MDTypography variant="h6" color="white" py={2.5}>
                                Brokerage Details
                            </MDTypography>
                            <BrokerageModel/>
                        </MDBox>
                        <MDBox pt={3}>
                            <DataTable
                                table={{ columns, rows }}
                                isSorted={false}
                                entriesPerPage={false}
                                showTotalEntries={false}
                                noEndBorder
                            />
                        </MDBox>
                    </Card>
                </Grid>
            </Grid> 
        </MDBox> 
    </>
  )
}

export default Brokerage