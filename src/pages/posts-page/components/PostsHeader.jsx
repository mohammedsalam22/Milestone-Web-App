import React from 'react';
import {
  Box,
  Typography,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const PostsHeader = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        py: 4,
        px: 2,
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: theme.palette.text.primary,
          mb: 1,
        }}
      >
        {t('posts')}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: theme.palette.text.secondary,
          maxWidth: 600,
          mx: 'auto',
          lineHeight: 1.6,
        }}
      >
        {t('postsDescription')}
      </Typography>
    </Box>
  );
};

export default PostsHeader; 