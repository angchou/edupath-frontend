import { Outlet } from "react-router-dom";
import LearnerCourseSideBar from "../../components/sidebar/learnerSideBars/LearnerCourseSideBar";

export default function CourseDetailLayout() {
  return (
    <div className="flex">
      <LearnerCourseSideBar />

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
