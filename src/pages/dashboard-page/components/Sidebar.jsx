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
  VerifiedUser as UserCheckIcon
} from '@mui/icons-material';
import { useTheme } from '../../../theme/ThemeProvider';
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { StyledDrawer, StyledListItemButton, StyledListItemIcon } from '../../../styles/SidebarStyles';

const Sidebar = ({ isCollapsed }) => {
  const { getCurrentTheme } = useTheme();
  const theme = getCurrentTheme();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  // Define isRTL function
  const isRTL = (language) => ['ar'].includes(language);

  const anchor = isRTL(i18n.language) ? 'right' : 'left';

  const navigation = [
    { name: 'dashboard', icon: LayoutDashboardIcon, href: '/dashboard' },
    { name: 'students', icon: UsersIcon, href: '/students' },
    { name: 'staff', icon: UserCheckIcon, href: '/staff' },
    { name: 'courses', icon: BookOpenIcon, href: '/courses' },
    { name: 'classes', icon: GraduationCapIcon, href: '/classes' },
    { name: 'schedule', icon: CalendarIcon, href: '/schedule' },
    { name: 'reports', icon: BarChart3Icon, href: '/reports' },
    { name: 'settings', icon: SettingsIcon, href: '/settings' },
  ];

  return (
    <StyledDrawer
      variant="permanent"
      isCollapsed={isCollapsed}
      anchor={anchor}
    >
      <Toolbar sx={{ px: 3, py: 2, minHeight: '80px !important' }}>
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
              <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.primary, lineHeight: 1.2 }}>
                {t('eduPanel')}
              </Typography>
              <Typography variant="caption" sx={{ color: theme.palette.sidebarText, fontWeight: 500 }}>
                {t('schoolManagementSystem')}
              </Typography>
            </Box>
          )}
        </Box>
      </Toolbar>

      <Divider sx={{ mx: 2, backgroundColor: theme.palette.divider }} />

      <Box sx={{ py: 2 }}>
        <List sx={{ px: 1 }}>
          {navigation.map((item) => (
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
                      fontWeight: location.pathname === item.href ? 600 : 500,
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