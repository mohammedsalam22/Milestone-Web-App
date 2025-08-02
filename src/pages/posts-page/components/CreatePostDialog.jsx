import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  Chip,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import {
  Close as CloseIcon,
  Add as AddIcon,
  AttachFile as AttachFileIcon,
  Delete as DeleteIcon,
  Image as ImageIcon,
  InsertDriveFile as FileIcon,
  Public as PublicIcon,
  Lock as LockIcon,
} from '@mui/icons-material';
import { createPost } from '../../../featuers/posts-slice/postsSlice';
import { fetchSections } from '../../../featuers/sections-slice/sectionsSlice';
import Post from '../../../models/Post';

const CreatePostDialog = ({ open, onClose, onSuccess }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isRTL = i18n.language === 'ar';

  // Redux selectors
  const { createLoading, error } = useSelector((state) => state.posts);
  const { sections } = useSelector((state) => state.sections);

  // Refs
  const fileInputRef = useRef(null);

  // Local state
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    is_public: true, // Default to public
    section_ids: [],
  });
  const [attachments, setAttachments] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  // Fetch sections on component mount
  React.useEffect(() => {
    if (open) {
      dispatch(fetchSections());
    }
  }, [dispatch, open]);

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Handle share type change
  const handleShareTypeChange = (isPublic) => {
    setFormData(prev => ({ 
      ...prev, 
      is_public: isPublic,
      // Clear sections if switching to public
      section_ids: isPublic ? [] : []
    }));
  };

  // Handle file selection
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    const newAttachments = files.map(file => ({
      file,
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type.startsWith('image/') ? 'image' : 'file',
    }));
    
    setAttachments(prev => [...prev, ...newAttachments]);
    event.target.value = null; // Reset input
  };

  // Handle file removal
  const handleRemoveFile = (fileId) => {
    setAttachments(prev => prev.filter(file => file.id !== fileId));
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

    // Validate sections only if private
    if (!formData.is_public && formData.section_ids.length === 0) {
      errors.sections = t('sectionsRequiredForPrivate');
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const postData = {
        title: formData.title,
        text: formData.text,
        is_public: formData.is_public,
      };

      // Only include section_ids for private posts
      if (!formData.is_public) {
        postData.section_ids = formData.section_ids;
      }

      // Only include attachments if there are files
      if (attachments.length > 0) {
        postData.attachments = attachments.map(att => att.file);
      }

      await dispatch(createPost(postData)).unwrap();
      
      // Reset form
      setFormData({
        title: '',
        text: '',
        is_public: true,
        section_ids: [],
      });
      setAttachments([]);
      setFormErrors({});
      
      onSuccess();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  // Handle dialog close
  const handleClose = () => {
    if (!createLoading) {
      setFormData({
        title: '',
        text: '',
        is_public: true,
        section_ids: [],
      });
      setAttachments([]);
      setFormErrors({});
      onClose();
    }
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 3,
          maxHeight: isMobile ? '100%' : '90vh',
        },
      }}
    >
      <DialogTitle sx={{ 
        pb: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {t('createNewPost')}
        </Typography>
        <IconButton
          onClick={handleClose}
          disabled={createLoading}
          sx={{ color: 'text.secondary' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pb: 2 }}>
        {/* Error Display */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Title Field */}
        <TextField
          fullWidth
          label={t('title')}
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          error={!!formErrors.title}
          helperText={formErrors.title || `${formData.title.length}/200`}
          sx={{ mb: 3 }}
          disabled={createLoading}
        />

        {/* Content Field */}
        <TextField
          fullWidth
          label={t('content')}
          value={formData.text}
          onChange={(e) => handleInputChange('text', e.target.value)}
          error={!!formErrors.text}
          helperText={formErrors.text || `${formData.text.length}/5000`}
          multiline
          rows={6}
          sx={{ mb: 3 }}
          disabled={createLoading}
        />

        {/* Share Type Selection */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
            {t('shareType')}
          </Typography>
          <RadioGroup
            value={formData.is_public}
            onChange={(e) => handleShareTypeChange(e.target.value === 'true')}
            row
          >
            <FormControlLabel
              value={true}
              control={<Radio />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PublicIcon sx={{ fontSize: 20, color: theme.palette.success.main }} />
                  <Typography>{t('public')}</Typography>
                </Box>
              }
            />
            <FormControlLabel
              value={false}
              control={<Radio />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LockIcon sx={{ fontSize: 20, color: theme.palette.warning.main }} />
                  <Typography>{t('private')}</Typography>
                </Box>
              }
            />
          </RadioGroup>
          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 1 }}>
            {formData.is_public 
              ? t('publicPostDescription') 
              : t('privatePostDescription')
            }
          </Typography>
        </Box>

        {/* Sections Selection - Only show for private posts */}
        {!formData.is_public && (
          <FormControl fullWidth sx={{ mb: 3 }} error={!!formErrors.sections}>
            <InputLabel>{t('sections')}</InputLabel>
            <Select
              multiple
              value={formData.section_ids}
              onChange={(e) => handleInputChange('section_ids', e.target.value)}
              label={t('sections')}
              disabled={createLoading}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => {
                    const section = sections.find(s => s.id === value);
                    return (
                      <Chip
                        key={value}
                        label={section ? section.name : value}
                        size="small"
                        sx={{ background: theme.palette.primary.light, color: 'white' }}
                      />
                    );
                  })}
                </Box>
              )}
            >
              {sections.map((section) => (
                <MenuItem key={section.id} value={section.id}>
                  {section.name}
                </MenuItem>
              ))}
            </Select>
            {formErrors.sections && (
              <Typography variant="caption" sx={{ color: 'error.main', mt: 0.5 }}>
                {formErrors.sections}
              </Typography>
            )}
          </FormControl>
        )}

        {/* File Attachments */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
            {t('attachments')} ({attachments.length})
          </Typography>
          
          {/* File Upload Button */}
          <Button
            variant="outlined"
            startIcon={<AttachFileIcon />}
            onClick={() => fileInputRef.current?.click()}
            disabled={createLoading}
            sx={{ mb: 2 }}
          >
            {t('addFiles')}
          </Button>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,.pdf,.doc,.docx,.txt,.xls,.xlsx"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />

          {/* Attachments List */}
          {attachments.length > 0 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {attachments.map((file) => (
                <Box
                  key={file.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 2,
                    borderRadius: 2,
                    background: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  {file.type === 'image' ? (
                    <ImageIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
                  ) : (
                    <FileIcon sx={{ mr: 2, color: theme.palette.secondary.main }} />
                  )}
                  
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {file.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {formatFileSize(file.size)} • {file.type}
                    </Typography>
                  </Box>
                  
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveFile(file.id)}
                    disabled={createLoading}
                    sx={{ color: theme.palette.error.main }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={handleClose}
          disabled={createLoading}
          sx={{ minWidth: 100 }}
        >
          {t('cancel')}
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={createLoading || !formData.title.trim() || !formData.text.trim()}
          startIcon={createLoading ? <CircularProgress size={16} /> : <AddIcon />}
          sx={{ minWidth: 120 }}
        >
          {createLoading ? t('creating') : t('createPost')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePostDialog; 