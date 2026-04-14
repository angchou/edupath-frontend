import { Outlet } from "react-router-dom";
import QaNavigationBar from "../../components/navigation/QaNavigationBar";

export default function QaLayout() {
  return (
    <div className="items-center justify-center">
      <QaNavigationBar />
      <Outlet />
    </div>
  );
}
