import { Routes, Route, Navigate } from "react-router-dom";

import QaLayout from "../layouts/qaLayouts/QaLayout";
import QaCourseManagementLayout from "../layouts/qaLayouts/QaCourseManagementLayout";
import MentorProfileManagementLayout from "../layouts/qaLayouts/MentorProfileManagementLayout";
import EmployeeAccountLayout from "../layouts/EmployeeAccountLayout";

import ApproveCoursePage from "../pages/qa/qa_course_manage/ApproveCoursePage";
import MarkCoursePage from "../pages/qa/qa_course_manage/MarkCoursePage";
import UnmarkCoursePage from "../pages/qa/qa_course_manage/UnmarkCoursePage";

import ApproveMentorProfilePage from "../pages/qa/mentor_profile_manage/ApproveMentorProfilePage";
import SearchMentorProfilePage from "../pages/qa/mentor_profile_manage/SearchMentorProfilePage";

import CourseDetailPage from "../pages/learner/course/CourseDetailPage";

import EmployeeProfilePage from "../pages/profiles/EmployeeProfilePage";

export default function QaRoutes() {
  return (
    <Routes>
      <Route element={<QaLayout />}>
        <Route path="profile" element={<EmployeeAccountLayout />}>
          <Route index element={<Navigate to="detail" replace />} />

          <Route path="detail" element={<EmployeeProfilePage />} />
        </Route>

        <Route path="course" element={<QaCourseManagementLayout />}>
          <Route index element={<Navigate to="approve" replace />} />

          <Route path="approve" element={<ApproveCoursePage />} />
          <Route path="approve/:khoaHocID" element={<CourseDetailPage />} />
          <Route path="mark" element={<MarkCoursePage />} />
          <Route path="unmark" element={<UnmarkCoursePage />} />
        </Route>
        <Route
          path="mentor_profile"
          element={<MentorProfileManagementLayout />}
        >
          <Route index element={<Navigate to="approve" replace />} />

          <Route path="approve" element={<ApproveMentorProfilePage />} />
          <Route path="search" element={<SearchMentorProfilePage />} />
        </Route>
      </Route>
    </Routes>
  );
}
