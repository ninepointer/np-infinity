import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import { Checkbox, TextField } from '@mui/material';
import {Box} from '@mui/material';
import axios from 'axios';
import { apiUrl } from '../../../constants/constants';
import MDTypography from '../../../components/MDTypography';
import {Grid} from '@mui/material';
import {Select} from '@mui/material';
import {FormControl} from '@mui/material';
import {InputLabel} from '@mui/material';
import {OutlinedInput} from '@mui/material';
import {MenuItem} from '@mui/material';
import MDButton from '../../../components/MDButton';
import MDBox from '../../../components/MDBox';
import DataTable from '../../../examples/Tables/DataTable';
import MDSnackbar from '../../../components/MDSnackbar';



const ParticipantsModal = ( {open, handleClose, gd, action, setAction}) => {
  const [colleges, setColleges] = useState([]); 
  const [currentPage, setCurrentPage] = useState(0);
  const [gds, setGds] = useState([]); 
  const [college, setCollege] = useState();
  const [participants, setParticipants] = useState();
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    bgcolor: 'background.paper',
    // height: '85vh',
  //   border: '2px solid #000',
    borderRadius:2,
    boxShadow: 24,
    p: 4,
  };
  const [title,setTitle] = useState('')
  const [content,setContent] = useState('')

  const [successSB, setSuccessSB] = useState(false);
  const openSuccessSB = (title,content) => {
  console.log('status success')  
  setTitle(title)
  setContent(content)
  setSuccessSB(true);
  }
  const closeSuccessSB = () => setSuccessSB(false);
  
    const renderSuccessSB = (
      <MDSnackbar
          color="success"
          icon="check"
          title={title}
          content={content}
          open={successSB}
          onClose={closeSuccessSB}
          close={closeSuccessSB}
          bgWhite="info"
      />
      );
      
      const [errorSB, setErrorSB] = useState(false);
      const openErrorSB = (title,content) => {
      setTitle(title)
      setContent(content)
      setErrorSB(true);
      }
      const closeErrorSB = () => setErrorSB(false);
      
      const renderErrorSB = (
      <MDSnackbar
          color="error"
          icon="warning"
          title={title}
          content={content}
          open={errorSB}
          onClose={closeErrorSB}
          close={closeErrorSB}
          bgWhite
      />
      );

  const getParticipants = async() =>{
    try{
        console.log('getting')
        const res = await axios.get(`${apiUrl}gd/${gd}`,{withCredentials:true});
        console.log('data', res.data.data[0].participants);
        setParticipants(prev=>res.data.data[0].participants);
      }catch(e){
        console.log(e);
      }
    }

  useEffect(()=>{
    getParticipants();
  },[open, action]);
  const handleRemove = async(userId) => {
    const res = await axios.patch(`${apiUrl}gd/remove/${gd}/${userId}`,{},{withCredentials:true});
    console.log(res.data);
    setAction(!action);
  }
  const handleChecked = async(e, userId) =>{
    const res = await axios.patch(`${apiUrl}gd/mark/${gd}/${userId}`,{attended: e.target.checked},{withCredentials:true});
    setAction(!action);
    console.log('res', res.data);
  }

  const handleSelect = async (userId, collegeId) => {
    try{
        const res = await axios.patch(`${apiUrl}gd/select/${gd}/${userId}`,{collegeId:collegeId},{withCredentials:true});
        console.log('res', res.data);
        if(res.status == 200 || res.status == 204){
            openSuccessSB('Success', res.data.message);
        }else{
            openErrorSB('Error', res.data.message);
        }
    }catch(e){
        console.log('error bro', e);
        // openErrorSB('Error', e);
    }
    setAction(!action);
  }

  let columns = [
    { Header: "#", accessor: "index", align: "center" },
    { Header: "Remove", accessor: "remove", align: "center" },
    { Header: "Select", accessor: "select", align: "center" },
    { Header: "Attendance", accessor: "attendance", align: "center" },
    { Header: "Full Name", accessor: "fullname", align: "center" },
    { Header: "Email", accessor: "email", align: "center" },
    { Header: "Mobile", accessor: "mobile", align: "center" },
    { Header: "College", accessor: "college", align: "center" },
  ]

let rows = []
participants?.map((elem, index)=>{
    let featureObj = {}
    featureObj.index = (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {index+1}
      </MDTypography>
    );
    featureObj.remove = (
        <MDButton component="a" variant="contained" color="error" disabled={elem?.status=='Selected'} fontWeight="medium" size='small' onClick={()=>{handleRemove(elem?.user?._id)}} >
          R
        </MDButton>
      );
      featureObj.select = (
        <MDButton component="a" variant="contained" color="success" disabled={elem?.status=='Selected'} fontWeight="medium" size='small' onClick={()=>{handleSelect(elem?.user?._id, elem?.college?._id)}}>
        S
      </MDButton>
      );
      featureObj.attendance = (
        <Checkbox defaultChecked={elem?.attended} disabled={elem?.status=='Selected'} onChange={(e)=>{handleChecked(e, elem?.user?._id)}}></Checkbox>
      );
    featureObj.fullname = (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {elem?.user?.first_name} {elem?.user?.last_name}
      </MDTypography>
    );
    featureObj.email = (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {elem?.user?.email}
      </MDTypography>
    );
    featureObj.mobile = (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {elem?.user?.mobile}
      </MDTypography>
    );
    featureObj.college = (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {elem?.college?.collegeName}
      </MDTypography>
    );
    
  
    rows.push(featureObj)
  })

  return (
    <>
   <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
   >
    <Box sx={style}>
      <MDTypography>Group Discussion participants</MDTypography>
      <MDBox mt={1} style={{height:'85vh'}}>
        <DataTable  
          table={{ columns, rows }}
          showTotalEntries={false}
          initialPage={currentPage}
          isSorted={false}
          // noEndBorder
          entriesPerPage={false}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </MDBox>
    </Box>
   </Modal>
    {renderSuccessSB}
    {renderErrorSB}
    </>
  )
}

export default ParticipantsModal;