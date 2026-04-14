import { Outlet } from "react-router-dom";
import SupportNavigationBar from "../../components/navigation/SupportNavigationBar";

export default function SupportLayout() {
  return (
    <div className="items-center justify-center">
      <SupportNavigationBar />
      <Outlet />
    </div>
  );
}
