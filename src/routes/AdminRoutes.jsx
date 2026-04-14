import { Routes, Route } from "react-router-dom";

import AdminLayout from "../layouts/adminLayouts/AdminLayout";
import EmployeeManagementLayout from "../layouts/adminLayouts/EmployeeManagementLayout";
import CustomerManagementLayout from "../layouts/adminLayouts/CustomerManagementLayout";
import CourseManagementLayout from "../layouts/adminLayouts/CourseManagementLayout";

import AddEmployee from "../pages/admin/employee_manage/AddEmployee";
import DeleteEmployee from "../pages/admin/employee_manage/DeleteEmployee";
import SearchEmployee from "../pages/admin/employee_manage/SearchEmployee";
import UpdateEmployee from "../pages/admin/employee_manage/UpdateEmployee";

import BanCustomerPage from "../pages/admin/customer_manage/BanCustomerPage";
import UnbanCustomerPage from "../pages/admin/customer_manage/UnbanCustomerPage";
import GrantMentorPage from "../pages/admin/customer_manage/GrantMentorPage";
import SearchCustomerPage from "../pages/admin/customer_manage/SearchCustomerPage";

import BanCoursePage from "../pages/admin/course_manage/BanCoursePage";
import UnbanCoursePage from "../pages/admin/course_manage/UnbanCoursePage";
import OpenCoursePage from "../pages/admin/course_manage/OpenCoursePage";
import SearchCoursePage from "../pages/admin/course_manage/SearchCoursePage";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="employee" element={<EmployeeManagementLayout />}>
          <Route path="add" element={<AddEmployee />} />
          <Route path="del" element={<DeleteEmployee />} />
          <Route path="search" element={<SearchEmployee />} />
          <Route path="edit" element={<UpdateEmployee />} />
        </Route>
        <Route path="customer" element={<CustomerManagementLayout />}>
          <Route path="ban" element={<BanCustomerPage />} />
          <Route path="unban" element={<UnbanCustomerPage />} />
          <Route path="up_role" element={<GrantMentorPage />} />
          <Route path="search" element={<SearchCustomerPage />} />
        </Route>
        <Route path="course" element={<CourseManagementLayout />}>
          <Route path="ban" element={<BanCoursePage />} />
          <Route path="unban" element={<UnbanCoursePage />} />
          <Route path="open" element={<OpenCoursePage />} />
          <Route path="search" element={<SearchCoursePage />} />
        </Route>
      </Route>
    </Routes>
  );
}
