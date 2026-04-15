import { Outlet } from "react-router-dom";
import MentorRoadMapSideBar from "../../components/sidebar/mentorSideBars/MentorRoadMapSideBar";

export default function MentorRoadmapLayout() {
  return (
    <div className="flex">
      <MentorRoadMapSideBar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
