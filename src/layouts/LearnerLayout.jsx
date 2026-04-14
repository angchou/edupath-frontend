import { Outlet } from "react-router-dom";
import LearnerNavigationBar from "../components/navigation/LearnerNavigationBar";

export default function LearnerLayout() {
  return (
    <div className="items-center justify-center">
      <LearnerNavigationBar />
      <Outlet />
    </div>
  );
}
