import { useState, useEffect, useMemo, useContext, useRef ,Fragment } from "react";
import axios from "axios"
import ReactGA from "react-ga"
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import SettingsIcon from '@mui/icons-material/Settings';

// Material Dashboard 2 React components
import MDBox from "./components/MDBox";
// import MDAvatar from "./components/MDAvatar";

// Material Dashboard 2 React example components
import Sidenav from "./examples/Sidenav";
import Configurator from "./examples/Configurator";

// Material Dashboard 2 React themes
import theme from "./assets/theme";
import themeRTL from "./assets/theme/theme-rtl";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "./assets/theme-dark";
import themeDarkRTL from "./assets/theme-dark/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Material Dashboard 2 React routes
import routes from "./routes";
// import adminRoutes from "./routes";
import userRoutes from "./routesUser";
import analyticsRoutes from "./analyticsRoutes"
import routesInfinityTrader from "./routesInfinityTrader";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator, setLayout } from "./context";

// Images
import brandWhite from "./assets/images/logo-ct.png";
import Logo from "./assets/images/logo1.jpeg"
import brandDark from "./assets/images/logo-ct-dark.png";
import SignIn from "./layouts/authentication/sign-in"
import NewMain from "./NewMain"
import { userContext } from "./AuthContext";
import Cookies from 'js-cookie';
import homeRoutes from "./homeRoute";
import SignUp from './layouts/authentication/sign-up'
import Careers from './layouts/HomePage/pages/Career'
import Workshops from './layouts/HomePage/pages/Workshop'
import JobDescription from './layouts/HomePage/pages/JobDescription'
import JobApply from './layouts/HomePage/pages/CareerForm'
import Home from "../src/layouts/HomePage/pages/Home";
import About from "../src/layouts/HomePage/pages/About";
// import ResetPassword from './layouts/authentication/reset-password'
import ResetPassword from './layouts/authentication/reset-password/cover';
import CampaignDetails from './layouts/campaign/campaignDetails'
import { adminRole } from "./variables";
import { userRole } from "./variables";
import { InfinityTraderRole } from "./variables";
import Contact from "./layouts/HomePage/pages/Contact";
import Privacy from "./layouts/HomePage/pages/Privacy";
import Terms from "./layouts/HomePage/pages/Tnc";
import Contests from "../src/layouts/UserDailyContest/Header/contests";
import ProtectedRoute from "./ProtectedRoute";


const TRACKING_ID = "UA-264098426-2"
ReactGA.initialize(TRACKING_ID)

