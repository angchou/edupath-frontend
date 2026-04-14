import { Outlet } from "react-router-dom";
import AdminNavigationBar from "../../components/navigation/AdminNavigationBar";

export default function AdminLayout() {
  return (
    <div className="items-center justify-center">
      <AdminNavigationBar />
      <Outlet />
    </div>
  );
}
