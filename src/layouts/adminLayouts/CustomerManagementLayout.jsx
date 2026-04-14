import { Outlet } from "react-router-dom";
import CustomerManagementSideBar from "../../components/sidebar/adminSideBars/CustomerManagementSideBar";

export default function CustomerManagementLayout() {
  return (
    <div className="flex">
      <CustomerManagementSideBar />

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
