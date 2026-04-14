import { Outlet } from "react-router-dom";
import SystemOperationSideBar from "../../components/sidebar/financeSideBars/SystemOperationSideBar";

export default function SystemOperationLayout() {
  return (
    <div className="flex">
      <SystemOperationSideBar />

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
