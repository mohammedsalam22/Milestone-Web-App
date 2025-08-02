import React from 'react';
import {
    Toolbar,
    Typography,
    Box,
    MenuItem,
    Menu,
    Avatar,
    Badge,
    Switch,
    FormControlLabel,
    Select,
} from '@mui/material';
import {
    Notifications as NotificationsIcon,
    AccountCircle as AccountCircleIcon,
    Menu as MenuIcon,
    Settings as SettingsIcon,
    ExitToApp as LogoutIcon,
    Brightness4 as Brightness4Icon,
    Brightness7 as Brightness7Icon,
} from '@mui/icons-material';
import { useTheme } from '../../../theme/ThemeProvider';
import { useTranslation } from 'react-i18next';
import { StyledAppBar, StyledIconButton } from '../../../styles/NavbarStyles'; // Import styled components
import ThemeSwitcher from '../../../components/ThemeSwitcher';

const Navbar = ({ onToggleSidebar, isSidebarCollapsed }) => {
    const { currentMode, currentThemeName, switchMode, switchTheme, getCurrentTheme } = useTheme();
    const theme = getCurrentTheme();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [notificationAnchor, setNotificationAnchor] = React.useState(null);
    const [themeSwitcherOpen, setThemeSwitcherOpen] = React.useState(false);
    const isMenuOpen = Boolean(anchorEl);
    const isNotificationOpen = Boolean(notificationAnchor);
    const { t, i18n } = useTranslation();

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleNotificationOpen = (event) => {
        setNotificationAnchor(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setNotificationAnchor(null);
    };

    const handleThemeToggle = () => {
        switchMode(currentMode === 'light' ? 'dark' : 'light');
    };

    const changeLanguage = (event) => {
        i18n.changeLanguage(event.target.value);
    };

    const menuId = 'primary-search-account-menu';
    const notificationId = 'notification-menu';

  const isRTL = (language) => ['en'].includes(language);

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            PaperProps={{
                elevation: 3,
                sx: {
                    mt: 1,
                    borderRadius: 2,
                    minWidth: 200,
                    backgroundColor: theme.palette.mode === 'dark' 
                      ? theme.palette.background.default 
                      : theme.palette.background.paper,
                    '& .MuiMenuItem-root': {
                        px: 2,
                        py: 1.5,
                        borderRadius: 1,
                        mx: 1,
                        my: 0.5,
                        '&:hover': {
                            backgroundColor: theme.palette.mode === 'dark'
                              ? 'rgba(255, 255, 255, 0.08)'
                              : 'rgba(0, 0, 0, 0.04)',
                        },
                        ...(isRTL(i18n.language) && { 
                            textAlign: 'right',
                        }),
                    },
                },
            }}
        >
            <MenuItem onClick={handleMenuClose} sx={{ textAlign: isRTL(i18n.language) ? 'right' : 'left' }}>
                <AccountCircleIcon sx={{ 
                    mr: 2, 
                    color: theme.palette.text.secondary, 
                    ...(isRTL(i18n.language) && { ml: 2, mr: 0 }) 
                }} />
                {t('profile')}
            </MenuItem>
            <MenuItem onClick={() => { handleMenuClose(); setThemeSwitcherOpen(true); }} sx={{ textAlign: isRTL(i18n.language) ? 'right' : 'left' }}>
                <SettingsIcon sx={{ 
                    mr: 2, 
                    color: theme.palette.text.secondary, 
                    ...(isRTL(i18n.language) && { ml: 2, mr: 0 }) 
                }} />
                {t('themeSettings')}
            </MenuItem>
            <MenuItem onClick={handleMenuClose} sx={{ textAlign: isRTL(i18n.language) ? 'right' : 'left' }}>
                <LogoutIcon sx={{ 
                    mr: 2, 
                    color: theme.palette.text.secondary, 
                    ...(isRTL(i18n.language) && { ml: 2, mr: 0 }) 
                }} />
                {t('logout')}
            </MenuItem>
        </Menu>
    );

    const renderNotificationMenu = (
        <Menu
            anchorEl={notificationAnchor}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            id={notificationId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isNotificationOpen}
            onClose={handleMenuClose}
            PaperProps={{
                elevation: 3,
                sx: {
                    mt: 1,
                    borderRadius: 2,
                    minWidth: 300,
                    maxHeight: 400,
                    backgroundColor: theme.palette.mode === 'dark' 
                      ? theme.palette.background.default 
                      : theme.palette.background.paper,
                    ...(isRTL(i18n.language) && { 
                        textAlign: 'right',
                    }),
                },
            }}
        >
            <Box sx={{ 
                p: 2, 
                borderBottom: `1px solid ${theme.palette.divider}`, 
                ...(isRTL(i18n.language) && { textAlign: 'right' }) 
            }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {t('notifications')}
                </Typography>
            </Box>
            <MenuItem onClick={handleMenuClose} sx={{ textAlign: isRTL(i18n.language) ? 'right' : 'left' }}>
                <Box sx={{ width: '100%' }}>
                    <Typography variant="subtitle2" sx={{ textAlign: isRTL(i18n.language) ? 'right' : 'left' }}>{t('newStudentEnrollment')}</Typography>
                    <Typography variant="caption" color="textSecondary" sx={{ textAlign: isRTL(i18n.language) ? 'right' : 'left' }}>
                        {t('sarahJohnsonEnrolled')}
                    </Typography>
                </Box>
            </MenuItem>
            <MenuItem onClick={handleMenuClose} sx={{ textAlign: isRTL(i18n.language) ? 'right' : 'left' }}>
                <Box sx={{ width: '100%' }}>
                    <Typography variant="subtitle2" sx={{ textAlign: isRTL(i18n.language) ? 'right' : 'left' }}>{t('assignmentSubmitted')}</Typography>
                    <Typography variant="caption" color="textSecondary" sx={{ textAlign: isRTL(i18n.language) ? 'right' : 'left' }}>
                        {t('physicsAssignmentByMichael')}
                    </Typography>
                </Box>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <StyledAppBar isSidebarCollapsed={isSidebarCollapsed}>
                <Toolbar sx={{ minHeight: '80px !important', px: 3 }}>
                    <StyledIconButton
                        size="large"
                        edge="start"
                        aria-label="toggle sidebar"
                        onClick={onToggleSidebar}
                         sx={isRTL(i18n.language) ? { mr: 2 } : { ml: 2 }}  
                    >
                        <MenuIcon />
                    </StyledIconButton>

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            fontWeight: 600,
                            color: theme.palette.text.primary,
                        }}
                    >
                        {t('milestoneEducationalInstitute')}
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />

                    {/* Language Switcher */}
                    <Select
                        value={i18n.language}
                        onChange={changeLanguage}
                        sx={{
                            color: theme.palette.text.primary,
                            '& .MuiSvgIcon-root': {
                                color: theme.palette.text.primary,
                            },
                        }}
                        variant="standard"
                    >
                        <MenuItem value="en">English</MenuItem>
                        <MenuItem value="ar">العربية</MenuItem>
                    </Select>

                    {/* Theme Toggle Switch */}
                    <FormControlLabel
                        control={<Switch
                            checked={currentMode === 'dark'}
                            onChange={handleThemeToggle}
                            icon={<Brightness7Icon sx={{ color: theme.palette.text.primary }} />}
                            checkedIcon={<Brightness4Icon sx={{ color: theme.palette.text.primary }} />}
                        />}
                        labelPlacement="start"
                        label={
                            <Typography sx={{ color: theme.palette.text.primary }}>
                                {currentMode === 'light' ? t('light') : t('dark')}
                            </Typography>
                        }
                        sx={{ mr: 2 }}
                    />

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <StyledIconButton
                            size="large"
                            aria-label="show notifications"
                            onClick={handleNotificationOpen}
                        >
                            <Badge badgeContent={3} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </StyledIconButton>

                        <StyledIconButton
                            size="large"
                            edge="end"
                            aria-label="account menu"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                        >
                            <Avatar
                                sx={{
                                    width: 36,
                                    height: 36,
                                    backgroundColor: theme.palette.primary.main,
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                }}
                            >
                                A
                            </Avatar>
                        </StyledIconButton>
                    </Box>
                </Toolbar>
            </StyledAppBar>
            {renderMenu}
            {renderNotificationMenu}
            <ThemeSwitcher 
                open={themeSwitcherOpen} 
                onClose={() => setThemeSwitcherOpen(false)} 
            />
        </Box>
    );
};

export default Navbar;