import { Outlet } from "react-router-dom";
import FinancialReportSideBar from "../../components/sidebar/financeSideBars/FinancialReportSideBar";

export default function FinancialReportLayout() {
  return (
    <div className="flex">
      <FinancialReportSideBar />

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
