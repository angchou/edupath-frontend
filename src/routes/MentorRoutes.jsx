import { Routes, Route } from "react-router-dom";

import MentorLayout from "../layouts/mentorLayouts/MentorLayout";
import MentorCourseLayout from "../layouts/mentorLayouts/MentorCourseLayout";
import MentorRoadmapLayout from "../layouts/mentorLayouts/MentorRoadmapLayout";
import LearnerPeopleLayout from "../layouts/learnerLayouts/LearnerPeopleLayout";

import LearnerCoursePage from "../pages/learner/course/LearnerCoursePage";
import MyCousePage from "../pages/learner/course/MyCoursePage";
import RatingCoursePage from "../pages/learner/course/RatingCoursePage";
import CreateCoursePage from "../pages/mentor/course/CreateCoursePage";
import CourseDetailPage from "../pages/learner/course/CourseDetailPage";
import DemoCoursePage from "../pages/learner/course/DemoCoursePage";
import PaycheckPage from "../pages/paycheck/PaycheckPage";
import EditCousePage from "../pages/mentor/course/EditCoursePage";

import RoadmapPage from "../pages/learner/roadmap/RoadmapPage";
import EditRoadmapPage from "../pages/learner/roadmap/EditRoadmapPage";
import AllRoadmapPage from "../pages/learner/roadmap/AllRoadmapPage";
import CreateRoadmapPage from "../pages/mentor/CreateRoadmapPage";

import MessagePage from "../pages/learner/people/MessagePage";
import PeoplePage from "../pages/learner/people/PeoplePage";

import MentorProfilePage from "../pages/profiles/MentorProfilePage";

export default function MentorRoutes() {
  return (
    <Routes>
      <Route element={<MentorLayout />}>
        <Route path="profile" element={<MentorProfilePage />} />
        <Route path="course" element={<MentorCourseLayout />}>
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
          <Route path="create" element={<CreateRoadmapPage />} />
          <Route path="my_road" element={<RoadmapPage />} />
          <Route path="edit" element={<EditRoadmapPage />} />
          <Route path="all" element={<AllRoadmapPage />} />
        </Route>
        <Route path="people" element={<LearnerPeopleLayout />}>
          <Route path="all" element={<PeoplePage />} />
          <Route path="message" element={<MessagePage />} />
        </Route>
      </Route>
    </Routes>
  );
}
