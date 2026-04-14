import { Outlet } from "react-router-dom";
import TicketSideBar from "../../components/sidebar/supportSideBars/TicketSideBar";

export default function TicketLayout() {
  return (
    <div className="flex">
      <TicketSideBar />

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
