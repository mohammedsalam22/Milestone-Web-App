// ThemeColors.js
const commonPalette = {
  primary: {
    main: '#1976d2',
    light: '#42a5f5',
    dark: '#1565c0',
  },
  secondary: {
    main: '#dc004e',
  },
  success: {
    main: '#4caf50',
  },
  warning: {
    main: '#f57c00',
  },
  error: {
    main: '#d32f2f',
  },
  info: {
    main: '#0288d1',
  },
};

const lightPaletteValues = {
  background: {
    default: '#f8fafc',
    paper: '#ffffff',
  },
  text: {
    primary: '#1e293b',
    secondary: '#64748b',
  },
  divider: '#e2e8f0',
  appBar: '#ffffff',
  appBarText: '#1e293b',
  sidebarBg: '#ffffff',
  sidebarText: '#64748b',
  sidebarActiveBg: '#e3f2fd',
  sidebarActiveText: '#1976d2',
};

const darkPaletteValues = {
  background: {
    default: '#121212',
    paper: '#1e1e1e',
  },
  text: {
    primary: '#e0e0e0',
    secondary: '#9e9e9e',
  },
  divider: '#424242',
  appBar: '#1e1e1e',
  appBarText: '#e0e0e0',
  sidebarBg: '#1e1e1e',
  sidebarText: '#9e9e9e',
  sidebarActiveBg: '#37474f',
  sidebarActiveText: '#90caf9',
};

export const ThemeColors = {
  commonPalette,
  lightPaletteValues,
  darkPaletteValues,
};