import { Routes, Route } from "react-router-dom";

import MentorLayout from "../layouts/mentorLayouts/MentorLayout";
import MentorCourseLayout from "../layouts/mentorLayouts/MentorCourseLayout";
import MentorRoadmapLayout from "../layouts/mentorLayouts/MentorRoadmapLayout";

import LearnerCoursePage from "../pages/learner/course/LearnerCoursePage";
import MyCousePage from "../pages/learner/course/MyCoursePage";
import RatingCoursePage from "../pages/learner/course/RatingCoursePage";
import CreateCoursePage from "../pages/mentor/CreateCoursePage";
import CourseDetailPage from "../pages/learner/course/CourseDetailPage";

import RoadmapPage from "../pages/learner/roadmap/RoadmapPage";
import EditRoadmapPage from "../pages/learner/roadmap/EditRoadmapPage";
import DeleteRoadmapPage from "../pages/learner/roadmap/DeleteRoadmapPage";
import CreateRoadmapPage from "../pages/mentor/CreateRoadmapPage";

export default function MentorRoutes() {
  return (
    <Routes>
      <Route element={<MentorLayout />}>
        <Route path="course" element={<MentorCourseLayout />}>
          <Route path="all" element={<LearnerCoursePage />} />

          <Route path="my_course" element={<MyCousePage />} />
          <Route path="my_course/:khoaHocID" element={<CourseDetailPage />} />

          <Route path="rating" element={<RatingCoursePage />} />
          <Route path="create" element={<CreateCoursePage />} />
        </Route>
        <Route path="roadmap" element={<MentorRoadmapLayout />}>
          <Route path="create" element={<CreateRoadmapPage />} />
          <Route path="all" element={<RoadmapPage />} />
          <Route path="edit" element={<EditRoadmapPage />} />
          <Route path="del" element={<DeleteRoadmapPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
