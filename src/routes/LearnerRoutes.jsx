import { Routes, Route } from "react-router-dom";
import LearnerLayout from "../layouts/learnerLayouts/LearnerLayout";
import LearnerCourseLayout from "../layouts/learnerLayouts/LearnerCourseLayout";

import LearnerCoursePage from "../pages/learner/LearnerCoursePage";
import MyCoursePage from "../pages/learner/MyCoursePage";
import RatingCoursePage from "../pages/learner/RatingCoursePage";
import RoadmapPage from "../pages/learner/RoadmapPage";

export default function LearnerRoutes() {
  return (
    <Routes>
      <Route element={<LearnerLayout />}>
        <Route path="course" element={<LearnerCourseLayout />}>
          <Route path="all" element={<LearnerCoursePage />} />
          <Route path="my_course" element={<MyCoursePage />} />
          <Route path="rating" element={<RatingCoursePage />} />
          <Route path="roadmap" element={<RoadmapPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
