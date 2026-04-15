import { Outlet } from "react-router-dom";
import MentorCourseSideBar from "../../components/sidebar/mentorSideBars/MentorCourseSideBar";

export default function MentorCourseLayout() {
  return (
    <div className="flex">
      <MentorCourseSideBar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
