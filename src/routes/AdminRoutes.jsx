import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "../layouts/adminLayouts/AdminLayout";
import EmployeeManagementLayout from "../layouts/adminLayouts/EmployeeManagementLayout";
import CustomerManagementLayout from "../layouts/adminLayouts/CustomerManagementLayout";
import CourseManagementLayout from "../layouts/adminLayouts/CourseManagementLayout";
import EmployeeAccountLayout from "../layouts/EmployeeAccountLayout";

import AddEmployeePage from "../pages/admin/employee_manage/AddEmployeePage";
import DeleteEmployeePage from "../pages/admin/employee_manage/DeleteEmployeePage";
import SearchEmployeePage from "../pages/admin/employee_manage/SearchEmployeePage";
import UpdateEmployeePage from "../pages/admin/employee_manage/UpdateEmployeePage";

import BanCustomerPage from "../pages/admin/customer_manage/BanCustomerPage";
import UnbanCustomerPage from "../pages/admin/customer_manage/UnbanCustomerPage";
import GrantMentorPage from "../pages/admin/customer_manage/GrantMentorPage";
import SearchCustomerPage from "../pages/admin/customer_manage/SearchCustomerPage";

import BanCoursePage from "../pages/admin/course_manage/BanCoursePage";
import UnbanCoursePage from "../pages/admin/course_manage/UnbanCoursePage";
import OpenCoursePage from "../pages/admin/course_manage/OpenCoursePage";
import SearchCoursePage from "../pages/admin/course_manage/SearchCoursePage";

import EmployeeProfilePage from "../pages/profiles/EmployeeProfilePage";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="profile" element={<EmployeeAccountLayout />}>
          <Route index element={<Navigate to="detail" replace />} />

          <Route path="detail" element={<EmployeeProfilePage />} />
        </Route>
        <Route path="employee" element={<EmployeeManagementLayout />}>
          <Route index element={<Navigate to="edit" replace />} />

          <Route path="add" element={<AddEmployeePage />} />
          <Route path="del" element={<DeleteEmployeePage />} />
          <Route path="search" element={<SearchEmployeePage />} />
          <Route path="edit" element={<UpdateEmployeePage />} />
        </Route>
        <Route path="customer" element={<CustomerManagementLayout />}>
          <Route index element={<Navigate to="up_role" replace />} />

          <Route path="ban" element={<BanCustomerPage />} />
          <Route path="unban" element={<UnbanCustomerPage />} />
          <Route path="up_role" element={<GrantMentorPage />} />
          <Route path="search" element={<SearchCustomerPage />} />
        </Route>
        <Route path="course" element={<CourseManagementLayout />}>
          <Route index element={<Navigate to="search" replace />} />

          <Route path="ban" element={<BanCoursePage />} />
          <Route path="unban" element={<UnbanCoursePage />} />
          <Route path="open" element={<OpenCoursePage />} />
          <Route path="search" element={<SearchCoursePage />} />
        </Route>
      </Route>
    </Routes>
  );
}
