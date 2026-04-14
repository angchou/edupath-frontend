import { Outlet } from "react-router-dom";
import LearnerCourseSideBar from "../../components/sidebar/learnerSideBars/LearnerCourseSideBar";

export default function LearnerLayout() {
  return (
    <div className="items-center justify-center">
      <LearnerCourseSideBar />
      <Outlet />
    </div>
  );
}
