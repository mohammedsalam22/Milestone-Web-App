import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { useTheme } from '../../../theme/ThemeProvider';
import { useTranslation } from 'react-i18next';

const ProgramCard = ({ program, onEdit, onDelete, deleteLoading }) => {
  const { getCurrentTheme } = useTheme();
  const theme = getCurrentTheme();
  const { t } = useTranslation();

  const [isFlipped, setIsFlipped] = useState(false);
  const hasDetails = program.details && program.details.trim() !== '';

  const handleCardFlip = () => {
    if (hasDetails) {
      setIsFlipped(!isFlipped);
    }
  };

  const getImageUrl = (imagePath) => {
    return `http://127.0.0.1:8000/storage/${imagePath}`;
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform 0.6s',
        transformStyle: 'preserve-3d',
        cursor: hasDetails ? 'pointer' : 'default',
        '&:hover': {
          transform: hasDetails ? 'scale(1.02)' : 'none',
          boxShadow: theme.palette.mode === 'dark' ? 8 : 4,
        },
      }}
      onClick={handleCardFlip}
    >
      {/* Front of card */}
      <Box
        sx={{
          position: 'relative',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.6s',
          backfaceVisibility: 'hidden',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={getImageUrl(program.image)}
          alt={program.title}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography gutterBottom variant="h6" component="h3" sx={{ fontWeight: 600 }}>
            {program.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1, mb: 2 }}>
            {program.description}
          </Typography>
          {hasDetails && (
            <Chip
              icon={<VisibilityIcon />}
              label={t('viewDetails')}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ alignSelf: 'flex-start' }}
            />
          )}
        </CardContent>
        <CardActions sx={{ justifyContent: 'space-between', p: 2, pt: 0 }}>
          <Box>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(program);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(program);
              }}
              disabled={deleteLoading}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </CardActions>
      </Box>

      {/* Back of card (details) */}
      {hasDetails && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(-180deg)',
            transition: 'transform 0.6s',
            backfaceVisibility: 'hidden',
            backgroundColor: theme.palette.background.paper,
            display: 'flex',
            flexDirection: 'column',
            p: 2,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
              {t('programDetails')}
            </Typography>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(false);
              }}
            >
              <VisibilityOffIcon />
            </IconButton>
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              flexGrow: 1,
              lineHeight: 1.6,
              overflow: 'auto',
            }}
          >
            {program.details}
          </Typography>
        </Box>
      )}
    </Card>
  );
};

export default ProgramCard; 