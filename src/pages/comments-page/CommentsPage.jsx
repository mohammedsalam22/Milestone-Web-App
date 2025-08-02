import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Container,
  Grid,
  CircularProgress,
  Alert,
  useTheme,
} from '@mui/material';
import { fetchPosts } from '../../featuers/posts-slice/postsSlice';
import CommentsHeader from './components/CommentsHeader';
import CommentCard from './components/CommentCard';

const CommentsPage = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isRTL = i18n.language === 'ar';

  // Redux selectors
  const { posts, loading, error } = useSelector((state) => state.posts);

  // Local state
  const [selectedPost, setSelectedPost] = useState(null);

  // Fetch posts on component mount
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  // Get all comments from all posts
  const getAllComments = () => {
    const allComments = [];
    posts.forEach(post => {
      post.comments.forEach(comment => {
        allComments.push({
          ...comment,
          postId: post.id,
          postTitle: post.title,
        });
      });
    });
    return allComments;
  };

  const allComments = getAllComments();

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: theme.palette.background.default,
      pb: 4
    }}>
      {/* Header */}
      <CommentsHeader commentsCount={allComments.length} />

      <Container maxWidth="lg" sx={{ mt: 3 }}>
        {/* Error Display */}
        {error && (
          <Alert 
            severity="error" 
            sx={{ mb: 3 }}
            onClose={() => dispatch({ type: 'posts/clearError' })}
          >
            {error}
          </Alert>
        )}

        {/* Loading State */}
        {loading && (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
            <CircularProgress size={60} />
          </Box>
        )}

        {/* Comments Grid */}
        {!loading && allComments.length > 0 && (
          <Grid container spacing={3}>
            {allComments.map((comment) => (
              <Grid item xs={12} md={6} lg={4} key={`${comment.postId}-${comment.id}`}>
                <CommentCard comment={comment} />
              </Grid>
            ))}
          </Grid>
        )}

        {/* Empty State */}
        {!loading && allComments.length === 0 && !error && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              py: 8,
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary', mb: 2 }}>
              {t('noCommentsYet')}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {t('commentsWillAppearHere')}
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default CommentsPage; 