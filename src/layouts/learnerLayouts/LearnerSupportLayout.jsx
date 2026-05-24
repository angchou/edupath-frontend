import { Outlet } from "react-router-dom";
import LearnerSupportSidebar from "../../components/sidebar/learnerSideBars/LearnerSupportSidebar";

export default function LearnerSupportLayout() {
  return (
    <div className="flex">
      <LearnerSupportSidebar />

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
