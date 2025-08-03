import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const EditSubjectDialog = ({
  open,
  onClose,
  formData,
  formErrors,
  sections,
  loading,
  onInputChange,
  onSubmit,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
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
          onChange={(e) => onInputChange('name', e.target.value)}
          error={!!formErrors.name}
          helperText={formErrors.name}
          sx={{ mt: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        />
        <FormControl fullWidth margin="dense" error={!!formErrors.grade_id}>
          <InputLabel>{t('grade')}</InputLabel>
          <Select
            value={formData.grade_id}
            onChange={(e) => onInputChange('grade_id', e.target.value)}
            label={t('grade')}
            sx={{ mt: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          >
            {sections.map((section) => (
              <MenuItem key={section.id} value={section.id}>
                {section.name}
              </MenuItem>
            ))}
          </Select>
          {formErrors.grade_id && (
            <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
              {formErrors.grade_id}
            </Typography>
          )}
        </FormControl>
        <TextField
          margin="dense"
          label={t('teacher')}
          type="text"
          fullWidth
          variant="outlined"
          value={formData.teacher.join(', ')}
          onChange={(e) => onInputChange('teacher', e.target.value.split(',').map(t => t.trim()).filter(t => t))}
          placeholder={t('teacherPlaceholder')}
          sx={{ mt: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
        />
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="outlined" sx={{ borderRadius: 2 }}>
          {t('cancel')}
        </Button>
        <Button onClick={onSubmit} variant="contained" disabled={loading} sx={{ borderRadius: 2 }}>
          {loading ? t('updating') : t('update')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditSubjectDialog; 