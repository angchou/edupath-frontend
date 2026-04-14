import { Outlet } from "react-router-dom";
import CourseManagementSideBar from "../../components/sidebar/adminSideBars/CourseManagementSideBar";

export default function CourseManagementLayout() {
  return (
    <div className="flex">
      <CourseManagementSideBar />

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
