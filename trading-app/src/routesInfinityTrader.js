import Profile from "./layouts/profile";

// @mui icons

import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import ReorderIcon from '@mui/icons-material/Reorder';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import HelpIcon from '@mui/icons-material/Help';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { GiNinjaHeroicStance } from 'react-icons/gi';
import Funds from "./layouts/funds";
import StoxHeroDashboard from './layouts/StoxHeroTraderDashboard'
import DashboardIcon from '@mui/icons-material/Dashboard';
import Chart from './layouts/charts/index';

//page routes
import Tnc from "./layouts/terms/tnc";
import UserOrders from "./layouts/userorders";
import UserPosition from "./layouts/PaperTrade";
import UserReport from "./layouts/userreports";
import MyReferrals from "./layouts/referrals"
import MyPortfolio from './layouts/UserPortfolio'
import FAQs from "./layouts/FAQs";
import UserWallet from "./layouts/userWallet";
// import StoxHeroTrading from "./layouts/StoxHeroTrading"
import InfinityTrader from "./layouts/InfinityTrading"
import Analytics from "./layouts/userAnalytics/index"


const routes = [

    // {
    //   type: "collapse",
    //   name: "Dashboard",
    //   key: "stoxherodashboard",
    //   // icon: <Icon fontSize="small">person</Icon>,
    //   icon: <DashboardIcon/>,
    //   route: "/stoxherodashboard",
    //   component: <StoxHeroDashboard />,
    // },
  {
    type: "collapse",
    name: "Infinity Trading",
    key: "infinitytrading",
    // icon: <Icon fontSize="small">person</Icon>,
    icon: <GiNinjaHeroicStance/>,
    route: "/infinitytrading",
    component: <InfinityTrader />,
  },
  {
    type: "collapse",
    name: "Virtual Trading",
    key: "virtualtrading",
    // icon: <Icon fontSize="small">person</Icon>,
    icon: <MilitaryTechIcon/>,
    route: "/virtualtrading",
    component: <UserPosition />,
  },
  {
    type: "collapse",
    name: "Orders",
    key: "orders",
    // icon: <Icon fontSize="small">person</Icon>,
    icon: <ReorderIcon/>,
    route: "/orders",
    component: <UserOrders />,
  },
  {

    route: "/chart",
    component: <Chart/>,
  },
  // {
  //   type: "collapse",
  //   name: "Referrals",
  //   key: "referrals",
  //   icon: <Diversity3Icon/>,
  //   route: "/referrals",
  //   component: <MyReferrals />,
  // },
  {
    type: "collapse",
    name: "Analytics",
    key: "analytics",
    // icon: <Icon fontSize="small">person</Icon>,
    icon: <AnalyticsIcon/>,
    route: "/analytics",
    component: <Analytics />,
  },
  {
    type: "collapse",
    name: "Portfolio",
    key: "portfolio",
    icon: <BusinessCenterIcon/>,
    route: "/portfolio",
    component: <MyPortfolio />,
  },
  {
    // type: "collapse",
    // name: "Wallet",
    // key: "Wallet",
    icon: <AccountBalanceWalletIcon/>,
    route: "/wallet",
    component: <UserWallet />,
  },
  // {
  //   type: "collapse",
  //   name: "FAQs",
  //   key: "faqs",
  //   // icon: <Icon fontSize="small">person</Icon>,
  //   icon: <HelpIcon/>,
  //   route: "/faqs",
  //   component: <FAQs />,
  // },
  {
    // type: "collapse",
    // name: "Profile",
    // key: "profile",
    // icon: <Icon fontSize="small">person</Icon>,
    // icon: <PersonPinIcon/>,
    route: "/profile",
    component: <Profile />,
  },
  {
    // type: "collapse",
    // name: "Terms",
    // key: "terms",
    // icon: <Icon fontSize="small">person</Icon>,
    icon: <PersonPinIcon/>,
    route: "/terms",
    component: <Tnc />,
  },
    {
    type: "collapse",
    name: "Funds",
    key: "funds",
    icon: <BusinessCenterIcon/>,
    route: "/funds",
    component: <Funds/>,
  },

];

// console.log(routes)

export default routes;
