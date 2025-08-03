import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  Alert,
  CircularProgress,
  Paper,
  Divider,
} from '@mui/material';
import {
  Close as CloseIcon,
  CloudUpload as CloudUploadIcon,
  Image as ImageIcon,
} from '@mui/icons-material';
import { useTheme } from '../../../theme/ThemeProvider';
import { useTranslation } from 'react-i18next';
import { createProgram, updateProgram, clearError } from '../../../featuers/programs-slice/programsSlice';

const CreateEditProgramDialog = ({ open, onClose, program, isEdit }) => {
  const dispatch = useDispatch();
  const { getCurrentTheme } = useTheme();
  const theme = getCurrentTheme();
  const { t, i18n } = useTranslation();

  const { createLoading, updateLoading, error } = useSelector((state) => state.programs);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    details: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState('');
  const [errors, setErrors] = useState({});

  const isRTL = (language) => ['ar'].includes(language);

  useEffect(() => {
    if (open) {
      if (isEdit && program) {
        setFormData({
          title: program.title || '',
          description: program.description || '',
          details: program.details || '',
          image: null,
        });
        setImagePreview(program.image ? `http://127.0.0.1:8000/storage/${program.image}` : '');
      } else {
        setFormData({
          title: '',
          description: '',
          details: '',
          image: null,
        });
        setImagePreview('');
      }
      setErrors({});
    }
  }, [open, isEdit, program]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
      }));
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = t('titleRequired');
    }
    
    if (!formData.description.trim()) {
      newErrors.description = t('descriptionRequired');
    }
    
    if (!isEdit && !formData.image) {
      newErrors.image = t('imageRequired');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      if (isEdit) {
        await dispatch(updateProgram({ id: program.id, programData: formData }));
      } else {
        await dispatch(createProgram(formData));
      }
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleClose = () => {
    if (!createLoading && !updateLoading) {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          minHeight: '80vh',
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {isEdit ? t('editProgram') : t('createProgram')}
          </Typography>
          <IconButton onClick={handleClose} disabled={createLoading || updateLoading}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pb: 2 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Title Field */}
          <Paper elevation={0} sx={{ p: 3, backgroundColor: theme.palette.background.default }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: theme.palette.text.primary }}>
              {t('programTitle')} *
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              error={!!errors.title}
              helperText={errors.title}
              placeholder="Enter program title"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Paper>

          <Divider />

          {/* Description Field */}
          <Paper elevation={0} sx={{ p: 3, backgroundColor: theme.palette.background.default }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: theme.palette.text.primary }}>
              {t('programDescription')} *
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              error={!!errors.description}
              helperText={errors.description}
              placeholder="Enter program description"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Paper>

          <Divider />

          {/* Details Field */}
          <Paper elevation={0} sx={{ p: 3, backgroundColor: theme.palette.background.default }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: theme.palette.text.primary }}>
              {t('programDetails')}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: theme.palette.text.secondary }}>
              {t('programDetailsOptional')}
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              variant="outlined"
              value={formData.details}
              onChange={(e) => handleInputChange('details', e.target.value)}
              placeholder="Enter detailed information about the program"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
          </Paper>

          <Divider />

          {/* Image Upload Field */}
          <Paper elevation={0} sx={{ p: 3, backgroundColor: theme.palette.background.default }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: theme.palette.text.primary }}>
              {t('programImage')} {!isEdit && '*'}
            </Typography>
            
            {imagePreview && (
              <Box sx={{ mb: 2, textAlign: 'center' }}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '200px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                  }}
                />
              </Box>
            )}

            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUploadIcon />}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                py: 1.5,
                px: 3,
                borderStyle: 'dashed',
                borderWidth: 2,
                width: '100%',
              }}
            >
              {imagePreview ? t('changeImage') : t('uploadImage')}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
            
            {errors.image && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                {errors.image}
              </Typography>
            )}
          </Paper>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button
          onClick={handleClose}
          disabled={createLoading || updateLoading}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
          }}
        >
          {t('cancel')}
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={createLoading || updateLoading}
          startIcon={createLoading || updateLoading ? <CircularProgress size={20} /> : null}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
          }}
        >
          {createLoading || updateLoading
            ? (isEdit ? t('updating') : t('creating'))
            : (isEdit ? t('update') : t('create'))
          }
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateEditProgramDialog; 