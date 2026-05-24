import { Outlet } from "react-router-dom";
import EmployeeAccountSideBar from "../components/sidebar/EmployeeAccountSideBar";

export default function EmployeeAccountLayout() {
  return (
    <div className="flex">
      <EmployeeAccountSideBar />

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
