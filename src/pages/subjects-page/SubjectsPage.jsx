import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Button,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  TextField,
  Chip,
  useTheme,
  Fade,
  Grow,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  School as SchoolIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchSubjects, createSubject, updateSubject, deleteSubject } from '../../featuers/subjects-slice/subjectsSlice';

const SubjectsPage = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const { subjects, loading, error } = useSelector((state) => state.subjects);
  const theme = useTheme();

  const isRTL = i18n.language === 'ar';

  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Form state
  const [formData, setFormData] = useState({ name: '' });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    dispatch(fetchSubjects());
  }, [dispatch]);

  const handleCreateClick = () => {
    setFormData({ name: '' });
    setFormErrors({});
    setCreateDialogOpen(true);
  };

  const handleEditClick = (subject) => {
    setSelectedSubject(subject);
    setFormData({ name: subject.name });
    setFormErrors({});
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (subject) => {
    setSelectedSubject(subject);
    setDeleteDialogOpen(true);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = t('subjectNameRequired');
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateSubmit = async () => {
    if (!validateForm()) return;

    const resultAction = await dispatch(createSubject(formData));
    if (createSubject.fulfilled.match(resultAction)) {
      setCreateDialogOpen(false);
      setFormData({ name: '' });
    }
  };

  const handleEditSubmit = async () => {
    if (!validateForm()) return;

    const resultAction = await dispatch(updateSubject({ id: selectedSubject.id, data: formData }));
    if (updateSubject.fulfilled.match(resultAction)) {
      setEditDialogOpen(false);
      setSelectedSubject(null);
      setFormData({ name: '' });
    }
  };

  const handleDeleteConfirm = async () => {
    const resultAction = await dispatch(deleteSubject(selectedSubject.id));
    if (deleteSubject.fulfilled.match(resultAction)) {
      setDeleteDialogOpen(false);
      setSelectedSubject(null);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (loading && subjects.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{
      p: 3,
      ...(isRTL && { direction: 'rtl', textAlign: 'right' })
    }}>
      {/* Header */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 4,
        flexDirection: isRTL ? 'row-reverse' : 'row'
      }}>
        <Box>
          <Typography variant="h4" component="h1" sx={{
            fontWeight: 700,
            ...(isRTL && { textAlign: 'right' }),
            ...(!isRTL && { textAlign: 'left' })
          }}>
            {t('subjects')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            {subjects.length} {subjects.length === 1 ? t('subject') : t('subjects')} {t('available')}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={isRTL ? null : <AddIcon />}
          endIcon={isRTL ? <AddIcon /> : null}
          onClick={handleCreateClick}
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1.5,
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: theme.shadows[4],
            '&:hover': {
              boxShadow: theme.shadows[8],
            }
          }}
        >
          {t('createSubject')}
        </Button>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Subjects Grid */}
      {subjects.length === 0 ? (
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 8,
          textAlign: 'center'
        }}>
          <SchoolIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            {t('noSubjectsYet')}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {t('createYourFirstSubject')}
          </Typography>
          <Button
            variant="outlined"
            startIcon={isRTL ? null : <AddIcon />}
            endIcon={isRTL ? <AddIcon /> : null}
            onClick={handleCreateClick}
            sx={{ borderRadius: 2 }}
          >
            {t('createSubject')}
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {subjects.map((subject, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={subject.id}>
              <Grow in timeout={300 + index * 100}>
                <Card
                  elevation={2}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    transition: 'all 0.3s ease-in-out',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[8],
                      '& .MuiCardActions-root': {
                        opacity: 1,
                      }
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 2,
                      flexDirection: isRTL ? 'row-reverse' : 'row'
                    }}>
                      <Chip
                        label={`#${subject.id}`}
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{ fontWeight: 600 }}
                      />
                      <SchoolIcon sx={{ 
                        fontSize: 32, 
                        color: theme.palette.primary.main,
                        opacity: 0.8
                      }} />
                    </Box>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 600,
                      mb: 1,
                      ...(isRTL && { textAlign: 'right' }),
                      ...(!isRTL && { textAlign: 'left' })
                    }}>
                      {subject.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{
                      ...(isRTL && { textAlign: 'right' }),
                      ...(!isRTL && { textAlign: 'left' })
                    }}>
                      {t('subjectDescription')}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{
                    p: 2,
                    pt: 0,
                    opacity: 0.7,
                    transition: 'opacity 0.3s ease-in-out',
                    justifyContent: 'space-between',
                    flexDirection: isRTL ? 'row-reverse' : 'row'
                  }}>
                    <Box sx={{
                      display: 'flex',
                      gap: 1,
                      flexDirection: isRTL ? 'row-reverse' : 'row'
                    }}>
                      <IconButton
                        onClick={() => handleEditClick(subject)}
                        color="primary"
                        size="small"
                        sx={{
                          '&:hover': {
                            backgroundColor: theme.palette.primary.light + '20',
                            transform: 'scale(1.1)'
                          },
                          transition: 'all 0.2s ease-in-out'
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteClick(subject)}
                        color="error"
                        size="small"
                        sx={{
                          '&:hover': {
                            backgroundColor: theme.palette.error.light + '20',
                            transform: 'scale(1.1)'
                          },
                          transition: 'all 0.2s ease-in-out'
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </CardActions>
                </Card>
              </Grow>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Create Subject Dialog */}
      <Dialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {t('createSubject')}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t('subjectName')}
            type="text"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            error={!!formErrors.name}
            helperText={formErrors.name}
            sx={{ mt: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setCreateDialogOpen(false)}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            {t('cancel')}
          </Button>
          <Button
            onClick={handleCreateSubmit}
            variant="contained"
            disabled={loading}
            sx={{ borderRadius: 2 }}
          >
            {loading ? t('creating') : t('create')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Subject Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {t('editSubject')}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t('subjectName')}
            type="text"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            error={!!formErrors.name}
            helperText={formErrors.name}
            sx={{ mt: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setEditDialogOpen(false)}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            {t('cancel')}
          </Button>
          <Button
            onClick={handleEditSubmit}
            variant="contained"
            disabled={loading}
            sx={{ borderRadius: 2 }}
          >
            {loading ? t('updating') : t('update')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {t('deleteSubject')}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('deleteSubjectConfirmation')} "{selectedSubject?.name}"? {t('deleteConfirmationEnd')}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            {t('cancel')}
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
            disabled={loading}
            sx={{ borderRadius: 2 }}
          >
            {loading ? t('deleting') : t('delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SubjectsPage; 