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
      backgroundColor: theme.palette.mode === 'dark' 
        ? theme.palette.background.default 
        : theme.palette.background.paper,
      ...(anchor === 'left' && { borderRight: `1px solid ${theme.palette.divider}` }),
      ...(anchor === 'right' && { borderLeft: `1px solid ${theme.palette.divider}` }),
      ...(anchor === 'left' && {
        boxShadow: theme.palette.mode === 'dark'
          ? '4px 0 6px -1px rgba(0, 0, 0, 0.3)'
          : '4px 0 6px -1px rgba(0, 0, 0, 0.1)',
      }),
      ...(anchor === 'right' && {
        boxShadow: theme.palette.mode === 'dark'
          ? '-4px 0 6px -1px rgba(0, 0, 0, 0.3)'
          : '-4px 0 6px -1px rgba(0, 0, 0, 0.1)',
      }),
      // Custom scrollbar styling
      '&::-webkit-scrollbar': {
        width: '6px',
      },
      '&::-webkit-scrollbar-track': {
        background: 'transparent',
      },
      '&::-webkit-scrollbar-thumb': {
        background: theme.palette.mode === 'dark' 
          ? 'rgba(255, 255, 255, 0.2)' 
          : 'rgba(0, 0, 0, 0.2)',
        borderRadius: '3px',
        '&:hover': {
          background: theme.palette.mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.3)' 
            : 'rgba(0, 0, 0, 0.3)',
        },
      },
      // Firefox scrollbar styling
      scrollbarWidth: 'thin',
      scrollbarColor: theme.palette.mode === 'dark' 
        ? 'rgba(255, 255, 255, 0.2) transparent' 
        : 'rgba(0, 0, 0, 0.2) transparent',
    },
  })
);

export const StyledListItemButton = styled(ListItemButton, { shouldForwardProp: (prop) => prop !== 'active' })(
  ({ theme, active }) => ({
    borderRadius: '12px',
    margin: '2px 12px',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: 'transparent !important',
    border: 'none',
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: 'transparent !important',
      transform: 'none',
    },
    '&:focus': {
      backgroundColor: 'transparent !important',
    },
    '&:active': {
      backgroundColor: 'transparent !important',
    },
    '& .MuiListItemIcon-root': {
      color: theme.palette.text.primary,
    },
    '& .MuiListItemText-primary': {
      color: theme.palette.text.primary,
    },
    // First item styling - reduced top margin
    '&:first-of-type': {
      marginTop: '0px',
    },
    ...(active === true && {
      backgroundColor: `${theme.palette.primary.main}20 !important`,
      color: theme.palette.text.primary,
      fontWeight: 600,
      border: `1px solid ${theme.palette.primary.main}`,
      '&:hover': {
        backgroundColor: `${theme.palette.primary.main}30 !important`,
      },
      '& .MuiListItemIcon-root': {
        color: theme.palette.text.primary,
      },
      '& .MuiListItemText-primary': {
        color: theme.palette.text.primary,
      },
    }),
  })
);

export const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: 40,
  color: 'inherit',
}));