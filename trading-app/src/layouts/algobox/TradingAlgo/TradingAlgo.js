import React, {useState, useEffect} from 'react'
import axios from "axios";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";


// Material Dashboard 2 React components
import MDBox from "../../../components/MDBox";
import MDButton from "../../../components/MDBox";
import Button from '@mui/material/Button';
import MDTypography from "../../../components/MDTypography";

// Material Dashboard 2 React example components
// import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
// import Footer from "../../../examples/Footer";
import DataTable from "../../../examples/Tables/DataTable";

// Data
// import authorsTableData from "./data/authorsTableData";
import projectsTableData from "../data/projectsTableData";
// import AlgoHeader from "./Header";
import TradingAlgoModel from './TradingAlgoModel';
import TradingAlgoData from '../data/TradingAlgoData';
import MapUser from "../MapUser/MapUser"
import RealTrade from "../RealTrade/RealTrade"
import TradingAlgoEditModel from "./TradingAlgoEditModel";

const TradingAlgo = () => {
    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/"
  const { columns, rows } = TradingAlgoData();
//   const { columns: pColumns, rows: pRows } = projectsTableData();
  const [algoData, setAlgoData] = useState([]);
  const [reRender, setReRender] = useState(true);


    useEffect(()=>{
        axios.get(`${baseUrl}api/v1/readtradingAlgo`, {withCredentials: true})
        .then((res)=>{
            setAlgoData(res.data)
            console.log(res.data);
        }).catch((err)=>{
            return new Error(err);
        })
    },[reRender])


    async function marginDeduction(id, marginDeduction){
        if(marginDeduction){
            marginDeduction = false;
        } else{
            marginDeduction = true;
        }
        const res = await fetch(`${baseUrl}api/v1/updatemargindeduction/${id}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify({
                marginDeduction
            })
        });
        const dataResp = await res.json();
        console.log(dataResp);
        if (dataResp.status === 422 || dataResp.error || !dataResp) {
            window.alert(dataResp.error);
            // console.log("Failed to Edit");
        } else {
            if(marginDeduction === false){
                window.alert("Margin Deduction is Disabled");
            } else{
                window.alert("Margin Deduction is Enabled");
            }
        }
        reRender ? setReRender(false) : setReRender(true)
    }

    async function defaultAlgo(id, isDefault, algoName){
        if(isDefault){
            isDefault = false;
        } else{
            isDefault = true;
        }
        console.log("isDefault", isDefault)
        const res = await fetch(`${baseUrl}api/v1/updatedefaultalgo/${id}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify({
                isDefault
            })
        });
        const dataResp = await res.json();
        console.log("isDefault", dataResp)
        console.log(dataResp);
        if (dataResp.status === 422 || dataResp.error) {
            window.alert(dataResp.error);
            // console.log("Failed to Edit");
        } else {
            if(!isDefault){
               
                window.alert(`${algoName} is not a Default Algo now`);
            } else{
                window.alert(`${algoName} is now Default Algo`);
            }
        }
        reRender ? setReRender(false) : setReRender(true)
    }

    async function transactionChange(id, transactionChange){
        if(transactionChange){
            transactionChange = false
        } else{
            transactionChange = true;
        }
        const res = await fetch(`${baseUrl}api/v1/updatetransactionChange/${id}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify({
                transactionChange
            })
        });
        const dataResp = await res.json();
        console.log(dataResp);
        if (dataResp.status === 422 || dataResp.error || !dataResp) {
            window.alert(dataResp.error);
            // console.log("Failed to Edit");
        } else {
            if(transactionChange){
                window.alert("Transaction Change is Enabled");
            } else{
                window.alert("Transaction Change is Disabled");
            }
        }
        reRender ? setReRender(false) : setReRender(true)
    }

    async function instrumentChange(id, instrumentChange){
        if(instrumentChange){
            instrumentChange = false;
        } else{
            instrumentChange = true;
        }
        const res = await fetch(`${baseUrl}api/v1/updateinstrumentChange/${id}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify({
                instrumentChange
            })
        });
        const dataResp = await res.json();
        console.log(dataResp);
        if (dataResp.status === 422 || dataResp.error || !dataResp) {
            window.alert(dataResp.error);
            // console.log("Failed to Edit");
        } else {
            if(instrumentChange){
                window.alert("Instrument Change is Enabled");
            } else{
                window.alert("Instrument Change is Disabled");
            }
        }
        reRender ? setReRender(false) : setReRender(true)
    }

    async function exchangeChange(id, exchangeChange){
        if(exchangeChange){
            exchangeChange = false;
        } else{
            exchangeChange = true;
        }
        const res = await fetch(`${baseUrl}api/v1/updateexchangeChange/${id}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify({
                exchangeChange
            })
        });
        const dataResp = await res.json();
        console.log(dataResp);
        if (dataResp.status === 422 || dataResp.error || !dataResp) {
            window.alert(dataResp.error);
            // console.log("Failed to Edit");
        } else {
            if(exchangeChange){
                window.alert("Exchange Change is Enabled");
            } else{
                window.alert("Exchange Change is Disabled");
            }
           
        }
        reRender ? setReRender(false) : setReRender(true)
    }

    async function productChange(id, productChange){
        if(productChange){
            productChange = false;
        } else{
            productChange = true;
        }
        const res = await fetch(`${baseUrl}api/v1/updateproductChange/${id}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify({
                productChange
            })
        });
        const dataResp = await res.json();
        console.log(dataResp);
        if (dataResp.status === 422 || dataResp.error || !dataResp) {
            window.alert(dataResp.error);
            // console.log("Failed to Edit");
        } else {
            if(productChange){
                window.alert("Product Change is Enabled");
            } else{
                window.alert("Product Change is Disabled");
            }
        }
        reRender ? setReRender(false) : setReRender(true)
    }

    algoData.map((subelem)=>{
        let obj = {};
        let statuscolor = subelem.status == "Active" ? "success" : "error"
        obj.edit = (
            <Button variant="" color="black" fontWeight="small">
                <TradingAlgoEditModel data={algoData} id={subelem._id} Render={{setReRender, reRender}}/>
            </Button>
        );
        obj.algoName = (
            <MDTypography component="a" variant="caption" fontWeight="medium">
              {(subelem.algoName)}
            </MDTypography>
        );
        obj.mapUser = (
            <MDButton variant="" color="black" fontWeight="medium">
              <MapUser color="" algoId={subelem._id}/>
            </MDButton>
        );
        obj.lotMultipler = (
            <MDTypography component="a" variant="caption" fontWeight="medium">
              {(subelem.lotMultipler)}
            </MDTypography>
        );
        obj.transactionChange = (
            <MDBox mt={0.5}>
                <Switch checked={subelem.transactionChange === "TRUE"} onChange={() => {transactionChange(subelem._id, subelem.transactionChange)}} />
            </MDBox>
        );
        obj.marginDeduction = (
            <MDBox mt={0.5}>
                <Switch checked={subelem.marginDeduction} onChange={() => {marginDeduction(subelem._id, subelem.marginDeduction)}} />
            </MDBox>
        );
        obj.isDefault = (
            <MDBox mt={0.5}>
                <Switch checked={subelem.isDefault} onChange={() => {defaultAlgo(subelem._id, subelem.isDefault, subelem.algoName)}} />
            </MDBox>
        );
        obj.instrumentChange = (
            <MDBox mt={0.5}>
                <Switch checked={subelem.instrumentChange === "TRUE"} onChange={() => {instrumentChange(subelem._id, subelem.instrumentChange)}} />
            </MDBox>
        );
        obj.status = (
            <MDTypography component="a" color={statuscolor} variant="caption" fontWeight="medium">
              {(subelem.status)}
            </MDTypography>
        );
        obj.exchangeChange = (
            <MDBox mt={0.5}>
                <Switch checked={subelem.exchangeChange === "TRUE"} onChange={() => {exchangeChange(subelem._id, subelem.exchangeChange)}} />
            </MDBox>
        );
        obj.productChange = (
            <MDBox mt={0.5}>
                <Switch checked={subelem.productChange === "TRUE"} onChange={() => {productChange(subelem._id, subelem.productChange)}} />
            </MDBox>
        );
        obj.tradingAccount = (
            <MDTypography component="a" variant="caption" fontWeight="medium">
              {(subelem.tradingAccount)}
            </MDTypography>
        );
        obj.isRealTrade = (
            <Button variant="contained" borderRadius="1rem" bgColor="light" color="black" fontWeight="small">
                <RealTrade id={subelem._id} Render={{reRender, setReRender}} tradingAlgo={subelem}  />
            </Button>
        );

        rows.push(obj);
    })
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
                                Active Algo(s)
                            </MDTypography>
                            <TradingAlgoModel Render={{reRender, setReRender}}/>
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

export default TradingAlgo