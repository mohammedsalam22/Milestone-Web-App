// App.js
import  { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login-page/LoginPage';
import AppThemeProvider from './theme/ThemeProvider';
import MainLayout from './pages/dashboard-page/components/MainLayout';
import RouteWrapper from './RouteWrapper'; 

const App = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };  

  return (
    <AppThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/*"
            element={
              <MainLayout toggleSidebar={toggleSidebar} isSidebarCollapsed={isSidebarCollapsed}>
                <RouteWrapper />
              </MainLayout>
            }
          />
        </Routes>
      </Router>
    </AppThemeProvider>
  );
};

export default App;