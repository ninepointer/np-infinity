import * as React from 'react';
import DataTable from "../../../examples/Tables/DataTable";
import MDButton from "../../../components/MDButton"
import MDBox from "../../../components/MDBox"
import MDTypography from "../../../components/MDTypography"
import Card from "@mui/material/Card";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';


export default function RolesAndResponsibilities({updatedDocument,setUpdatedDocument}) {
    console.log("updatedDocument", updatedDocument)
    let columns = [
        { Header: "Order No.", accessor: "orderNo", align: "center" },
        { Header: "Description", accessor: "description", align: "left" },
        { Header: "Edit", accessor: "edit", align: "center" },
        { Header: "Delete", accessor: "delete", align: "center" },
      ]

    let rows = []

updatedDocument?.rolesAndResponsibilities?.map((elem)=>{
  let featureObj = {}
  featureObj.orderNo = (
    <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
      {elem.orderNo}
    </MDTypography>
  );
  featureObj.description = (
    <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
      {elem.description}
    </MDTypography>
  );
  featureObj.edit = (
    <MDButton component="a" variant="caption" color="text" fontWeight="medium">
      <EditIcon fontSize='small'/>
    </MDButton>
  );
  featureObj.delete = (
    <MDButton component="a" variant="caption" color="text" fontWeight="medium">
      <DeleteForeverIcon fontSize='small'/>
    </MDButton>
  );

  rows.push(featureObj)
})

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="left">
        <MDBox width="100%" display="flex" justifyContent="center" alignItems="center" sx={{backgroundColor:"lightgrey",borderRadius:"2px"}}>
          <MDTypography variant="text" fontSize={12} color="black" mt={0.7} alignItems="center" gutterBottom>
            Roles & Responsibilities
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox mt={1}>
        <DataTable
          table={{ columns, rows }}
          showTotalEntries={false}
          isSorted={false}
          // noEndBorder
          entriesPerPage={false}
        />
      </MDBox>
    </Card>
  );
}

