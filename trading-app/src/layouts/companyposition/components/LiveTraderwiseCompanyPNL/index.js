import {useState, useEffect} from "react"
import axios from "axios"
// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";



// Material Dashboard 2 React components
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";
import { Typography } from "@mui/material";
import { HiUserGroup } from "react-icons/hi";

// Material Dashboard 2 React examples
import DataTable from "../../../../examples/Tables/DataTable";
import LiveViewTradeDetail from "./LiveViewTradeDetail"
import LiveTraderwiseOrders from "./LiveTraderwiseOrders"

// Data
import data from "./data";

function LiveTraderwiseCompantPNL(props) {
  const { columns, rows } = data();
  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);
  // const [lastestLiveTradeTimearr, setLatestLiveTradeTimearr] = useState([]);
  let [latestLive, setLatestLive] = useState({
    tradeTime: "",
    tradeBy: "",
    tradeSymbol: "",
    tradeType: "",
    tradeQuantity: "",
    tradeStatus: ""
  })

  let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/"
    
  const [allTrade, setAllTrade] = useState([]);
  const [marketData, setMarketData] = useState([]);
  const [trackEvent, setTrackEvent] = useState({});

  useEffect(()=>{

    axios.get(`${baseUrl}api/v1/getliveprice`)
    .then((res) => {
        //console.log("live price data", res)
        setMarketData(res.data);
        // setDetails.setMarketData(data);
    }).catch((err) => {
        return new Error(err);
    })

    props.socket.on("tick", (data) => {
      //console.log("this is live market data", data);
      setMarketData(prevInstruments => {
        const instrumentMap = new Map(prevInstruments.map(instrument => [instrument.instrument_token, instrument]));
        data.forEach(instrument => {
          instrumentMap.set(instrument.instrument_token, instrument);
        });
        return Array.from(instrumentMap.values());
      });
      // setDetails.setMarketData(data);
    })
  }, [])

  useEffect(()=>{

    axios.get(`${baseUrl}api/v1/infinityTrade/live/traderWiseCompany`)
    .then((res) => {
        setAllTrade(res.data.data);
    }).catch((err)=>{
        return new Error(err);
    })
  }, [trackEvent])

  useEffect(()=>{
    props.socket.on('updatePnl', (data)=>{
      // console.log("in the pnl event", data)
      setTimeout(()=>{
        setTrackEvent(data);
      })
    })
  }, [])

  useEffect(() => {
    return () => {
        //console.log('closing');
        props.socket.close();
    }
  }, [])

  useEffect(()=>{
         // Get Lastest Trade timestamp
  axios.get(`${baseUrl}api/v1/infinityTrade/live/letestTradeCompany`)
  // axios.get(`${baseUrl}api/v1/readmocktradecompany`)
  .then((res)=>{
      //console.log(res.data);
      // setLatestLiveTradeTimearr(res.data);
      latestLive.tradeTime = (res.data.data.trade_time) ;
      latestLive.tradeBy = (res.data.data.createdBy) ;
      latestLive.tradeType = (res.data.data.buyOrSell) ;
      latestLive.tradeQuantity = (res.data.data.Quantity) ;
      latestLive.tradeSymbol = (res.data.data.symbol) ;
      latestLive.tradeStatus = (res.data.data.status)

      setLatestLive(latestLive)
  }).catch((err) => {
    return new Error(err);
  })
  }, [])

  if (allTrade.length !== 0) {
    let mapForParticularUser = new Map();
    for (let i = 0; i < allTrade.length; i++) {
      if (mapForParticularUser.has(allTrade[i].traderId)) {
        let marketDataInstrument = marketData.filter((elem) => {
          return (elem.instrument_token == Number(allTrade[i].symbol) || elem.instrument_token == Number(allTrade[i].exchangeInstrumentToken))
        })

        let obj = mapForParticularUser.get(allTrade[i].traderId)
        obj.totalPnl += ((allTrade[i].amount + ((allTrade[i].lots) * marketDataInstrument[0]?.last_price)));
        obj.lotUsed += Math.abs(allTrade[i].lotUsed)
        obj.runninglots += allTrade[i].lots;
        obj.brokerage += allTrade[i].brokerage;
        obj.noOfTrade += allTrade[i].trades;
        obj.absRunninglots += Math.abs(allTrade[i].lots);

      } else {
        let marketDataInstrument = marketData.filter((elem) => {
          return elem !== undefined && (elem.instrument_token == Number(allTrade[i].symbol) || elem.instrument_token == Number(allTrade[i].exchangeInstrumentToken))
        })
        mapForParticularUser.set(allTrade[i].traderId, {
          name: allTrade[i].traderName,
          totalPnl: ((allTrade[i].amount + ((allTrade[i].lots) * marketDataInstrument[0]?.last_price))),
          lotUsed: Math.abs(allTrade[i].lotUsed),
          runninglots: allTrade[i].lots,
          absRunninglots: Math.abs(allTrade[i].lots),
          brokerage: allTrade[i].brokerage,
          noOfTrade: allTrade[i].trades,
          userId: allTrade[i].traderId,
          algoName: allTrade[i].algoName
        })
      }
    }


    let finalTraderPnl = [];
    for (let value of mapForParticularUser.values()) {
      finalTraderPnl.push(value);
    }

    finalTraderPnl.sort((a, b) => {
      return (b.totalPnl - b.brokerage) - (a.totalPnl - a.brokerage)
    });

    // console.log("finalTraderPnl", finalTraderPnl)


    let totalGrossPnlGrid = 0;
    let totalTransactionCost = 0;
    let totalNoRunningLots = 0;
    let totalTrades = 0;
    let totalLotsUsed = 0;
    let totalTraders = 0;
    let totalAbsRunningLots = 0;

    finalTraderPnl.map((subelem, index) => {
      let obj = {};

      let npnlcolor = ((subelem.totalPnl) - (subelem.brokerage)) >= 0 ? "success" : "error"
      let tradercolor = ((subelem.totalPnl) - (subelem.brokerage)) >= 0 ? "success" : "error"
      let gpnlcolor = (subelem.totalPnl) >= 0 ? "success" : "error"
      let runninglotscolor = subelem.runninglots > 0 ? "info" : (subelem.runninglots < 0 ? "error" : "dark")
      let traderbackgroundcolor = subelem.runninglots != 0 ? "white" : "#e0e1e5"
      let runninglotsbgcolor = subelem.runninglots > 0 ? "#ffff00" : ""

      totalGrossPnlGrid += (subelem.totalPnl);
      //console.log("Gross P&L: ",subelem.name,subelem.totalPnl );
      totalTransactionCost += (subelem.brokerage);
      totalNoRunningLots += (subelem.runninglots);
      totalLotsUsed += (subelem.lotUsed);
      totalTrades += (subelem.noOfTrade);
      totalTraders += 1;
      totalAbsRunningLots += subelem.absRunninglots;

      obj.userId = (
        <MDTypography component="a" variant="caption" fontWeight="medium">
          {subelem.userId}
        </MDTypography>
      );

      obj.traderName = (
        <MDTypography component="a" variant="caption" color={tradercolor} fontWeight="medium" backgroundColor={traderbackgroundcolor} padding="5px" borderRadius="5px">
          {(subelem.name)}
        </MDTypography>
      );

      obj.grossPnl = (
        <MDTypography component="a" variant="caption" color={gpnlcolor} fontWeight="medium">
          {(subelem.totalPnl) > 0.00 ? "+₹" + ((subelem.totalPnl).toFixed(2)) : "-₹" + (-subelem.totalPnl).toFixed(2)}
        </MDTypography>
      );

      obj.noOfTrade = (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {subelem.noOfTrade}
        </MDTypography>
      );

      obj.runningLots = (
        <MDTypography component="a" variant="caption" color={runninglotscolor} backgroundColor={runninglotsbgcolor} fontWeight="medium">
          {subelem.runninglots}
        </MDTypography>
      );

      obj.absRunningLots = (
        <MDTypography component="a" variant="caption" color={runninglotscolor} backgroundColor={runninglotsbgcolor} fontWeight="medium">
          {subelem.absRunninglots}
        </MDTypography>
      );

      obj.lotUsed = (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {subelem.lotUsed}
        </MDTypography>
      );

      obj.brokerage = (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {"₹" + (subelem.brokerage).toFixed(2)}
        </MDTypography>
      );

      obj.netPnl = (
        <MDTypography component="a" variant="caption" color={npnlcolor} fontWeight="medium">
          {((subelem.totalPnl) - (subelem.brokerage)) > 0.00 ? "+₹" + (((subelem.totalPnl) - (subelem.brokerage)).toFixed(2)) : "-₹" + ((-((subelem.totalPnl) - (subelem.brokerage))).toFixed(2))}
        </MDTypography>
      );
      //  obj.view = (
      //   <LiveViewTradeDetail userId={subelem.userId}/>
      // );
      // obj.orders = (
      //   <LiveTraderwiseOrders userId={subelem.userId}/>
      // );

      rows.push(obj);
    })


    console.log("this is rows", finalTraderPnl)
    let obj = {};

    const totalGrossPnlcolor = totalGrossPnlGrid >= 0 ? "success" : "error"
    const totalnetPnlcolor = (totalGrossPnlGrid - totalTransactionCost) >= 0 ? "success" : "error"


    obj.traderName = (
      <MDTypography component="a" variant="caption" padding="5px" borderRadius="5px" backgroundColor="#e0e1e5" fontWeight="medium">
        Traders: {totalTraders}
      </MDTypography>
    );

    obj.grossPnl = (
      <MDTypography component="a" variant="caption" color={totalGrossPnlcolor} padding="5px" borderRadius="5px" backgroundColor="#e0e1e5" fontWeight="medium">
        {totalGrossPnlGrid >= 0.00 ? "+₹" + (totalGrossPnlGrid.toFixed(2)) : "-₹" + ((-totalGrossPnlGrid).toFixed(2))}
      </MDTypography>
    );

    obj.noOfTrade = (
      <MDTypography component="a" variant="caption" padding="5px" borderRadius="5px" backgroundColor="#e0e1e5" fontWeight="medium">
        {totalTrades}
      </MDTypography>
    );

    obj.runningLots = (
      <MDTypography component="a" variant="caption" color="dark" padding="5px" borderRadius="5px" backgroundColor="#e0e1e5" fontWeight="medium">
        {totalNoRunningLots}
      </MDTypography>
    );

    obj.absRunningLots = (
      <MDTypography component="a" variant="caption" color="dark" padding="5px" borderRadius="5px" backgroundColor="#e0e1e5" fontWeight="medium">
        {totalAbsRunningLots}
      </MDTypography>
    );

    obj.lotUsed = (
      <MDTypography component="a" variant="caption" color="dark" padding="5px" borderRadius="5px" backgroundColor="#e0e1e5" fontWeight="medium">
        {totalLotsUsed}
      </MDTypography>
    );


    obj.brokerage = (
      <MDTypography component="a" variant="caption" color="dark" padding="5px" borderRadius="5px" backgroundColor="#e0e1e5" fontWeight="medium">
        {"₹" + (totalTransactionCost).toFixed(2)}
      </MDTypography>
    );

    obj.netPnl = (
      <MDTypography component="a" variant="caption" color={totalnetPnlcolor} padding="5px" borderRadius="5px" backgroundColor="#e0e1e5" fontWeight="medium">
        {(totalGrossPnlGrid - totalTransactionCost) >= 0.00 ? "+₹" + ((totalGrossPnlGrid - totalTransactionCost).toFixed(2)) : "-₹" + ((-(totalGrossPnlGrid - totalTransactionCost)).toFixed(2))}
      </MDTypography>
    );

    rows.push(obj);
  }

