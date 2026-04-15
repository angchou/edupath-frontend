import { Outlet } from "react-router-dom";
import MentorNavigationBar from "../../components/navigation/MentorNavigationBar";

export default function LearnerLayout() {
  return (
    <div className="items-center justify-center">
      <MentorNavigationBar />
      <Outlet />
    </div>
  );
}
