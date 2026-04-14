import { Outlet } from "react-router-dom";
import FinanceNavigationBar from "../../components/navigation/FinanceNavigationBar";

export default function FinanceLayout() {
  return (
    <div className="items-center justify-center">
      <FinanceNavigationBar />
      <Outlet />
    </div>
  );
}