console.log("Cumulative Row: ",rows)

  return (
<>
      
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        
      <MDBox display="flex" justifyContent="space-between" alignItems="center" flexGrow={1}>
          <MDTypography variant="h6" gutterBottom>
            Traders Company Position(Live Trade)
          </MDTypography>
          <MDBox display="flex" alignItems="center" lineHeight={0} textAlign="right">
            <Icon
              sx={{
                fontWeight: "bold",
                color: ({ palette: { info } }) => info.main,
                mt: 0,
              }}
            >
              {latestLive.tradeBy ? 'done' : 'stop'}
            </Icon>
            <MDTypography variant="button" fontWeight="regular" color="text">
            {latestLive.tradeBy ? 
              <span>
                <strong> last trade </strong>
                {latestLive.tradeBy} {latestLive.tradeType === "BUY" ? "bought " : "sold "}  
                {Math.abs(latestLive.tradeQuantity)} quantity of {latestLive.tradeSymbol} at {(latestLive.tradeTime).toString().split("T")[1].split(".")[0]} - {latestLive.tradeStatus}
              </span>
              : "No real trades today"
            }
            </MDTypography>
          </MDBox>
        </MDBox>

        {/* {renderMenu} */}
      </MDBox>

      {rows.length === 0 ? (
      <MDBox display="flex" flexDirection="column" mb={4} sx={{alignItems:"center"}}>
        <HiUserGroup style={{fontSize: '30px', color:"green"}}/>
        <Typography style={{fontSize: '20px',color:"grey"}}>Nothing here</Typography>
        <Typography mb={2} fontSize={15} color="grey">Trader wise active mock trades will show up here.</Typography> 
      </MDBox>)
      :
        (<MDBox>
          <DataTable
            table={{ columns, rows }}
            showTotalEntries={true}
            isSorted={false}
            noEndBorder
          />
        </MDBox>
      )}
    </Card>
   </>
  );
}
export default LiveTraderwiseCompantPNL;
