import React, {  useState, useContext } from "react";
import ReactGA from "react-ga"
import { memo } from 'react';
// import axios from "axios"
// import uniqid from "uniqid"
import { userContext } from "../../../AuthContext";
// import axios from "axios";
// import { debounce } from 'lodash';

// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
// import TextField from '@mui/material/TextField';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import InputLabel from '@mui/material/InputLabel';
// import FormControl from '@mui/material/FormControl';
import MDButton from '../../../components/MDButton';
// import MDSnackbar from '../../components/MDSnackbar';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormLabel from '@mui/material/FormLabel';
// import { Box } from '@mui/material';
// import { renderContext } from "../../renderContext";
// import {Howl} from "howler";
// import sound from "../../assets/sound/tradeSound.mp3"
// import { paperTrader, infinityTrader, tenxTrader, internshipTrader, dailyContest } from "../../variables";
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
// import Chain from '../../../assets/images/chain.png'
// import { Grid, MenuItem, TextField } from "@mui/material";
// import BuyModel from "../../tradingCommonComponent/BuyModel";
// import SellModel from "../../tradingCommonComponent/SellModel";
// import { dailyContest, maxLot_BankNifty, maxLot_Nifty, maxLot_FinNifty, maxLot_Nifty_DailyContest } from "../../../variables";
import { useNavigate } from "react-router-dom";


// import MDBox from '../../../../../components/MDBox';
// import { borderBottom } from '@mui/system';
// import { marketDataContext } from "../../../../../MarketDataContext";

const PopupTrading = ({elem, timeDifference}) => {
    // if(!initialValue){
    //     initialValue = false;
    // }

    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/"
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [data, setData] = useState("The contest is already full. We sincerely appreciate your enthusiasm to participate in our contest. Please join in our future contest.");
    const getDetails = useContext(userContext);
    

    console.log("main data", open)
    const navigate = useNavigate();

    const handleClose = async (e) => {

        setOpen(false);
    };


    async function participateUserToContest(elem) {
        let isParticipated = elem?.participants.some(elem => {
            return elem?.userId?._id?.toString() === getDetails?.userDetails?._id?.toString()
        })
        // console.log("isParticipated", isParticipated)
        if (isParticipated) {
            navigate(`/contest/${elem.contestName}`, {
                state: { data: elem._id, isNifty: elem.isNifty, isBank: elem.isBankNifty, isFin: elem.isFinNifty, isAll: elem.isAllIndex, timeDifference: timeDifference, name: elem?.contestName, endTime: elem?.contestEndTime }
            });
            return;
        }

        const res = await fetch(`${baseUrl}api/v1/dailycontest/contest/${elem._id}/participate`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "content-type": "application/json",
                "Access-Control-Allow-Credentials": true
            },
            body: JSON.stringify({
            })
        });

        const data = await res.json();
        console.log(data);
        if (data.status === "error" || data.error || !data) {
            setOpen(true);
            setData(data.message)
            // openSuccessSB("error", data.message)
            // return(<PopupTrading isInterested={true} setIsInterested={setIsInterested} elem={elem} data={`Thanks for showing interest in contest. You will be notified 10 mins before the contest starts on your WhatsApp Number.`} initialValue={true}/>)
        } else {
            navigate(`/contest/${elem.contestName}`, {
                state: { data: elem._id, isNifty: elem.isNifty, isBank: elem.isBankNifty, isFin: elem.isFinNifty, isAll: elem.isAllIndex, name: elem?.contestName, endTime: elem?.contestEndTime }
            });
        }
    }


    return (
        <div>
            {timeDifference ?
            <MDButton
                variant='outlined'
                color= {elem?.entryFee>0 ? "light" :'warning'}
                size='small'
                disabled={timeDifference > 0}
                onClick={() => { participateUserToContest(elem) }}
            >
                <MDTypography color={elem?.entryFee>0 ? "light" :'warning'} fontWeight='bold' fontSize={10}>START TRADING</MDTypography>
            </MDButton>
            :
            ""}
            <div>
                <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title">
                    <DialogTitle id="responsive-dialog-title" sx={{ textAlign: 'center' }}>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText sx={{ display: "flex", flexDirection: "column", marginLeft: 2 }}>
                            <MDBox sx={{ display: 'flex', alignItems: 'center', marginBottom: "10px" }}>
                                <MDTypography color="dark" fontSize={15}>{data}</MDTypography>
                            </MDBox>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </div >
        </div >
    );
}

export default memo(PopupTrading);