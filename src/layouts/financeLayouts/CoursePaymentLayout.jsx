import { Outlet } from "react-router-dom";
import CoursePaymentSideBar from "../../components/sidebar/financeSideBars/CoursePaymentSideBar";

export default function CoursePaymentLayout() {
  return (
    <div className="flex">
      <CoursePaymentSideBar />

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
