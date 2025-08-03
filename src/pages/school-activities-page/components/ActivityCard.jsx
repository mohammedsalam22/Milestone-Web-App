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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  PlayArrow as PlayArrowIcon,
  VideoLibrary as VideoLibraryIcon,
} from '@mui/icons-material';
import { useTheme } from '../../../theme/ThemeProvider';
import { useTranslation } from 'react-i18next';

const ActivityCard = ({ activity, onEdit, onDelete, deleteLoading }) => {
  const { getCurrentTheme } = useTheme();
  const theme = getCurrentTheme();
  const { t } = useTranslation();

  const [isFlipped, setIsFlipped] = useState(false);
  const hasDetails = activity.details && activity.details.trim() !== '';
  const hasVideos = activity.videos && activity.videos.length > 0;
  const hasContent = hasDetails || hasVideos;

  const handleCardFlip = () => {
    if (hasContent) {
      setIsFlipped(!isFlipped);
    }
  };

  const getImageUrl = (imagePath) => {
    return `http://127.0.0.1:8000/storage/${imagePath}`;
  };

  const getVideoUrl = (videoPath) => {
    return `http://127.0.0.1:8000/storage/${videoPath}`;
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
        cursor: hasContent ? 'pointer' : 'default',
        '&:hover': {
          transform: hasContent ? 'scale(1.02)' : 'none',
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
          image={getImageUrl(activity.image)}
          alt={activity.title}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography gutterBottom variant="h6" component="h3" sx={{ fontWeight: 600 }}>
            {activity.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1, mb: 2 }}>
            {activity.description}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
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
            {hasVideos && (
              <Chip
                icon={<VideoLibraryIcon />}
                label={`${activity.videos.length} ${t('videoFiles')}`}
                size="small"
                color="secondary"
                variant="outlined"
                sx={{ alignSelf: 'flex-start' }}
              />
            )}
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: 'space-between', p: 2, pt: 0 }}>
          <Box>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(activity);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(activity);
              }}
              disabled={deleteLoading}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </CardActions>
      </Box>

      {/* Back of card (details and videos) */}
      {hasContent && (
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
            overflow: 'auto',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
              {t('activityDetails')}
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
          
          {hasDetails && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: hasVideos ? 2 : 0,
                lineHeight: 1.6,
              }}
            >
              {activity.details}
            </Typography>
          )}
          
          {hasVideos && (
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: theme.palette.text.primary }}>
                {t('activityVideos')}:
              </Typography>
              <List dense sx={{ p: 0 }}>
                {activity.videos.map((video, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      p: 1,
                      borderRadius: 1,
                      backgroundColor: theme.palette.action.hover,
                      mb: 1,
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <PlayArrowIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${t('videoFiles')} ${index + 1}`}
                      secondary={video}
                      primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Box>
      )}
    </Card>
  );
};

export default ActivityCard; 