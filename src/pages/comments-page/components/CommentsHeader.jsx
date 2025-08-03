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
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1">
        {t('comments')}
      </Typography>
    </Box>
  );
};

export default CommentsHeader; 