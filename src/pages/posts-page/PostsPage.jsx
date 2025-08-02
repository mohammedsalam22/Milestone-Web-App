import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../featuers/posts-slice/postsSlice';
import PostCard from './components/PostCard';
import CreatePostDialog from './components/CreatePostDialog';
import PostsHeader from './components/PostsHeader';
import EmptyState from './components/EmptyState';
import {
  Box,
  Container,
  CircularProgress,
  Fab,
  useMediaQuery,
  useTheme,
  Paper,
  Typography,
  Button,
  Divider
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const PostsPage = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleCreatePost = () => {
    setOpenCreateDialog(true);
  };

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error" variant="h6">
          {t('errorLoadingPosts')}
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => dispatch(fetchPosts())}
          sx={{ mt: 2 }}
        >
          {t('retry')}
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <PostsHeader />
      
      <Container maxWidth="md" sx={{ py: 3 }}>
        {/* Create Post Section */}
        <Paper 
          elevation={1} 
          sx={{ 
            p: 3, 
            mb: 3, 
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                bgcolor: theme.palette.primary.main,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2
              }}
            >
              <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                {posts.length > 0 ? posts[0]?.user?.name?.charAt(0)?.toUpperCase() : 'U'}
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
              {t('whatsOnYourMind')}
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Button
            variant="outlined"
            fullWidth
            onClick={handleCreatePost}
            sx={{ 
              justifyContent: 'flex-start',
              textTransform: 'none',
              color: theme.palette.text.secondary,
              borderColor: theme.palette.divider,
              '&:hover': {
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main
              }
            }}
          >
            {t('createPost')}
          </Button>
        </Paper>

        {/* Posts Feed */}
        {posts.length === 0 ? (
          <EmptyState />
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </Box>
        )}
      </Container>

      {/* Mobile Create Button */}
      {isMobile && (
        <Fab
          color="primary"
          aria-label="create post"
          onClick={handleCreatePost}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 1000,
          }}
        >
          <AddIcon />
        </Fab>
      )}

      <CreatePostDialog 
        open={openCreateDialog} 
        onClose={handleCloseCreateDialog}
        onSuccess={handleCloseCreateDialog}
      />
    </Box>
  );
};

export default PostsPage; 