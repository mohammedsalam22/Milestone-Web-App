import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  useTheme,
} from '@mui/material';
import { updatePost } from '../../../featuers/posts-slice/postsSlice';

const EditPostDialog = ({ open, onClose, post }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();

  // Local state
  const [formData, setFormData] = useState({
    title: post?.title || '',
    text: post?.text || '',
  });
  const [formErrors, setFormErrors] = useState({});

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim()) {
      errors.title = t('titleRequired');
    } else if (formData.title.length > 200) {
      errors.title = t('titleTooLong');
    }
    
    if (!formData.text.trim()) {
      errors.text = t('contentRequired');
    } else if (formData.text.length > 5000) {
      errors.text = t('contentTooLong');
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      await dispatch(updatePost({
        id: post.id,
        postData: formData,
      })).unwrap();
      
      onClose();
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  // Handle dialog close
  const handleClose = () => {
    setFormData({
      title: post?.title || '',
      text: post?.text || '',
    });
    setFormErrors({});
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        {t('editPost')}
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label={t('title')}
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          error={!!formErrors.title}
          helperText={formErrors.title || `${formData.title.length}/200`}
          sx={{ mb: 3, mt: 1 }}
        />

        <TextField
          fullWidth
          label={t('content')}
          value={formData.text}
          onChange={(e) => handleInputChange('text', e.target.value)}
          error={!!formErrors.text}
          helperText={formErrors.text || `${formData.text.length}/5000`}
          multiline
          rows={6}
          sx={{ mb: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          {t('cancel')}
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!formData.title.trim() || !formData.text.trim()}
        >
          {t('update')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPostDialog; 