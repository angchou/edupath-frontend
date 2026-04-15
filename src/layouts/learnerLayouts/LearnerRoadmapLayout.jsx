import { Outlet } from "react-router-dom";
import LearnerRoadmapSideBar from "../../components/sidebar/learnerSideBars/LearnerRoadmapSideBar";

export default function LearnerRoadmapLayout() {
  return (
    <div className="flex">
      <LearnerRoadmapSideBar />

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
