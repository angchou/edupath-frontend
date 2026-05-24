import { Outlet } from "react-router-dom";
import VoucherSideBar from "../../components/sidebar/financeSideBars/VoucherSideBar";

export default function VoucherLayout() {
  return (
    <div className="flex">
      <VoucherSideBar />

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
