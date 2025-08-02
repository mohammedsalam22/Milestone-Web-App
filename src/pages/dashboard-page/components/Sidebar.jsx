import {
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import {
  Dashboard as LayoutDashboardIcon,
  People as UsersIcon,
  Book as BookOpenIcon,
  CalendarMonth as CalendarIcon,
  Settings as SettingsIcon,
  School as GraduationCapIcon,
  BarChart as BarChart3Icon,
  VerifiedUser as UserCheckIcon,
  Subject as SubjectIcon,
  Event as EventIcon,
  AccountTree as AccountTreeIcon,
  Article as ArticleIcon
} from '@mui/icons-material';
import { useTheme } from '../../../theme/ThemeProvider';
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { StyledDrawer, StyledListItemButton, StyledListItemIcon } from '../../../styles/SidebarStyles';
import { useSelector } from 'react-redux';

const Sidebar = ({ isCollapsed }) => {
  const { getCurrentTheme } = useTheme();
  const theme = getCurrentTheme();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { user } = useSelector((state) => state.login);
  const role = user?.role;

  // Define isRTL function
  const isRTL = (language) => ['ar'].includes(language);

  const anchor = isRTL(i18n.language) ? 'right' : 'left';

  const navigation = [
    { name: 'dashboard', icon: LayoutDashboardIcon, href: '/dashboard' },
    { name: 'students', icon: UsersIcon, href: '/students' },
    { name: 'staff', icon: UserCheckIcon, href: '/staff' },
    { name: 'courses', icon: BookOpenIcon, href: '/courses' },
    { name: 'subjects', icon: SubjectIcon, href: '/subjects' },
    { name: 'studyYears', icon: EventIcon, href: '/study-years' },
    { name: 'schoolStructure', icon: AccountTreeIcon, href: '/school-structure' },
    { name: 'classes', icon: GraduationCapIcon, href: '/classes' },
    { name: 'posts', icon: ArticleIcon, href: '/posts' },
    { name: 'schedule', icon: CalendarIcon, href: '/schedule' },
    { name: 'reports', icon: BarChart3Icon, href: '/reports' },
    { name: 'settings', icon: SettingsIcon, href: '/settings' },
  ];

  // Role-based navigation
  let filteredNavigation = navigation;
  if (role === 'teacher') {
    filteredNavigation = navigation.filter(item => ['students', 'courses', 'subjects', 'studyYears', 'schoolStructure', 'settings'].includes(item.name));
  } else if (role === 'cooperator') {
    filteredNavigation = navigation.filter(item => ['students', 'staff', 'schedule', 'schoolStructure', 'settings'].includes(item.name));
  } else if (role === 'receptionist') {
    filteredNavigation = navigation.filter(item => ['students', 'staff', 'reports', 'schoolStructure', 'settings'].includes(item.name));
  } // admin gets all

  return (
    <StyledDrawer
      variant="permanent"
      isCollapsed={isCollapsed}
      anchor={anchor}
    >
      <Toolbar sx={{ 
        px: 3, 
        py: 2, 
        minHeight: '80px !important',
        backgroundColor: theme.palette.mode === 'dark' 
          ? theme.palette.background.default 
          : theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}>
        <Box display="flex" alignItems="center" width="100%">
          <Box
            sx={{
              backgroundColor: theme.palette.primary.main,
              borderRadius: '12px',
              p: 1,
              ...(isRTL(i18n.language) ? { ml: isCollapsed ? 0 : 2 } : { mr: isCollapsed ? 0 : 2 }),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <GraduationCapIcon sx={{ color: 'white', fontSize: 28 }} />
          </Box>
          {!isCollapsed && (
            <Box>
              <Typography variant="h6" sx={{ 
                fontWeight: 700, 
                color: theme.palette.text.primary, 
                lineHeight: 1.2 
              }}>
                {t('eduPanel')}
              </Typography>
              <Typography variant="caption" sx={{ 
                color: theme.palette.text.secondary, 
                fontWeight: 500 
              }}>
                {t('schoolManagementSystem')}
              </Typography>
            </Box>
          )}
        </Box>
      </Toolbar>

      <Divider sx={{ 
        mx: 2, 
        backgroundColor: theme.palette.divider,
        opacity: theme.palette.mode === 'dark' ? 0.3 : 1,
      }} />

      <Box sx={{ 
        py: 2,
        backgroundColor: theme.palette.mode === 'dark' 
          ? theme.palette.background.default 
          : theme.palette.background.paper,
      }}>
        <List sx={{ px: 1 }}>
          {filteredNavigation.map((item) => (
            <ListItem key={item.name} disablePadding>
              <StyledListItemButton
                component={Link}
                to={item.href}
                active={location.pathname === item.href}
              >
                <StyledListItemIcon>
                  <item.icon sx={{ fontSize: 22 }} />
                </StyledListItemIcon>
                {!isCollapsed && (
                  <ListItemText
                    primary={t(item.name)}
                    primaryTypographyProps={{
                      fontSize: '0.95rem',
                      fontWeight: location.pathname === item.href ? 600 : 400,
                      color: 'inherit',
                    }}
                  />
                )}
              </StyledListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </StyledDrawer>
  );
};

export default Sidebar;