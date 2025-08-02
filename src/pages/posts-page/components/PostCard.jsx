import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../../featuers/posts-slice/postsSlice';
import EditPostDialog from './EditPostDialog';
import CommentsSection from './CommentsSection';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Chip,
  ImageList,
  ImageListItem,
  Dialog,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery,
  Divider,
  Paper
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
  ThumbUp as ThumbUpIcon,
  Comment as CommentIcon,
  Share as ShareIcon,
  AttachFile as AttachFileIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import Post from '../../../models/Post';
import { postsAPI } from '../../../api/posts';

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation();
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [imagePreviewOpen, setImagePreviewOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(false);

  const postInstance = new Post(post);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleMenuClose();
    setEditDialogOpen(true);
  };

  const handleDelete = async () => {
    handleMenuClose();
    if (window.confirm(t('deletePostConfirmation'))) {
      try {
        await dispatch(deletePost(post.id)).unwrap();
      } catch (error) {
        console.error('Failed to delete post:', error);
      }
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setImagePreviewOpen(true);
  };

  const handleDownloadFile = (filePath, fileName) => {
    const fileUrl = postsAPI.getFileUrl(filePath);
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleComment = () => {
    setShowComments(!showComments);
  };

  return (
    <>
      <Paper 
        elevation={1} 
        sx={{ 
          mb: 2, 
          borderRadius: 2,
          border: `1px solid ${theme.palette.divider}`,
          overflow: 'hidden'
        }}
      >
        {/* Post Header */}
        <Box sx={{ p: 3, pb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                sx={{ 
                  width: 48, 
                  height: 48, 
                  bgcolor: theme.palette.primary.main,
                  mr: 2
                }}
              >
                {post.user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {post.user?.name || t('anonymous')}
                </Typography>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                  {postInstance.timeAgo}
                </Typography>
              </Box>
            </Box>
            
            <IconButton onClick={handleMenuClick} size="small">
              <MoreVertIcon />
            </IconButton>
          </Box>

          {/* Post Content */}
          <Box sx={{ mt: 2 }}>
            {post.title && (
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                {post.title}
              </Typography>
            )}
            <Typography variant="body1" sx={{ lineHeight: 1.6, mb: 2 }}>
              {post.text}
            </Typography>

            {/* Sections */}
            {post.sections && post.sections.length > 0 && (
              <Box sx={{ mb: 2 }}>
                {post.sections.map((section) => (
                  <Chip
                    key={section.id}
                    label={section.name}
                    size="small"
                    sx={{ mr: 1, mb: 1 }}
                  />
                ))}
              </Box>
            )}
          </Box>
        </Box>

        {/* Images */}
        {postInstance.imageAttachments.length > 0 && (
          <Box sx={{ px: 3, pb: 2 }}>
            <ImageList 
              cols={postInstance.imageAttachments.length === 1 ? 1 : 2} 
              rowHeight={200}
              sx={{ m: 0 }}
            >
              {postInstance.imageAttachments.map((attachment, index) => (
                <ImageListItem 
                  key={index}
                  sx={{ 
                    cursor: 'pointer',
                    borderRadius: 1,
                    overflow: 'hidden'
                  }}
                  onClick={() => handleImageClick(postsAPI.getFileUrl(attachment.file))}
                >
                  <img
                    src={postsAPI.getFileUrl(attachment.file)}
                    alt={`Post image ${index + 1}`}
                    loading="lazy"
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover' 
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        )}

        {/* Files */}
        {postInstance.fileAttachments.length > 0 && (
          <Box sx={{ px: 3, pb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              {t('attachments')}:
            </Typography>
            {postInstance.fileAttachments.map((attachment, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 1.5,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 1,
                  mb: 1,
                  bgcolor: theme.palette.background.paper
                }}
              >
                <AttachFileIcon sx={{ mr: 1, color: theme.palette.text.secondary }} />
                <Typography variant="body2" sx={{ flex: 1 }}>
                  {attachment.file.split('/').pop()}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => handleDownloadFile(attachment.file)}
                  sx={{ ml: 1 }}
                >
                  <DownloadIcon />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}

        {/* Post Stats */}
        <Box sx={{ px: 3, py: 1 }}>
          <Divider sx={{ mb: 1 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
              {post.comments?.length || 0} {t('comments')}
            </Typography>
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
              {post.is_public ? t('public') : t('private')}
            </Typography>
          </Box>
        </Box>

        {/* Action Buttons */}
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button
            startIcon={<ThumbUpIcon />}
            onClick={handleLike}
            sx={{
              flex: 1,
              py: 1.5,
              color: liked ? theme.palette.primary.main : theme.palette.text.secondary,
              textTransform: 'none',
              '&:hover': {
                bgcolor: theme.palette.action.hover
              }
            }}
          >
            {t('like')}
          </Button>
          <Button
            startIcon={<CommentIcon />}
            onClick={handleComment}
            sx={{
              flex: 1,
              py: 1.5,
              color: theme.palette.text.secondary,
              textTransform: 'none',
              '&:hover': {
                bgcolor: theme.palette.action.hover
              }
            }}
          >
            {t('comment')}
          </Button>
          <Button
            startIcon={<ShareIcon />}
            sx={{
              flex: 1,
              py: 1.5,
              color: theme.palette.text.secondary,
              textTransform: 'none',
              '&:hover': {
                bgcolor: theme.palette.action.hover
              }
            }}
          >
            {t('share')}
          </Button>
        </Box>

        {/* Comments Section */}
        {showComments && (
          <CommentsSection post={post} />
        )}
      </Paper>

      {/* Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 3,
          sx: {
            minWidth: 150,
            borderRadius: 2,
          },
        }}
      >
        <MenuItem onClick={handleEdit}>
          <EditIcon sx={{ mr: 1, fontSize: 20 }} />
          {t('edit')}
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <DeleteIcon sx={{ mr: 1, fontSize: 20 }} />
          {t('delete')}
        </MenuItem>
      </Menu>

      {/* Edit Dialog */}
      <EditPostDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        post={post}
      />

      {/* Image Preview Dialog */}
      <Dialog
        open={imagePreviewOpen}
        onClose={() => setImagePreviewOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogContent sx={{ p: 0 }}>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Preview"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '80vh',
                objectFit: 'contain'
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setImagePreviewOpen(false)}>
            {t('close')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PostCard; 