import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Divider,
  useTheme,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Send as SendIcon,
  Reply as ReplyIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { addComment, deleteComment, addReply } from '../../../featuers/posts-slice/postsSlice';

const CommentsSection = ({ post }) => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.login);
  const isRTL = i18n.language === 'ar';

  // Safely get comments array
  const comments = post?.comments || [];

  // Local state
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedComment, setSelectedComment] = useState(null);

  // Handle add comment
  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        await dispatch(addComment({ postId: post.id, text: newComment })).unwrap();
        setNewComment('');
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  // Handle add reply
  const handleAddReply = async (commentId) => {
    if (replyText.trim()) {
      try {
        await dispatch(addReply({ postId: post.id, commentId, text: replyText })).unwrap();
        setReplyText('');
        setReplyingTo(null);
      } catch (error) {
        console.error('Error adding reply:', error);
      }
    }
  };

  // Handle delete comment
  const handleDeleteComment = async (commentId) => {
    try {
      await dispatch(deleteComment({ postId: post.id, commentId })).unwrap();
      setAnchorEl(null);
      setSelectedComment(null);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  // Handle menu open
  const handleMenuOpen = (event, comment) => {
    setAnchorEl(event.currentTarget);
    setSelectedComment(comment);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedComment(null);
  };

  // Check if user can delete comment
  const canDeleteComment = (comment) => {
    return user?.username === comment.user?.username || user?.role === 'admin';
  };

  // Get time ago
  const getTimeAgo = (dateString) => {
    const now = new Date();
    const created = new Date(dateString);
    const diffInSeconds = Math.floor((now - created) / 1000);

    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 2592000) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 31536000) {
      const months = Math.floor(diffInSeconds / 2592000);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(diffInSeconds / 31536000);
      return `${years} year${years > 1 ? 's' : ''} ago`;
    }
  };

  return (
    <Box sx={{ p: 2, background: theme.palette.background.paper }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        {t('comments')} ({comments.length})
      </Typography>

      {/* Add Comment */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Avatar sx={{ width: 40, height: 40, background: theme.palette.primary.main }}>
            U
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <TextField
              fullWidth
              placeholder={t('writeAComment')}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              multiline
              rows={2}
              variant="outlined"
              size="small"
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
              <Button
                variant="contained"
                size="small"
                startIcon={isRTL ? null : <SendIcon />}
                endIcon={isRTL ? <SendIcon /> : null}
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                sx={{
                  ...(isRTL && { flexDirection: 'row-reverse' }),
                }}
              >
                {t('comment')}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Comments List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {comments.map((comment) => (
          <Box key={comment.id}>
            {/* Main Comment */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Avatar sx={{ width: 32, height: 32, background: theme.palette.secondary.main }}>
                {comment.user?.username?.charAt(0).toUpperCase() || 'U'}
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {comment.user?.username || 'Unknown User'}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {getTimeAgo(comment.created_at)}
                    </Typography>
                  </Box>
                  {canDeleteComment(comment) && (
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, comment)}
                      sx={{ color: 'text.secondary' }}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
                <Typography variant="body2" sx={{ color: 'text.primary', mb: 1 }}>
                  {comment.text}
                </Typography>
                <Button
                  size="small"
                  startIcon={<ReplyIcon />}
                  onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      background: theme.palette.action.hover,
                      color: theme.palette.secondary.main,
                    },
                  }}
                >
                  {t('reply')}
                </Button>
              </Box>
            </Box>

            {/* Reply Input */}
            {replyingTo === comment.id && (
              <Box sx={{ ml: 4, mt: 2 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Avatar sx={{ width: 24, height: 24, background: theme.palette.primary.main }}>
                    U
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <TextField
                      fullWidth
                      placeholder={t('writeAReply')}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      size="small"
                      variant="outlined"
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, gap: 1 }}>
                      <Button
                        size="small"
                        onClick={() => setReplyingTo(null)}
                      >
                        {t('cancel')}
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleAddReply(comment.id)}
                        disabled={!replyText.trim()}
                      >
                        {t('reply')}
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}

            {/* Replies */}
            {comment.replies && comment.replies.length > 0 && (
              <Box sx={{ ml: 4, mt: 2 }}>
                {comment.replies.map((reply) => (
                  <Box key={reply.id} sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Avatar sx={{ width: 24, height: 24, background: theme.palette.primary.main }}>
                      {reply.user?.username?.charAt(0).toUpperCase() || 'U'}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>
                          {reply.user?.username || 'Unknown User'}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {getTimeAgo(reply.created_at)}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: 'text.primary' }}>
                        {reply.text}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        ))}
      </Box>

      {comments.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {t('noCommentsYet')}
          </Typography>
        </Box>
      )}

      {/* Comment Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem
          onClick={() => handleDeleteComment(selectedComment?.id)}
          sx={{ color: 'error.main' }}
        >
          {t('delete')}
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default CommentsSection; 