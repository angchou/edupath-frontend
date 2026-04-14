import { Outlet } from "react-router-dom";
import MentorProfileManagemenSideBar from "../../components/sidebar/qa/MentorProfileManagemenSideBar";

export default function MentorProfileManagementLayout() {
  return (
    <div className="flex">
      <MentorProfileManagemenSideBar />

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
