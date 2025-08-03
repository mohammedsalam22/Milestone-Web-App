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
  Grow,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchStudyYears, createStudyYear, updateStudyYear, deleteStudyYear } from '../../featuers/study-years-slice/studyYearsSlice';

const StudyYearsPage = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const { studyYears, loading, error } = useSelector((state) => state.studyYears);
  const theme = useTheme();

  const isRTL = i18n.language === 'ar';

  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedStudyYear, setSelectedStudyYear] = useState(null);

  // Form state
  const [formData, setFormData] = useState({ name: '' });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    dispatch(fetchStudyYears());
  }, [dispatch]);

  const handleCreateClick = () => {
    setFormData({ name: '' });
    setFormErrors({});
    setCreateDialogOpen(true);
  };

  const handleEditClick = (studyYear) => {
    setSelectedStudyYear(studyYear);
    setFormData({ name: studyYear.name });
    setFormErrors({});
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (studyYear) => {
    setSelectedStudyYear(studyYear);
    setDeleteDialogOpen(true);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = t('studyYearNameRequired');
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateSubmit = async () => {
    if (!validateForm()) return;

    const resultAction = await dispatch(createStudyYear(formData));
    if (createStudyYear.fulfilled.match(resultAction)) {
      setCreateDialogOpen(false);
      setFormData({ name: '' });
    }
  };

  const handleEditSubmit = async () => {
    if (!validateForm()) return;

    const resultAction = await dispatch(updateStudyYear({ id: selectedStudyYear.id, data: formData }));
    if (updateStudyYear.fulfilled.match(resultAction)) {
      setEditDialogOpen(false);
      setSelectedStudyYear(null);
      setFormData({ name: '' });
    }
  };

  const handleDeleteConfirm = async () => {
    const resultAction = await dispatch(deleteStudyYear(selectedStudyYear.id));
    if (deleteStudyYear.fulfilled.match(resultAction)) {
      setDeleteDialogOpen(false);
      setSelectedStudyYear(null);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (loading && studyYears.length === 0) {
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
        <Typography variant="h4" component="h1">
          {t('studyYears')}
        </Typography>
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
          {t('createStudyYear')}
        </Button>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Study Years Grid */}
      {studyYears.length === 0 ? (
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 8,
          textAlign: 'center'
        }}>
          <CalendarIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            {t('noStudyYearsYet')}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {t('createYourFirstStudyYear')}
          </Typography>
          <Button
            variant="outlined"
            startIcon={isRTL ? null : <AddIcon />}
            endIcon={isRTL ? <AddIcon /> : null}
            onClick={handleCreateClick}
            sx={{ borderRadius: 2 }}
          >
            {t('createStudyYear')}
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {studyYears.map((studyYear, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={studyYear.id}>
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
                        label={`#${studyYear.id}`}
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{ fontWeight: 600 }}
                      />
                      <CalendarIcon sx={{ 
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
                      {studyYear.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{
                      ...(isRTL && { textAlign: 'right' }),
                      ...(!isRTL && { textAlign: 'left' })
                    }}>
                      {t('studyYearDescription')}
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
                        onClick={() => handleEditClick(studyYear)}
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
                        onClick={() => handleDeleteClick(studyYear)}
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

      {/* Create Study Year Dialog */}
      <Dialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {t('createStudyYear')}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t('studyYearName')}
            type="text"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            error={!!formErrors.name}
            helperText={formErrors.name}
            placeholder="2024/2025"
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

      {/* Edit Study Year Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {t('editStudyYear')}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t('studyYearName')}
            type="text"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            error={!!formErrors.name}
            helperText={formErrors.name}
            placeholder="2024/2025"
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
            {t('deleteStudyYear')}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('deleteStudyYearConfirmation')} "{selectedStudyYear?.name}"? {t('deleteConfirmationEnd')}
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

export default StudyYearsPage; 