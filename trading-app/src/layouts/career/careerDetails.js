// Material Dashboard 2 React example components
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import Footer from "../../examples/Footer";


// Data
// import authorsTableData from "./data/authorsTableData";
// import projectsTableData from "./data/projectsTableData";
import CreateCareerForm from "./createCareerForm";

function Tables() {
  // const { columns, rows } = authorsTableData();
  // const { columns: pColumns, rows: pRows } = projectsTableData();

  return (
    <>
    <DashboardLayout>
      <DashboardNavbar />
      <CreateCareerForm/>
      <Footer />
    </DashboardLayout>
    </>
  );
}

export default Tables;
