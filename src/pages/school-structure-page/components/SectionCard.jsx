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
      <Card
        sx={{
          borderRadius: 3,
          border: `1px solid ${theme.palette.mode === 'dark' ? '#555' : '#e0e0e0'}`,
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme.shadows[8],
            border: `1px solid ${theme.palette.primary.main}`,
          },
          backgroundColor: theme.palette.background.paper,
          padding: 2, // Add some padding around the card content
        }}
      >
        <CardContent sx={{ paddingBottom: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Box sx={{ mr: 1.5 }}>{getSectionIcon(section.name)}</Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
                  mb: 0.5, // Reduced margin for closer grouping
                }}
              >
                {section.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  mb: 1,
                }}
              >
                {`${t('limit')}: ${section.limit}`}
              </Typography>
            </Box>
            <Chip
              label={`#${section.id}`}
              size="small"
              sx={{
                background: theme.palette.secondary.main,
                color: theme.palette.secondary.contrastText,
                fontWeight: 600,
              }}
            />
          </Box>
        </CardContent>
        <CardActions
          sx={{
            justifyContent: 'space-between',  // Spread buttons evenly
            gap: 1,
            paddingX: 2,
            paddingBottom: 1,
          }}
        >
          <IconButton
            size="small"
            onClick={() => onEdit(section)}
            aria-label={t('edit')}
            sx={{
              color: theme.palette.warning.main,
              '&:hover': {
                background: theme.palette.warning.light,
                transform: 'scale(1.1)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => onDelete(section.id)}
            aria-label={t('delete')}
            sx={{
              color: theme.palette.error.main,
              '&:hover': {
                background: theme.palette.error.light,
                transform: 'scale(1.1)',
              },
              transition: 'all 0.2s ease',
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