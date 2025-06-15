// RouteWrapper.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/dashboard-page/DashboardPage';
import Students from './pages/student-management-page/StudentManagement';
import Staff from './pages/staff-management-page/StaffManagement';
import Courses from './pages/courses-page/Courses'
import Classes from './pages/classes-page/Classes';
import Reports from './pages/reports-page/Reports';
import Schedule from './pages/schedual-page/Schedule';
const RouteWrapper = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/students" element={<Students />} />
      <Route path="/staff" element={<Staff />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/classes" element={<Classes />} />
      <Route path='reports' element={<Reports />} />
      <Route path='schedule' element={<Schedule/>}   />
    </Routes>
  );
};

export default RouteWrapper;