// RouteWrapper.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/dashboard-page/DashboardPage';
import Students from './pages/student-management-page/StudentManagement';
import StudentProfile from './pages/student-management-page/components/StudentProfile';
import Staff from './pages/staff-management-page/StaffManagement';
import EmployeeProfile from './pages/staff-management-page/components/EmployeeProfile';
import CreateStaff from './pages/staff-management-page/CreateStaff';
import Courses from './pages/courses-page/Courses'
import Classes from './pages/classes-page/Classes';
import Reports from './pages/reports-page/Reports';
import Schedule from './pages/schedual-page/Schedule';
import SubjectsPage from './pages/subjects-page/SubjectsPage';
import StudyYearsPage from './pages/study-years-page/StudyYearsPage';
import SchoolStructurePage from './pages/school-structure-page/SchoolStructurePage';
import PostsPage from './pages/posts-page/PostsPage';

const RouteWrapper = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/students" element={<Students />} />
      <Route path="/students/:id" element={<StudentProfile />} />
      <Route path="/staff" element={<Staff />} />
      <Route path="/staff/:id" element={<EmployeeProfile />} />
      <Route path="/staff/create" element={<CreateStaff />} />
      <Route path="/staff/create/:id" element={<CreateStaff />} />
             <Route path="/courses" element={<Courses />} />
       <Route path="/classes" element={<Classes />} />
               <Route path="/subjects" element={<SubjectsPage />} />
        <Route path="/study-years" element={<StudyYearsPage />} />
        <Route path="/school-structure" element={<SchoolStructurePage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path='reports' element={<Reports />} />
        <Route path='schedule' element={<Schedule/>}   />
    </Routes>
  );
};

export default RouteWrapper;