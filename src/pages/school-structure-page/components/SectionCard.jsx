import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Chip,
  IconButton,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { Grow } from '@mui/material';

const SectionCard = ({ section, onEdit, onDelete, getSectionIcon }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Grow in={true} timeout={500}>
      <Card sx={{ 
        borderRadius: 3,
        border: theme.palette.mode === 'dark' 
          ? '1px solid #555' 
          : '1px solid #e0e0e0',
        '&:hover': { 
          transform: 'translateY(-4px)', 
          boxShadow: theme.shadows[8],
          border: theme.palette.mode === 'dark'
            ? '1px solid #9c27b0'
            : '1px solid #9c27b0'
        },
        transition: 'all 0.3s ease'
      }}>
        <CardContent sx={{ pb: 1, p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Box sx={{ mr: 1.5 }}>
              {getSectionIcon(section.name)}
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" sx={{ 
                fontWeight: 600,
                color: 'text.primary',
                mb: 0.5
              }}>
                {section.name}
              </Typography>
              <Typography variant="body2" sx={{ 
                color: 'text.secondary',
                fontWeight: 500
              }}>
                {t('section')} #{section.id}
              </Typography>
            </Box>
            <Chip 
              label={`#${section.id}`} 
              size="small" 
              sx={{ 
                background: theme.palette.secondary.light,
                color: theme.palette.secondary.contrastText,
                fontWeight: 600
              }} 
            />
          </Box>
        </CardContent>
        <CardActions sx={{ 
          pt: 0, 
          pb: 1,
          px: 2,
          justifyContent: 'flex-end',
          gap: 1
        }}>
          <IconButton
            size="small"
            onClick={() => onEdit(section)}
            sx={{
              color: theme.palette.warning.main,
              '&:hover': {
                background: theme.palette.warning.light,
                transform: 'scale(1.1)'
              },
              transition: 'all 0.2s ease'
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => onDelete(section.id)}
            sx={{
              color: theme.palette.error.main,
              '&:hover': {
                background: theme.palette.error.light,
                transform: 'scale(1.1)'
              },
              transition: 'all 0.2s ease'
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </CardActions>
      </Card>
    </Grow>
  );
};

export default SectionCard; 