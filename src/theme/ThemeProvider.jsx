import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { getTheme, getAvailableThemes } from './Theme'; // Import the theme function

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const AppThemeProvider = ({ children }) => {
    const [currentMode, setCurrentMode] = useState(() => {
        const storedMode = localStorage.getItem('themeMode');
        return storedMode || 'light'; // Default mode
    });

    const [currentThemeName, setCurrentThemeName] = useState(() => {
        const storedTheme = localStorage.getItem('themeName');
        return storedTheme || 'default'; // Default theme
    });

    useEffect(() => {
        localStorage.setItem('themeMode', currentMode);
    }, [currentMode]);

    useEffect(() => {
        localStorage.setItem('themeName', currentThemeName);
    }, [currentThemeName]);

    const switchMode = (mode) => {
        setCurrentMode(mode);
    };

    const switchTheme = (themeName) => {
        setCurrentThemeName(themeName);
    };

    const getCurrentTheme = () => {
        return getTheme(currentMode, currentThemeName);
    };

    // Available modes and themes
    const availableModes = ['light', 'dark'];
    const availableThemes = getAvailableThemes();

    const value = {
        currentMode,
        currentThemeName,
        switchMode,
        switchTheme,
        getCurrentTheme,
        availableModes,
        availableThemes,
    };

    return (
        <ThemeContext.Provider value={value}>
            <MuiThemeProvider theme={getCurrentTheme()}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

export default AppThemeProvider;