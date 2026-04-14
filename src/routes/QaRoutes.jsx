import { Routes, Route } from "react-router-dom";

import QaLayout from "../layouts/qaLayouts/QaLayout";
import QaCourseManagementLayout from "../layouts/qaLayouts/QaCourseManagementLayout";
import MentorProfileManagementLayout from "../layouts/qaLayouts/MentorProfileManagementLayout";

import ApproveCoursePage from "../pages/qa/qa_course_manage/ApproveCoursePage";
import MarkCoursePage from "../pages/qa/qa_course_manage/MarkCoursePage";
import UnmarkCoursePage from "../pages/qa/qa_course_manage/UnmarkCoursePage";

import ApproveMentorProfilePage from "../pages/qa/mentor_profile_manage/ApproveMentorProfilePage";
import SearchMentorProfilePage from "../pages/qa/mentor_profile_manage/SearchMentorProfilePage";
import DeleteMentorProfilePage from "../pages/qa/mentor_profile_manage/DeleteMentorProfilePage";

export default function QaRoutes() {
  return (
    <Routes>
      <Route element={<QaLayout />}>
        <Route path="course" element={<QaCourseManagementLayout />}>
          <Route path="approve" element={<ApproveCoursePage />} />
          <Route path="mark" element={<MarkCoursePage />} />
          <Route path="unmark" element={<UnmarkCoursePage />} />
        </Route>
        <Route
          path="mentor_profile"
          element={<MentorProfileManagementLayout />}
        >
          <Route path="approve" element={<ApproveMentorProfilePage />} />
          <Route path="search" element={<SearchMentorProfilePage />} />
          <Route path="del" element={<DeleteMentorProfilePage />} />
        </Route>
      </Route>
    </Routes>
  );
}
