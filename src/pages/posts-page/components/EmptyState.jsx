import React from 'react';
import {
  Box,
  Typography,
  Button,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const EmptyState = ({ onCreatePost }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        px: 3,
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          bgcolor: theme.palette.primary.light,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3,
        }}
      >
        <AddIcon sx={{ fontSize: 48, color: theme.palette.primary.main }} />
      </Box>

      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          color: theme.palette.text.primary,
          mb: 2,
        }}
      >
        {t('noPostsYet')}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: theme.palette.text.secondary,
          mb: 4,
          maxWidth: 400,
          lineHeight: 1.6,
        }}
      >
        {t('createYourFirstPost')}
      </Typography>

      <Button
        variant="contained"
        size="large"
        startIcon={<AddIcon />}
        onClick={onCreatePost}
        sx={{
          px: 4,
          py: 1.5,
          borderRadius: 2,
          textTransform: 'none',
          fontSize: '1.1rem',
          fontWeight: 600,
        }}
      >
        {t('createFirstPost')}
      </Button>
    </Box>
  );
};

export default EmptyState; 