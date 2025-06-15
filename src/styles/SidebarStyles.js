// Sidebar.styles.js
import { Drawer, ListItemButton, ListItemIcon } from '@mui/material';
import { styled } from '@mui/material/styles';

const drawerWidth = 280;

export const StyledDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'isCollapsed' })(
  ({ theme, isCollapsed, anchor }) => ({
    width: isCollapsed ? 80 : drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    position: 'fixed',
    top: 0,
    ...(anchor === 'left' && { left: 0 }),
    ...(anchor === 'right' && { right: 0 }),
    height: '100vh',
    zIndex: theme.zIndex.drawer + 1,
    '& .MuiDrawer-paper': {
      width: isCollapsed ? 95 : drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      overflowY: 'auto',
      backgroundColor: theme.palette.background.paper,
      borderRight: `1px solid ${theme.palette.divider}`,
      boxShadow: '4px 0 6px -1px rgba(0, 0, 0, 0.1)',
    },
  })
);

export const StyledListItemButton = styled(ListItemButton)(({ theme, active }) => ({
  borderRadius: '12px',
  margin: '4px 12px',
  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 12,
  paddingBottom: 12,
  '&:hover': {
    backgroundColor: '#f1f5f9',
    transform: 'translateX(4px)',
    transition: 'all 0.2s ease',
  },
  ...(active && {
    backgroundColor: '#e3f2fd',
    color: theme.palette.primary.main,
    fontWeight: 600,
    '&:hover': {
      backgroundColor: '#e3f2fd',
    },
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.main,
    },
  }),
}));

export const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: 40,
  color: theme.palette.sidebarText,
}));