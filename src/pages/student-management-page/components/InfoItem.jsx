import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const InfoItem = ({ icon, label, value, iconColor, minWidth = 100, iconSize = 'medium' }) => {
  const theme = useTheme();

  const getIconSize = () => {
    switch (iconSize) {
      case 'small':
        return 16;
      case 'large':
        return 24;
      default:
        return 18;
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      p: 1.5,
      background: theme.palette.background.paper,
      borderRadius: 2,
      border: `1px solid ${theme.palette.divider}`,
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', minWidth }}>
        <Box sx={{ mr: 1, color: iconColor, fontSize: getIconSize() }}>
          {icon}
        </Box>
        <Typography variant="body2" color="text.secondary" fontWeight="600">
          {label}
        </Typography>
      </Box>
      <Typography variant="body1" fontWeight="700" sx={{ ml: 1 }}>
        {value || 'N/A'}
      </Typography>
    </Box>
  );
};

export default InfoItem; 