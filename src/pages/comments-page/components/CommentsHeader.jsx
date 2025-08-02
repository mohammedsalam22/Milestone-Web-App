import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Paper,
  Chip,
  useTheme,
} from '@mui/material';
import {
  Comment as CommentIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';

const CommentsHeader = ({ commentsCount }) => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isRTL = i18n.language === 'ar';

  return (
    <Paper
      elevation={0}
      sx={{
        background: theme.palette.secondary.main,
        borderRadius: 0,
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Box
        sx={{
          p: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Left side - Title and stats */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.3)',
            }}
          >
            <CommentIcon sx={{ fontSize: 32, color: 'white' }} />
          </Box>
          
          <Box>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 700,
                color: 'white',
                mb: 1,
                ...(isRTL && { textAlign: 'right' }),
              }}
            >
              {t('comments')}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                opacity: 0.9,
                color: 'white',
                ...(isRTL && { textAlign: 'right' }),
              }}
            >
              {t('manageAndViewComments')}
            </Typography>
          </Box>
        </Box>

        {/* Right side - Stats */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip
            icon={<TrendingUpIcon />}
            label={`${commentsCount} ${t('comments')}`}
            sx={{
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'white',
              fontWeight: 600,
              '& .MuiChip-icon': {
                color: 'white',
              },
            }}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default CommentsHeader; 