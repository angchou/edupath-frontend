import { Routes, Route, Navigate } from "react-router-dom";

import MentorLayout from "../layouts/mentorLayouts/MentorLayout";
import MentorCourseLayout from "../layouts/mentorLayouts/MentorCourseLayout";
import MentorRoadmapLayout from "../layouts/mentorLayouts/MentorRoadmapLayout";
import MentorPeopleLayout from "../layouts/mentorLayouts/LearnerPeopleLayout";
import LearnerSupportLayout from "../layouts/learnerLayouts/LearnerSupportLayout";
import MentorAccountLayout from "../layouts/mentorLayouts/LearnerAccountLayout";

import LearnerCoursePage from "../pages/learner/course/LearnerCoursePage";
import MyCousePage from "../pages/learner/course/MyCoursePage";
import RatingCoursePage from "../pages/learner/course/RatingCoursePage";
import CreateCoursePage from "../pages/mentor/course/CreateCoursePage";
import CourseDetailPage from "../pages/learner/course/CourseDetailPage";
import DemoCoursePage from "../pages/learner/course/DemoCoursePage";
import PaycheckPage from "../pages/paycheck/PaycheckPage";
import EditCousePage from "../pages/mentor/course/EditCoursePage";
import LearnerSupportPage from "../pages/learner/LearnerSupportPage";

import RoadmapPage from "../pages/learner/roadmap/RoadmapPage";
import EditRoadmapPage from "../pages/learner/roadmap/EditRoadmapPage";
import AllRoadmapPage from "../pages/learner/roadmap/AllRoadmapPage";
import CreateRoadmapPage from "../pages/mentor/CreateRoadmapPage";

import MentorMessagePage from "../pages/learner/people/MentorMessagePage";
import PeoplePage from "../pages/learner/people/PeoplePage";

import MentorProfilePage from "../pages/profiles/MentorProfilePage";
import LearnerTransactionPage from "../pages/learner/LearnerTransactionPage";
import BankAccountPage from "../pages/mentor/revenue/BankAccountPage";
import MentorRevenuePage from "../pages/mentor/revenue/MentorRevenuePage";

export default function MentorRoutes() {
  return (
    <Routes>
      <Route element={<MentorLayout />}>
        <Route path="profile" element={<MentorAccountLayout />}>
          <Route index element={<Navigate to="detail" replace />} />

          <Route path="detail" element={<MentorProfilePage />} />
          <Route path="transaction" element={<LearnerTransactionPage />} />
          <Route path="bank_account" element={<BankAccountPage />} />
          <Route path="revenue" element={<MentorRevenuePage />} />
        </Route>
        <Route path="course" element={<MentorCourseLayout />}>
          <Route index element={<Navigate to="create" replace />} />

          <Route path="all" element={<LearnerCoursePage />} />
          <Route path="all/demo/:khoaHocID" element={<DemoCoursePage />} />
          <Route path="paycheck/:khoaHocID" element={<PaycheckPage />} />

          <Route path="my_course" element={<MyCousePage />} />
          <Route path="my_course/:khoaHocID" element={<CourseDetailPage />} />

          <Route path="rating" element={<RatingCoursePage />} />

          <Route path="create" element={<CreateCoursePage />} />
          <Route path="create/edit/:khoaHocID" element={<EditCousePage />} />
        </Route>
        <Route path="roadmap" element={<MentorRoadmapLayout />}>
          <Route index element={<Navigate to="my_road" replace />} />

          <Route path="create" element={<CreateRoadmapPage />} />
          <Route path="my_road" element={<RoadmapPage />} />
          <Route path="edit" element={<EditRoadmapPage />} />
          <Route path="all" element={<AllRoadmapPage />} />
        </Route>
        <Route path="people" element={<MentorPeopleLayout />}>
          <Route index element={<Navigate to="message" replace />} />

          <Route path="all" element={<PeoplePage />} />
          <Route path="message" element={<MentorMessagePage />} />
        </Route>
        <Route path="support" element={<LearnerSupportLayout />}>
          <Route index element={<Navigate to="create" replace />} />

          <Route path="create" element={<LearnerSupportPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
