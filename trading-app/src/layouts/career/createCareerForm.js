// import * as React from 'react';
import {useState} from "react";
// import { useForm } from "react-hook-form";
// import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from "@mui/material/Grid";
import MDTypography from "../../components/MDTypography";
import MDBox from "../../components/MDBox";
import MDButton from "../../components/MDButton"
// import axios from "axios";
import { CircularProgress } from "@mui/material";
import MDSnackbar from "../../components/MDSnackbar";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useNavigate, useLocation } from "react-router-dom";
import RolesAndResponsibilities from './data/roleAndRespData';
import { IoMdAddCircle } from 'react-icons/io';

function Index() {

    const location = useLocation();
    const  id  = location?.state?.data;
    const [isSubmitted,setIsSubmitted] = useState(false);
    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/"
    const [isLoading,setIsLoading] = useState(id ? true : false)
    const [editing,setEditing] = useState(false)
    const [saving,setSaving] = useState(false)
    const [creating,setCreating] = useState(false)
    const navigate = useNavigate();
    const [newObjectId, setNewObjectId] = useState("");
    const [updatedDocument, setUpdatedDocument] = useState([]);

    const [formState,setFormState] = useState({
        jobTitle:'',
        jobDescription:'',
        rolesAndResponsibilities: {
          orderNo: "",
          description: ""
        },
        jobType:'',
        jobLocation:'',
        status:''
    });



    async function onSubmit(e,formState){
      e.preventDefault()
      
      if(!formState.jobTitle || !formState.jobDescription || !formState.jobType || !formState.jobLocation || !formState.status){
      
          setTimeout(()=>{setCreating(false);setIsSubmitted(false)},500)
          return openErrorSB("Missing Field","Please fill all the mandatory fields")
      }
      // console.log("Is Submitted before State Update: ",isSubmitted)
      setTimeout(()=>{setCreating(false);setIsSubmitted(true)},500)
      const {jobTitle, jobDescription, jobType, jobLocation, status } = formState;
      const res = await fetch(`${baseUrl}api/v1/career/create`, {
          method: "POST",
          credentials:"include",
          headers: {
              "content-type" : "application/json",
              "Access-Control-Allow-Credentials": true
          },
          body: JSON.stringify({
            jobTitle, jobDescription, jobType, jobLocation, status
          })
      });
      
      
      const data = await res.json();
      // console.log(data);
      if (data.status === 422 || data.error || !data) {
          setTimeout(()=>{setCreating(false);setIsSubmitted(false)},500)
          // console.log("invalid entry");
      } else {
          openSuccessSB("Career Created",data.message)
          setNewObjectId(data.data._id)
          setIsSubmitted(true)
          // console.log("setting linked contest rule to: ",data.data.contestRule)
          // setLinkedContestRule(data?.data?.contestRule)
          // console.log(data.data)
          // setContestData(data.data)
          setTimeout(()=>{setCreating(false);setIsSubmitted(true)},500)
        }
    }

    async function onAddFeature(e,childFormState,setChildFormState){
      e.preventDefault()
      setSaving(true)
      if(!childFormState?.orderNo || !childFormState?.description){
          setTimeout(()=>{setCreating(false);setIsSubmitted(false)},500)
          return openErrorSB("Missing Field","Please fill all the mandatory fields")
      }
      const {orderNo, description} = childFormState;
    
      const res = await fetch(`${baseUrl}api/v1/career/${newObjectId}`, {
          method: "PATCH",
          credentials:"include",
          headers: {
              "content-type" : "application/json",
              "Access-Control-Allow-Credentials": true
          },
          body: JSON.stringify({
            rolesAndResponsibilities:{orderNo, description}
          })
      });
      const data = await res.json();
      console.log(data);
      if (data.status === 422 || data.error || !data) {
          openErrorSB("Error","data.error")
      } else {
          setUpdatedDocument(data?.data);
          openSuccessSB("New Role and Responsibility Added","New Role and Responsibility line item has been added in the career")
          setTimeout(()=>{setSaving(false);setEditing(false)},500)
          setChildFormState(prevState => ({
              ...prevState,
              rolesAndResponsibilities: {}
          }))
      }
    }
  

    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    
    const [successSB, setSuccessSB] = useState(false);
    const openSuccessSB = (title,content) => {
      setTitle(title)
      setContent(content)
      setSuccessSB(true);
    }
  const closeSuccessSB = () => setSuccessSB(false);
  // console.log("Title, Content, Time: ",title,content,time)


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



    return (
    <>
    {isLoading ? (
        <MDBox display="flex" justifyContent="center" alignItems="center" mt={5} mb={5}>
        <CircularProgress color="info" />
        </MDBox>
    )
        :
      ( 
        <MDBox pl={2} pr={2} mt={4}>
        <MDBox display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">
          Fill Career Details
        </MDTypography>
        </MDBox>

        <Grid container display="flex" flexDirection="row" justifyContent="space-between">
        <Grid container spacing={1} mt={0.5} mb={0} xs={12} md={9} xl={12}>
          <Grid item xs={12} md={6} xl={3}>
            <TextField
                disabled={((isSubmitted || id) && (!editing || saving))}
                id="outlined-required"
                label='Job Title *'
                fullWidth
                // defaultValue={portfolioData?.portfolioName}
                value={formState?.jobTitle}
                onChange={(e) => {setFormState(prevState => ({
                    ...prevState,
                    jobTitle: e.target.value
                  }))}}
              />
          </Grid>

          <Grid item xs={12} md={6} xl={3}>
              <FormControl sx={{width: "100%" }}>
                <InputLabel id="demo-simple-select-autowidth-label">Job Type *</InputLabel>
                <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={formState?.jobType}
                // value={oldObjectId ? contestData?.status : formState?.status}
                // disabled={((isSubmitted || id) && (!editing || saving))}
                onChange={(e) => {setFormState(prevState => ({
                    ...prevState,
                    jobType: e.target.value
                }))}}
                label="Job Type"
                sx={{ minHeight:43 }}
                >
                <MenuItem value="Internship">Internship</MenuItem>
                <MenuItem value="Full-Time">Full-Time</MenuItem>
                </Select>
              </FormControl>
          </Grid>

          <Grid item xs={12} md={6} xl={3}>
              <FormControl sx={{width: "100%" }}>
                <InputLabel id="demo-simple-select-autowidth-label">Job Location *</InputLabel>
                <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={formState?.jobLocation}
                // value={oldObjectId ? contestData?.status : formState?.status}
                // disabled={((isSubmitted || id) && (!editing || saving))}
                onChange={(e) => {setFormState(prevState => ({
                    ...prevState,
                    jobLocation: e.target.value
                }))}}
                label="Job Location"
                sx={{ minHeight:43 }}
                >
                <MenuItem value="WFH">WFH</MenuItem>
                <MenuItem value="Office">Office</MenuItem>
                </Select>
              </FormControl>
          </Grid>
          
          <Grid item xs={12} md={6} xl={3}>
              <FormControl sx={{width: "100%" }}>
                <InputLabel id="demo-simple-select-autowidth-label">Status *</InputLabel>
                <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={formState?.status}
                // value={oldObjectId ? contestData?.status : formState?.status}
                // disabled={((isSubmitted || id) && (!editing || saving))}
                onChange={(e) => {setFormState(prevState => ({
                    ...prevState,
                    status: e.target.value
                }))}}
                label="Status"
                sx={{ minHeight:43 }}
                >
                <MenuItem value="Live">Live</MenuItem>
                <MenuItem value="Draft">Draft</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
          </Grid>

          <Grid item xs={12} md={6} xl={12} mt={2}>
            <TextField
                disabled={((isSubmitted || id) && (!editing || saving))}
                id="outlined-required"
                label='Job Description *'
                fullWidth
                multiline
                // defaultValue={portfolioData?.portfolioName}
                value={formState?.jobDescription}
                onChange={(e) => {setFormState(prevState => ({
                    ...prevState,
                    jobDescription: e.target.value
                  }))}}
              />
          </Grid>
            
        </Grid>

        </Grid>

         <Grid container mt={2} xs={12} md={12} xl={12} >
            <Grid item display="flex" justifyContent="flex-end" xs={12} md={6} xl={12}>
                    {!isSubmitted && !id && (
                    <>
                    <MDButton 
                        variant="contained" 
                        color="success" 
                        size="small" 
                        sx={{mr:1, ml:2}} 
                        disabled={creating} 
                        onClick={(e)=>{onSubmit(e,formState)}}
                        >
                        {creating ? <CircularProgress size={20} color="inherit" /> : "Save"}
                    </MDButton>
                    <MDButton variant="contained" color="error" size="small" disabled={creating} onClick={()=>{navigate("/carousel")}}>
                        Cancel
                    </MDButton>
                    </>
                    )}
                    {(isSubmitted || id) && !editing && (
                    <>
                    <MDButton variant="contained" color="warning" size="small" sx={{mr:1, ml:2}} onClick={()=>{setEditing(true)}}>
                        Edit
                    </MDButton>
                    <MDButton variant="contained" color="info" size="small" onClick={()=>{id ? navigate("/portfolio") : setIsSubmitted(false)}}>
                        Back
                    </MDButton>
                    </>
                    )}
                    {(isSubmitted || id) && editing && (
                    <>
                    <MDButton 
                        variant="contained" 
                        color="warning" 
                        size="small" 
                        sx={{mr:1, ml:2}} 
                        disabled={saving} 
                        // onClick={(e)=>{onEdit(e,formState)}}
                        >
                        {saving ? <CircularProgress size={20} color="inherit" /> : "Save"}
                    </MDButton>
                    <MDButton 
                        variant="contained" 
                        color="error" 
                        size="small" 
                        disabled={saving} 
                        // onClick={()=>{setEditing(false)}}
                        >
                        Cancel
                    </MDButton>
                    </>
                    )}
            </Grid>

            {(isSubmitted || id) && !editing && 
                <Grid item xs={12} md={6} xl={12}>
                    
                    <Grid container spacing={1}>

                    <Grid item xs={12} md={6} xl={12} mt={-3} mb={-1}>
                    <MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">
                        Add Roles & Responsibilities
                    </MDTypography>
                    </Grid>
                    
                    <Grid item xs={12} md={1.35} xl={2.7}>
                        <TextField
                            id="outlined-required"
                            label='Order No. *'
                            fullWidth
                            type="number"
                            // value={formState?.features?.orderNo}
                            onChange={(e) => {setFormState(prevState => ({
                                ...prevState,
                                orderNo: e.target.value
                            }))}}
                        />
                    </Grid>
        
                    <Grid item xs={12} md={1.35} xl={2.7}>
                        <TextField
                            id="outlined-required"
                            label='Description *'
                            fullWidth
                            type="text"
                            // value={formState?.features?.description}
                            onChange={(e) => {setFormState(prevState => ({
                                ...prevState,
                                description: e.target.value
                            }))}}
                        />
                    </Grid>
            
                    <Grid item xs={12} md={0.6} xl={1.2} mt={-0.7}>
                        <IoMdAddCircle cursor="pointer" onClick={(e)=>{onAddFeature(e,formState,setFormState)}}/>
                    </Grid>
    
                    </Grid>
    
                </Grid>}

                {(isSubmitted || id) && <Grid item xs={12} md={12} xl={12} mt={2}>
                    <MDBox>
                        <RolesAndResponsibilities updatedDocument={updatedDocument}/>
                    </MDBox>
                </Grid>}

         </Grid>

          {renderSuccessSB}
          {renderErrorSB}
    </MDBox>
    )
                }
    </>
    )
}
export default Index;