// RouteWrapper.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/dashboard-page/DashboardPage';
import Students from './pages/student-management-page/StudentManagement';
import StudentProfile from './pages/student-management-page/components/StudentProfile';
import StudentForm from './pages/student-form-page/StudentForm';
import Staff from './pages/staff-management-page/StaffManagement';
import EmployeeProfile from './pages/staff-management-page/components/EmployeeProfile';
import CreateStaff from './pages/staff-management-page/CreateStaff';
import StaffForm from './pages/staff-form-page/StaffForm';
import Courses from './pages/courses-page/Courses'
import Classes from './pages/classes-page/Classes';
import Reports from './pages/reports-page/Reports';
import Schedule from './pages/schedual-page/Schedule';
import SubjectsPage from './pages/subjects-page/SubjectsPage';
import StudyYearsPage from './pages/study-years-page/StudyYearsPage';
import SchoolStructurePage from './pages/school-structure-page/SchoolStructurePage';
import PostsPage from './pages/posts-page/PostsPage';
import PlacementDatesPage from './pages/placement-dates-page/PlacementDatesPage';
import PlacementTestsPage from './pages/placement-tests-page/PlacementTestsPage';
import PlacementTestProfile from './pages/placement-tests-page/PlacementTestProfile';
import SchoolProgramsPage from './pages/school-programs-page/SchoolProgramsPage';
import SchoolActivitiesPage from './pages/school-activities-page/SchoolActivitiesPage';
import ParentsVisitsPage from './pages/parents-visits-page/ParentsVisitsPage';
import IncidentsPage from './pages/incidents-page/IncidentsPage';
import AttendancesPage from './pages/attendance-page/AttendancesPage';

const RouteWrapper = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/students" element={<Students />} />
      <Route path="/students/create" element={<StudentForm />} />
      <Route path="/students/:id" element={<StudentProfile />} />
      <Route path="/staff" element={<Staff />} />
      <Route path="/staff/:id" element={<EmployeeProfile />} />
      <Route path="/staff/create" element={<StaffForm />} />
      <Route path="/staff/create/:id" element={<StaffForm isEditing={true} />} />
             <Route path="/courses" element={<Courses />} />
       <Route path="/classes" element={<Classes />} />
               <Route path="/subjects" element={<SubjectsPage />} />
        <Route path="/study-years" element={<StudyYearsPage />} />
        <Route path="/school-structure" element={<SchoolStructurePage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path='reports' element={<Reports />} />
        <Route path='schedule' element={<Schedule/>}   />
        <Route path="/placement-dates" element={<PlacementDatesPage />} />
        <Route path="/placement-tests" element={<PlacementTestsPage />} />
        <Route path="/placement-tests/:id" element={<PlacementTestProfile />} />
        <Route path="/school-programs" element={<SchoolProgramsPage />} />
        <Route path="/school-activities" element={<SchoolActivitiesPage />} />
        <Route path="/parents-visits" element={<ParentsVisitsPage />} />
        <Route path="/incidents" element={<IncidentsPage />} />
        <Route path="/attendances" element={<AttendancesPage />} />
    </Routes>
  );
};

export default RouteWrapper;