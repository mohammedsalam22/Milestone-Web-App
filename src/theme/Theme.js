import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Common color palette
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
};

const darkPaletteValues = {
    background: {
        default: '#2a2a2a', // Slightly lighter background
        paper: '#333333', // Slightly lighter paper
    },
    text: {
        primary: '#FFFFFF', // Pure white for primary text
        secondary: '#B0BEC5', // A lighter grey for secondary text
    },
    divider: '#555555', // A bit lighter divider
    sidebarBg: '#333333', // Consistent with the paper color
    sidebarText: '#B0BEC5', // Lighter text for the sidebar
    iconColor: '#FFFFFF', // All icons in dark mode will be white
    paperBorderRadius: 12, // Paper and card border radius
    action: {
        hover: 'rgba(255, 255, 255, 0.08)', // Slightly visible hover effect
    },
};

// Typography settings
const typography = {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
        fontWeight: 700,
    },
    h5: {
        fontWeight: 600,
    },
    h6: {
        fontWeight: 600,
    },
};

// Shape and shadows
const shape = {
    borderRadius: 12,
};

const shadows = [
    'none',
    '0px 2px 4px rgba(0,0,0,0.05)',
    '0px 4px 8px rgba(0,0,0,0.08)',
    '0px 8px 16px rgba(0,0,0,0.1)',
    '0px 12px 24px rgba(0,0,0,0.12)',
];

// Base theme configuration
const createBaseTheme = (paletteValues) => {
    return createTheme({
        palette: {
            ...commonPalette,
            ...paletteValues,
        },
        typography,
        shape,
        shadows,
    });
};

// Function to generate theme based on mode
export const getTheme = (mode) => {
    const paletteValues = mode === 'dark' ? darkPaletteValues : lightPaletteValues;
    let theme = createBaseTheme(paletteValues);

    theme.components = {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: ({ ownerState }) => ({
                    ...(ownerState.elevation === 2 && {
                        border: `1px solid ${theme.palette.divider}`,
                    }),
                }),
            },
        },
    };

    return responsiveFontSizes(theme);
};