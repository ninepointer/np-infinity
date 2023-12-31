import React, {useState, memo} from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { CircularProgress } from '@mui/material';
import MDBox from '../../../components/MDBox';

//data
import UpcomingContest from '../data/UserContestCard'
import MyContestCard from '../data/MyContestCard'
import { useNavigate } from 'react-router-dom';

function LabTabs() {
  const [value, setValue] = React.useState('1');
  const [isLoading,setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setIsLoading(true)
    setValue(newValue);
    setTimeout(() => {
      setIsLoading(false)
    }, 500);
  };


  return (
    <Box mt={2} sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Upcoming Battles" value="2" onClick={()=>{navigate('/battlestreet')}}/>
            <Tab label="My Battles" value="3" onClick={()=>{navigate('/battlestreet')}}/>
            <Tab label="History" value="3" onClick={()=>{navigate('/battlestreet/history')}}/>
          </TabList>
        </Box>
        <TabPanel value="2">
          {isLoading ? 
          <MDBox display="flex" justifyContent="center" alignItems="center" mt={5} mb={5}>
            <CircularProgress color="info" />
          </MDBox>
          : 
          <UpcomingContest />
          }
        </TabPanel>
        {/* <TabPanel value="3">
          {isLoading ? 
          <MDBox display="flex" justifyContent="center" alignItems="center" mt={5} mb={5}>
            <CircularProgress color="info" />
          </MDBox>
          : 
          <MyContestCard />
          }
        </TabPanel> */}

      </TabContext>
    </Box>
  );
}
export default memo(LabTabs);