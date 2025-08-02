import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
  IconButton,
  Button,
  useTheme,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Reply as ReplyIcon,
  Article as ArticleIcon,
} from '@mui/icons-material';

const CommentCard = ({ comment }) => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isRTL = i18n.language === 'ar';

  // Local state
  const [showReplies, setShowReplies] = useState(false);

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
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: theme.shadows[2],
        border: theme.palette.mode === 'dark' ? '1px solid #333' : '1px solid #e0e0e0',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows[8],
          border: `1px solid ${theme.palette.secondary.main}`,
        },
        transition: 'all 0.3s ease',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent sx={{ pb: 1 }}>
        {/* Post Context */}
        <Box sx={{ mb: 2, p: 2, background: theme.palette.background.paper, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <ArticleIcon sx={{ fontSize: 16, color: theme.palette.primary.main }} />
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
              {t('fromPost')}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
            {comment.postTitle}
          </Typography>
        </Box>

        {/* Comment Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              background: theme.palette.secondary.main,
              mr: 2,
              fontWeight: 600,
            }}
          >
            {comment.user?.username?.charAt(0).toUpperCase() || 'U'}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
              {comment.user?.username || 'Unknown User'}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {getTimeAgo(comment.created_at)}
            </Typography>
          </Box>
          <IconButton size="small" sx={{ color: 'text.secondary' }}>
            <MoreVertIcon />
          </IconButton>
        </Box>

        {/* Comment Content */}
        <Typography
          variant="body1"
          sx={{
            color: 'text.primary',
            mb: 2,
            lineHeight: 1.6,
            whiteSpace: 'pre-wrap',
          }}
        >
          {comment.text}
        </Typography>

        {/* Replies Section */}
        {comment.replies && comment.replies.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Button
              size="small"
              startIcon={<ReplyIcon />}
              onClick={() => setShowReplies(!showReplies)}
              sx={{
                color: theme.palette.secondary.main,
                '&:hover': {
                  background: theme.palette.secondary.light,
                  color: theme.palette.secondary.contrastText,
                },
              }}
            >
              {comment.replies.length} {t('replies')}
            </Button>

            {showReplies && (
              <Box sx={{ mt: 2, ml: 2 }}>
                {comment.replies.map((reply, index) => (
                  <Box
                    key={reply.id}
                    sx={{
                      p: 2,
                      mb: 1,
                      background: theme.palette.background.paper,
                      borderRadius: 2,
                      border: `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Avatar
                        sx={{
                          width: 24,
                          height: 24,
                          background: theme.palette.primary.main,
                          mr: 1,
                          fontSize: '0.75rem',
                        }}
                      >
                        {reply.user?.username?.charAt(0).toUpperCase() || 'U'}
                      </Avatar>
                      <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.primary' }}>
                        {reply.user?.username || 'Unknown User'}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary', ml: 1 }}>
                        {getTimeAgo(reply.created_at)}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: 'text.primary', ml: 3 }}>
                      {reply.text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        )}
      </CardContent>

      {/* Comment Actions */}
      <Box sx={{ p: 2, pt: 0 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              size="small"
              startIcon={<ReplyIcon />}
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

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              label={`#${comment.id}`}
              size="small"
              sx={{
                background: theme.palette.secondary.light,
                color: theme.palette.secondary.contrastText,
                fontWeight: 600,
              }}
            />
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default CommentCard; 