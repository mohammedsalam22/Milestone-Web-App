import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Theme configurations
const themeConfigs = {
    default: {
        name: 'Default',
        description: 'Original theme with blue and red accents',
        commonPalette: {
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
        },
    },
    professional: {
        name: 'Professional',
        description: 'Serious and professional blue & gray palette',
        commonPalette: {
            primary: {
                main: '#1e3a8a', // Deep Navy Blue
                light: '#3b82f6', // Light Blue
                dark: '#1e40af', // Darker Blue
            },
            secondary: {
                main: '#6b7280', // Warm Gray
                light: '#9ca3af',
                dark: '#4b5563',
            },
            success: {
                main: '#059669', // Professional Green
            },
            warning: {
                main: '#d97706', // Professional Orange
            },
            error: {
                main: '#dc2626', // Professional Red
            },
            info: {
                main: '#0891b2', // Professional Cyan
            },
        },
    },
};

// Light mode palette values for different themes
const lightPaletteValues = {
    default: {
        background: {
            default: '#f8fafc',
            paper: '#ffffff',
        },
        text: {
            primary: '#1e293b',
            secondary: '#64748b',
        },
        divider: '#e2e8f0',
    },
    professional: {
        background: {
            default: '#f8fafc', // Clean off-white
            paper: '#ffffff',
        },
        text: {
            primary: '#1f2937', // Dark gray for excellent readability
            secondary: '#6b7280', // Warm gray
        },
        divider: '#e5e7eb',
    },
};

// Dark mode palette values for different themes
const darkPaletteValues = {
    default: {
        background: {
            default: '#2a2a2a',
            paper: '#333333',
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#B0BEC5',
        },
        divider: '#555555',
        sidebarBg: '#333333',
        sidebarText: '#B0BEC5',
        iconColor: '#FFFFFF',
        paperBorderRadius: 12,
        action: {
            hover: 'rgba(255, 255, 255, 0.08)',
        },
    },
    professional: {
        background: {
            default: '#111827', // Dark charcoal
            paper: '#1f2937', // Slightly lighter charcoal
        },
        text: {
            primary: '#f9fafb', // Light gray
            secondary: '#d1d5db', // Medium gray
        },
        divider: '#374151',
        sidebarBg: '#1f2937',
        sidebarText: '#d1d5db',
        iconColor: '#f9fafb',
        paperBorderRadius: 12,
        action: {
            hover: 'rgba(255, 255, 255, 0.08)',
        },
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
    '0px 16px 32px rgba(0,0,0,0.14)',
    '0px 20px 40px rgba(0,0,0,0.16)',
    '0px 24px 48px rgba(0,0,0,0.18)',
    '0px 28px 56px rgba(0,0,0,0.20)',
    '0px 32px 64px rgba(0,0,0,0.22)',
    '0px 36px 72px rgba(0,0,0,0.24)',
    '0px 40px 80px rgba(0,0,0,0.26)',
    '0px 44px 88px rgba(0,0,0,0.28)',
    '0px 48px 96px rgba(0,0,0,0.30)',
    '0px 52px 104px rgba(0,0,0,0.32)',
    '0px 56px 112px rgba(0,0,0,0.34)',
    '0px 60px 120px rgba(0,0,0,0.36)',
    '0px 64px 128px rgba(0,0,0,0.38)',
    '0px 68px 136px rgba(0,0,0,0.40)',
    '0px 72px 144px rgba(0,0,0,0.42)',
    '0px 76px 152px rgba(0,0,0,0.44)',
    '0px 80px 160px rgba(0,0,0,0.46)',
    '0px 84px 168px rgba(0,0,0,0.48)',
    '0px 88px 176px rgba(0,0,0,0.50)',
    '0px 92px 184px rgba(0,0,0,0.52)',
    '0px 96px 192px rgba(0,0,0,0.54)',
    '0px 100px 200px rgba(0,0,0,0.56)',
    '0px 104px 208px rgba(0,0,0,0.58)',
    '0px 108px 216px rgba(0,0,0,0.60)',
    '0px 112px 224px rgba(0,0,0,0.62)',
    '0px 116px 232px rgba(0,0,0,0.64)',
    '0px 120px 240px rgba(0,0,0,0.66)',
    '0px 124px 248px rgba(0,0,0,0.68)',
    '0px 128px 256px rgba(0,0,0,0.70)',
];

// Base theme configuration
const createBaseTheme = (themeConfig, paletteValues) => {
    return createTheme({
        palette: {
            ...themeConfig.commonPalette,
            ...paletteValues,
        },
        typography,
        shape,
        shadows,
    });
};

// Function to generate theme based on mode and theme name
export const getTheme = (mode, themeName = 'default') => {
    const themeConfig = themeConfigs[themeName] || themeConfigs.default;
    const paletteValues = mode === 'dark' 
        ? darkPaletteValues[themeName] || darkPaletteValues.default
        : lightPaletteValues[themeName] || lightPaletteValues.default;
    
    let theme = createBaseTheme(themeConfig, paletteValues);

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

// Export available themes
export const getAvailableThemes = () => {
    return Object.keys(themeConfigs).map(key => ({
        id: key,
        ...themeConfigs[key]
    }));
};