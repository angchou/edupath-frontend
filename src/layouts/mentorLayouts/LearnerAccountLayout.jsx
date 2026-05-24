import { Outlet } from "react-router-dom";
import MentorAccountSideBar from "../../components/sidebar/mentorSideBars/MentorAccountSideBar";

export default function MentorAccountLayout() {
  return (
    <div className="flex">
      <MentorAccountSideBar />

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