export default function App() {
  const cookieValue = Cookies.get("jwtoken");
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  // const [routes1, setRoutes] = useState();
  const [detailUser, setDetailUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { pathname } = useLocation();
  const location = useLocation();
  let noCookie = false;
  let myLocation = useRef(location);

  
  //get userdetail who is loggedin
  const setDetails = useContext(userContext);
  const getDetails = useContext(userContext);
  const navigate = useNavigate();
  let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/"
  
  useEffect(()=>{
    axios.get(`${baseUrl}api/v1/loginDetail`, {
        withCredentials: true,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true
        },
    })
    .then((res)=>{
      setDetails.setUserDetail(res.data);
      setDetailUser((res.data));
      setIsLoading(false);

    }).catch((err)=>{
      console.log("Fail to fetch data of user");
      noCookie = true;
      console.log(err);
      // pathname === '/contest' ? navigate("/") : pathname === '/collegecontest' ? navigate("/") : navigate(pathname);
      // navigate("/")
      setIsLoading(false);
    })
  }, [])


  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction, getDetails]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname, getDetails]);


  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        if(route.route !== '/'){
          return <Route exact path={route.route} 
          element={
            <ProtectedRoute>
             {route.component}
            </ProtectedRoute>
          } 
          key={route.key} />;
        }else{
          return <Route exact path={route.route} 
          element={
             route.component
          } 
          key={route.key} />;
        }
      }

      return null;
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
      >
      <SettingsIcon/>
    </MDBox>
  );

  if (isLoading) {
    return <div></div>;
  }

  // console.log("cookieValue", cookieValue, pathname)

  return direction === "rtl" ? (
    
      <CacheProvider value={rtlCache}>
        <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
          <CssBaseline />
          {layout === "infinitydashboard" && (
            <>
              {
                (getDetails?.userDetails?.role?.roleName == adminRole || getDetails?.userDetails?.role?.roleName == userRole|| getDetails?.userDetails?.role?.roleName == InfinityTraderRole || getDetails?.userDetails?.role?.roleName === "data") &&
                <Sidenav
                color={sidenavColor}
                brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
                brandName="StoxHero"
                routes={(detailUser.role?.roleName === adminRole || getDetails?.userDetails?.role?.roleName === adminRole)
                ? routes : (detailUser.role?.roleName === InfinityTraderRole || getDetails?.userDetails?.role?.roleName === InfinityTraderRole) 
                ? routesInfinityTrader : (detailUser.role?.roleName === userRole || getDetails?.userDetails?.role?.roleName === userRole) 
                ? userRoutes : (detailUser.role?.roleName === "data" || getDetails?.userDetails?.role?.roleName === "data") 
                ? analyticsRoutes : homeRoutes
                }  
                  onMouseEnter={handleOnMouseEnter}
                  onMouseLeave={handleOnMouseLeave}
                />
              }
              
              <Configurator />
              {configsButton}
            </>
          )}
        </ThemeProvider>
      </CacheProvider>
    
  ) : (
      <ThemeProvider theme={darkMode ? themeDark : theme}>
        <CssBaseline />
        {layout === "dashboard" && (
          <>
          {
            (getDetails?.userDetails?.role?.roleName === InfinityTraderRole || getDetails?.userDetails?.role?.roleName === adminRole || getDetails?.userDetails?.role?.roleName === userRole|| getDetails?.userDetails?.role?.roleName === "data") &&
            <Sidenav
              color={sidenavColor}
              brand={Logo}
              brandName="StoxHero"
              routes={
                (detailUser.role?.roleName === adminRole || getDetails?.userDetails?.role?.roleName === adminRole)
                ? routes : (detailUser.role?.roleName === userRole || getDetails?.userDetails?.role?.roleName === userRole) 
                ? userRoutes : (detailUser.role?.roleName === InfinityTraderRole || getDetails?.userDetails?.role?.roleName === InfinityTraderRole) 
                ? routesInfinityTrader : (detailUser.role?.roleName === "data" || getDetails?.userDetails?.role?.roleName === "data") 
                ? analyticsRoutes : homeRoutes
              }
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
          }

            <Configurator />
            {/* {configsButton} */}
          </>
        )}
        {layout === "infinitydashboard" && <Configurator />}
        {/* {layout === "analytics" && <Configurator />} */}
        <Routes>
        {(detailUser.role?.roleName === adminRole || getDetails?.userDetails?.role?.roleName === adminRole) 
        ? getRoutes(routes) : (detailUser.role?.roleName === InfinityTraderRole || getDetails?.userDetails?.role?.roleName === InfinityTraderRole) 
        ? getRoutes(routesInfinityTrader) : (detailUser.role?.roleName === userRole || getDetails?.userDetails?.role?.roleName === userRole) 
        ? getRoutes(userRoutes) : (detailUser.role?.roleName === "data" || getDetails?.userDetails?.role?.roleName === "data") 
        ? getRoutes(analyticsRoutes) : getRoutes(homeRoutes)
        }

          {!cookieValue  ?  
          
          pathname == "/login" ?
          <Route path="/login" element={<SignIn />} />
          :
          pathname == "/signup" ?
          <Route path="/signup" element={<SignUp location={myLocation.current} />} />
          :
          pathname == "/resetpassword" ?
          <Route path="/resetpassword" element={<ResetPassword/>} />
          :
          <Route path="/" element={<SignIn />} />
          :
          pathname == "/" || !pathname ?
          <Route path="/" element={<Navigate 
            to={getDetails?.userDetails.role?.roleName === adminRole ? "/infinitydashboard" : getDetails.userDetails?.designation == 'Equity Trader' ? '/infinitytrading':'/stoxherodashboard'} 
            />} />
            :
            <Route path="/" element={<SignIn />} />
          // <Route path="/" element={<Navigate to={pathname} />} />
          // <Route path="/" element={<Navigate to="/virtualtrading" />} />
          
          }


          <Route path='/resetpassword' element={<ResetPassword/>}/>
          <Route path='/careers' element={<Careers location={myLocation.current}/>}/>
          <Route path='/privacy' element={<Privacy/>}/>
          <Route path='/terms' element={<Terms/>}/>
          <Route path='/jobdescription' element={<JobDescription/>}/>
          <Route path='/apply' element={<JobApply/>}/>
          <Route path='/home' element={<SignIn/>}/>
          <Route path='/login' element={<SignIn />}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/workshops' element={<Workshops location={myLocation.current}/>}/>

        </Routes>
      </ThemeProvider>
  );
} //