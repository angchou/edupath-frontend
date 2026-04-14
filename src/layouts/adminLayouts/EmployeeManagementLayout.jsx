import { Outlet } from "react-router-dom";
import EmployeeManagementSideBar from "../../components/sidebar/adminSideBars/EmployeeManagementSideBar";

export default function EmployeeManagementLayout() {
  return (
    <div className="flex">
      <EmployeeManagementSideBar />

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
