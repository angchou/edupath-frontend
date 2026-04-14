import { Routes, Route } from "react-router-dom";
import LearnerLayout from "../layouts/LearnerLayout";
import CoursePage from "../pages/learner/CoursePage";
import MyCoursePage from "../pages/learner/MyCoursePage";
import PeoplePage from "../pages/learner/PeoplePage";
import SupportPage from "../pages/learner/SupportPage";
import ProfilePage from "../pages/ProfilePage";
import ChatPage from "../pages/learner/ChatPage";

export default function LearnerRoutes() {
  return (
    <Routes>
      <Route element={<LearnerLayout />}>
        <Route path="course" element={<CoursePage />} />
        <Route path="my_course" element={<MyCoursePage />} />
        <Route path="people" element={<PeoplePage />} />
        <Route path="support" element={<SupportPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="chat" element={<ChatPage />} />
      </Route>
    </Routes>
  );
}
