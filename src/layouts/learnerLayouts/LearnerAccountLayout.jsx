import { Outlet } from "react-router-dom";
import LearnerAccountSideBar from "../../components/sidebar/learnerSideBars/LearnerAccountSideBar";

export default function LearnerAccountLayout() {
  return (
    <div className="flex">
      <LearnerAccountSideBar />

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
