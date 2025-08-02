import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  useTheme as useMuiTheme,
} from '@mui/material';
import { useTheme } from '../theme/ThemeProvider';
import { useTranslation } from 'react-i18next';

const ThemeSwitcher = ({ open, onClose }) => {
  const { t, i18n } = useTranslation();
  const { 
    currentMode, 
    currentThemeName, 
    switchMode, 
    switchTheme, 
    availableModes, 
    availableThemes 
  } = useTheme();
  const muiTheme = useMuiTheme();
  const isRTL = i18n.language === 'ar';

  const handleThemeChange = (themeId) => {
    switchTheme(themeId);
  };

  const handleModeChange = (mode) => {
    switchMode(mode);
  };

  const getThemePreview = (themeId, mode) => {
    const theme = availableThemes.find(t => t.id === themeId);
    if (!theme) return null;

    const colors = {
      default: {
        light: { primary: '#1976d2', secondary: '#dc004e' },
        dark: { primary: '#42a5f5', secondary: '#f48fb1' }
      },
      professional: {
        light: { primary: '#1e3a8a', secondary: '#6b7280' },
        dark: { primary: '#3b82f6', secondary: '#9ca3af' }
      }
    };

    return colors[themeId]?.[mode] || colors.default[mode];
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        }
      }}
    >
      <DialogTitle sx={{ 
        textAlign: isRTL ? 'right' : 'left',
        borderBottom: `1px solid ${muiTheme.palette.divider}`,
        pb: 2
      }}>
        {t('themeSettings')}
      </DialogTitle>
      
      <DialogContent sx={{ pt: 3 }}>
        <Grid container spacing={3}>
          {/* Theme Selection */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, textAlign: isRTL ? 'right' : 'left' }}>
              {t('colorTheme')}
            </Typography>
            <Grid container spacing={2}>
              {availableThemes.map((theme) => {
                const preview = getThemePreview(theme.id, currentMode);
                const isSelected = currentThemeName === theme.id;
                
                return (
                  <Grid item xs={12} sm={6} key={theme.id}>
                    <Card
                      onClick={() => handleThemeChange(theme.id)}
                      sx={{
                        cursor: 'pointer',
                        border: isSelected ? `2px solid ${muiTheme.palette.primary.main}` : `1px solid ${muiTheme.palette.divider}`,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: muiTheme.shadows[4],
                        },
                        ...(isSelected && {
                          backgroundColor: muiTheme.palette.primary.light + '10',
                        }),
                      }}
                    >
                      <CardContent sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, flexGrow: 1 }}>
                            {theme.name}
                          </Typography>
                          {isSelected && (
                            <Chip 
                              label={t('selected')} 
                              size="small" 
                              color="primary" 
                              variant="outlined"
                            />
                          )}
                        </Box>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                          {theme.description}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Box
                            sx={{
                              width: 24,
                              height: 24,
                              borderRadius: 1,
                              backgroundColor: preview?.primary,
                              border: `1px solid ${muiTheme.palette.divider}`,
                            }}
                          />
                          <Box
                            sx={{
                              width: 24,
                              height: 24,
                              borderRadius: 1,
                              backgroundColor: preview?.secondary,
                              border: `1px solid ${muiTheme.palette.divider}`,
                            }}
                          />
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>

          {/* Mode Selection */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, textAlign: isRTL ? 'right' : 'left' }}>
              {t('displayMode')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {availableModes.map((mode) => {
                const isSelected = currentMode === mode;
                
                return (
                  <Card
                    key={mode}
                    onClick={() => handleModeChange(mode)}
                    sx={{
                      cursor: 'pointer',
                      border: isSelected ? `2px solid ${muiTheme.palette.primary.main}` : `1px solid ${muiTheme.palette.divider}`,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: muiTheme.shadows[4],
                      },
                      ...(isSelected && {
                        backgroundColor: muiTheme.palette.primary.light + '10',
                      }),
                    }}
                  >
                    <CardContent sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                        {t(mode)}
                      </Typography>
                      <Box
                        sx={{
                          width: 40,
                          height: 24,
                          borderRadius: 1,
                          backgroundColor: mode === 'light' ? '#f8fafc' : '#1f2937',
                          border: `1px solid ${muiTheme.palette.divider}`,
                          mx: 'auto',
                        }}
                      />
                    </CardContent>
                  </Card>
                );
              })}
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button onClick={onClose} variant="outlined">
          {t('close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ThemeSwitcher; 