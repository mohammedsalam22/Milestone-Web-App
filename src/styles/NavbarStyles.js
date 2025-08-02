// src/styles/Navbar.styles.js
import { AppBar, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledAppBar = styled(AppBar, { shouldForwardProp: (prop) => prop !== 'isSidebarCollapsed' })(({ theme, isSidebarCollapsed }) => ({
    position: 'fixed',
    top: 0,
    width: `calc(100% - ${isSidebarCollapsed ? 80 : 280}px)`,
    zIndex: theme.zIndex.drawer,
    backgroundColor: theme.palette.mode === 'dark' 
      ? theme.palette.background.default 
      : theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: theme.palette.mode === 'dark'
      ? '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)'
      : '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    borderBottom: `1px solid ${theme.palette.divider}`,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    ...(theme.direction === 'ltr' && {
        left: isSidebarCollapsed ? 100 : 290,
        right: isSidebarCollapsed ? 100 : 290,
    }),
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.text.secondary,
    '&:hover': {
        backgroundColor: theme.palette.mode === 'dark'
          ? 'rgba(255, 255, 255, 0.08)'
          : 'rgba(0, 0, 0, 0.04)',
        color: theme.palette.primary.main,
    },
    transition: 'all 0.2s ease',
    ...(theme.direction === 'rtl' && {
        transform: 'rotate(180deg)',
    }),
}));