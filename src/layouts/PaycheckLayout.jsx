import { Outlet } from "react-router-dom";
export default function PaycheckLayout() {
  return (
    <div className="items-center justify-center">
      <Outlet />
    </div>
  );
}
