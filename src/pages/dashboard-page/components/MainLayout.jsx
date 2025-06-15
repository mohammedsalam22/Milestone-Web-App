// MainLayout.js
import  { useEffect } from 'react';
import { Box, ThemeProvider, CssBaseline } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useTheme } from '../../../theme/ThemeProvider';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MainLayout = ({ children, toggleSidebar, isSidebarCollapsed }) => {
  const { getCurrentTheme } = useTheme();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      navigate("/");
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [navigate]);

  const isRTL = (language) => ['ar'].includes(language);

  return (
    <ThemeProvider theme={getCurrentTheme()}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
        <Sidebar isCollapsed={isSidebarCollapsed} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            ...(isRTL(i18n.language)  // Use isRTL function
              ? {
                marginRight: isSidebarCollapsed ? '120px' : '300px',
                marginLeft: 'auto', 
              }
              : {
                marginLeft: isSidebarCollapsed ? '120px' : '300px',
                marginRight: 'auto',
              }),
            paddingTop: '80px',
            bgcolor: 'background.default',
            transition: 'margin 0.3s cubic-bezier(0.4, 0, 0.2, 1)', 
            minHeight: '100vh',
          }}
        >
          <Navbar onToggleSidebar={toggleSidebar} isSidebarCollapsed={isSidebarCollapsed} />
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default MainLayout;