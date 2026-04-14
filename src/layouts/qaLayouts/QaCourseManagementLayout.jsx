import { Outlet } from "react-router-dom";
import QaCourseManagementSideBar from "../../components/sidebar/qa/QaCourseManagementSideBar";

export default function QaCourseManagementLayout() {
  return (
    <div className="flex">
      <QaCourseManagementSideBar />

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
