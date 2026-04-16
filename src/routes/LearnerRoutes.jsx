import { Routes, Route } from "react-router-dom";
import LearnerLayout from "../layouts/learnerLayouts/LearnerLayout";
import LearnerCourseLayout from "../layouts/learnerLayouts/LearnerCourseLayout";
import LearnerRoadmapLayout from "../layouts/learnerLayouts/LearnerRoadmapLayout";
import LearnerPeopleLayout from "../layouts/learnerLayouts/LearnerPeopleLayout";

import LearnerCoursePage from "../pages/learner/course/LearnerCoursePage";
import MyCoursePage from "../pages/learner/course/MyCoursePage";
import RatingCoursePage from "../pages/learner/course/RatingCoursePage";
import CourseDetailPage from "../pages/learner/course/CourseDetailPage";
import DemoCoursePage from "../pages/learner/course/DemoCoursePage";
import PaycheckPage from "../pages/paycheck/PaycheckPage";

import RoadmapPage from "../pages/learner/roadmap/RoadmapPage";
import EditRoadmapPage from "../pages/learner/roadmap/EditRoadmapPage";
import AllRoadmapPage from "../pages/learner/roadmap/AllRoadmapPage";

import PeoplePage from "../pages/learner/people/PeoplePage";
import MessagePage from "../pages/learner/people/MessagePage";

export default function LearnerRoutes() {
  return (
    <Routes>
      <Route element={<LearnerLayout />}>
        <Route path="course" element={<LearnerCourseLayout />}>
          <Route path="all" element={<LearnerCoursePage />} />
          <Route path="all/demo/:khoaHocID" element={<DemoCoursePage />} />
          <Route path="paycheck/:khoaHocID" element={<PaycheckPage />} />

          <Route path="my_course" element={<MyCoursePage />} />
          <Route path="my_course/:khoaHocID" element={<CourseDetailPage />} />

          <Route path="rating" element={<RatingCoursePage />} />
          <Route path="roadmap" element={<RoadmapPage />} />
        </Route>
        <Route path="roadmap" element={<LearnerRoadmapLayout />}>
          <Route path="all" element={<AllRoadmapPage />} />
          <Route path="my_road" element={<RoadmapPage />} />
          <Route path="edit" element={<EditRoadmapPage />} />
        </Route>
        <Route path="people" element={<LearnerPeopleLayout />}>
          <Route path="all" element={<PeoplePage />} />
          <Route path="message" element={<MessagePage />} />
        </Route>
      </Route>
    </Routes>
  );
}
