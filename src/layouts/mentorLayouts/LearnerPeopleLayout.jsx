import { Outlet } from "react-router-dom";
import MentorPeopleSideBar from "../../components/sidebar/mentorSideBars/MentorPeopleSideBar";

export default function MentorPeopleLayout() {
  return (
    <div className="flex">
      <MentorPeopleSideBar />

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
