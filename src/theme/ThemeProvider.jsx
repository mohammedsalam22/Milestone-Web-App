import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { getTheme } from './Theme'; // Import the theme function

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const AppThemeProvider = ({ children }) => {
    const [currentThemeName, setCurrentThemeName] = useState(() => {
        const storedTheme = localStorage.getItem('theme');
        return storedTheme || 'light'; // Default theme
    });

    useEffect(() => {
        localStorage.setItem('theme', currentThemeName);
    }, [currentThemeName]);

    const switchTheme = (themeName) => {
        setCurrentThemeName(themeName);
    };

    const getCurrentTheme = () => {
        return getTheme(currentThemeName);
    };

    // Available themes
    const availableThemes = ['light', 'dark']; // Define available themes here
    const getAvailableThemes = () => availableThemes; // This function returns the list of available themes

    const value = {
        currentThemeName,
        switchTheme,
        getCurrentTheme,
        getAvailableThemes, // Add this to context
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