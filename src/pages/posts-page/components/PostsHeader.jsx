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
      <Typography variant="h4" component="h1">
        {t('posts')}
      </Typography>
    </Box>
  );
};

export default PostsHeader; 