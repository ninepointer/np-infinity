//
import { useState, useEffect } from "react"
import axios from "axios"
// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React components
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";

// Material Dashboard 2 React examples
import DataTable from "../../../../examples/Tables/DataTable";

// Data
import data from "./data";

function MockOverallCompantPNL({ socket, batchName }) {
  const { columns, rows } = data();
  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/"
  // const [liveDetail, setLiveDetail] = useState([]);
  const [marketData, setMarketData] = useState([]);
  const [tradeData, setTradeData] = useState([]);

  // Get Latest Trade Time Stamp code ends

  // let liveDetailsArr = [];
  let totalTransactionCost = 0;
  let totalGrossPnl = 0;
  let totalRunningLots = 0;


  useEffect(() => {

    axios.get(`${baseUrl}api/v1/getliveprice`)
      .then((res) => {
        //console.log("live price data", res)
        setMarketData(res.data);
        // setDetails.setMarketData(data);
      }).catch((err) => {
        return new Error(err);
      })

    socket.on("tick", (data) => {
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

  useEffect(() => {

    axios.get(`${baseUrl}api/v1/infinityTrade/mock/mockPnlBatchWise/${batchName}`)
      .then((res) => {
        setTradeData(res.data.data);

      }).catch((err) => {
        return new Error(err);
      })

  }, [batchName])

  console.log("trade cohort", tradeData)

  useEffect(() => {
    return () => {
      socket.close();
    }
  }, [])

  tradeData.map((elem) => {
    totalTransactionCost += Number(elem.brokerage);
  })

  tradeData.map((subelem, index) => {
    let obj = {};
    totalRunningLots += Number(subelem.lots)

    const liveDetail = marketData.filter((elem) => {
      return elem !== undefined && (elem.instrument_token == subelem._id.instrumentToken || elem.instrument_token == subelem._id.exchangeInstrumentToken)
    })
    let updatedValue = (subelem.amount + (subelem.lots) * liveDetail[0]?.last_price);
    totalGrossPnl += updatedValue;

    const instrumentcolor = subelem._id.symbol.slice(-2) == "CE" ? "success" : "error"
    const quantitycolor = subelem.lots >= 0 ? "success" : "error"
    const gpnlcolor = updatedValue >= 0 ? "success" : "error"
    const pchangecolor = (liveDetail[0]?.change) >= 0 ? "success" : "error"
    const productcolor = subelem._id.product === "NRML" ? "info" : subelem._id.product == "MIS" ? "warning" : "error"

    obj.Product = (
      <MDTypography component="a" variant="caption" color={productcolor} fontWeight="medium">
        {(subelem._id.product)}
      </MDTypography>
    );

    obj.symbol = (
      <MDTypography component="a" variant="caption" color={instrumentcolor} fontWeight="medium">
        {(subelem._id.symbol)}
      </MDTypography>
    );

    obj.Quantity = (
      <MDTypography component="a" variant="caption" color={quantitycolor} fontWeight="medium">
        {subelem.lots}
      </MDTypography>
    );

    obj.avgPrice = (
      <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
        {"₹" + subelem.lastaverageprice.toFixed(2)}
      </MDTypography>
    );

    if ((liveDetail[0]?.last_price)) {
      obj.last_price = (
        <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
          {"₹" + (liveDetail[0]?.last_price).toFixed(2)}
        </MDTypography>
      );
    } else {
      obj.last_price = (
        <MDTypography component="a" variant="caption" color="dark" fontWeight="medium">
          {"₹" + (liveDetail[0]?.last_price)}
        </MDTypography>
      );
    }

    obj.grossPnl = (
      <MDTypography component="a" variant="caption" color={gpnlcolor} fontWeight="medium">
        {updatedValue >= 0.00 ? "+₹" + (updatedValue.toFixed(2)) : "-₹" + ((-updatedValue).toFixed(2))}
      </MDTypography>
    );

    if ((liveDetail[0]?.change)) {
      obj.change = (
        <MDTypography component="a" variant="caption" color={pchangecolor} fontWeight="medium">
          {(liveDetail[0]?.change).toFixed(2) + "%"}
        </MDTypography>
      );
    } else {
      obj.change = (
        <MDTypography component="a" variant="caption" color={pchangecolor} fontWeight="medium">
          {(((liveDetail[0]?.last_price - liveDetail[0]?.average_price) / liveDetail[0]?.average_price) * 100).toFixed(2) + "%"}
        </MDTypography>
      );
    }
    //console.log(obj)
    rows.push(obj);
  })


  let obj = {};

  const totalGrossPnlcolor = totalGrossPnl >= 0 ? "success" : "error"
  const totalnetPnlcolor = (totalGrossPnl - totalTransactionCost) >= 0 ? "success" : "error"

  obj.symbol = (
    <MDTypography component="a" variant="caption" color="dark" fontWeight="medium">
      { }
    </MDTypography>
  );

  obj.Quantity = (
    <MDTypography component="a" variant="caption" backgroundColor="#e0e1e5" borderRadius="5px" padding="5px" fontWeight="medium">
      Running Lots : {totalRunningLots}
    </MDTypography>
  );

  obj.avgPrice = (
    <MDTypography component="a" variant="caption" color="dark" fontWeight="medium">
      { }
    </MDTypography>
  );

  obj.last_price = (
    <MDTypography component="a" variant="caption" color="dark" backgroundColor="#e0e1e5" borderRadius="5px" padding="5px" fontWeight="medium">
      Brokerage : {"₹" + (totalTransactionCost).toFixed(2)}
    </MDTypography>
  );


  obj.grossPnl = (
    <MDTypography component="a" variant="caption" color={totalGrossPnlcolor} backgroundColor="#e0e1e5" borderRadius="5px" padding="5px" fontWeight="medium">
      Gross P&L : {totalGrossPnl >= 0.00 ? "+₹" + (totalGrossPnl.toFixed(2)) : "-₹" + ((-totalGrossPnl).toFixed(2))}
    </MDTypography>
  );

  obj.change = (
    <MDTypography component="a" variant="caption" color={totalnetPnlcolor} backgroundColor="#e0e1e5" borderRadius="5px" padding="5px" fontWeight="medium">
      Net P&L : {(totalGrossPnl - totalTransactionCost) >= 0.00 ? "+₹" + ((totalGrossPnl - totalTransactionCost).toFixed(2)) : "-₹" + ((-(totalGrossPnl - totalTransactionCost)).toFixed(2))}
    </MDTypography>
  );

  rows.push(obj);



  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Action</MenuItem>
      <MenuItem onClick={closeMenu}>Another action</MenuItem>
      <MenuItem onClick={closeMenu}>Something else</MenuItem>
    </Menu>
  );

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={0} ml={2}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Overall Company P&L(Mock) - {batchName}
          </MDTypography>
          {/* <MDBox display="flex" alignItems="center" lineHeight={0}>
            <Icon
              sx={{
                fontWeight: "bold",
                color: ({ palette: { info } }) => info.main,
                mt: -0.5,
              }}
            >
              done
            </Icon>
            <MDTypography variant="button" fontWeight="regular" color="text">
              &nbsp;<strong>last trade</strong> {lastestTradeBy} {lastestTradeType === "BUY" ? "bought" : "sold"} {Math.abs(lastestTradeQunaity)} quantity of {lastestTradeSymbol} at {lastestTradeTime} - {lastestTradeStatus}
            </MDTypography>
          </MDBox> */}
        </MDBox>
        <MDBox color="text" px={2}>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
            more_vert
          </Icon>
        </MDBox>
        {renderMenu}
      </MDBox>
      <MDBox>
        <DataTable
          table={{ columns, rows }}
          showTotalEntries={false}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}
        />
      </MDBox>
    </Card>
  );
}
export default MockOverallCompantPNL;
