import { Outlet } from "react-router-dom";
import LearnerPeopleSideBar from "../../components/sidebar/learnerSideBars/LearnerPeopleSideBar";

export default function LearnerPeopleLayout() {
  return (
    <div className="flex">
      <LearnerPeopleSideBar />

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
