import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const CreateEditDialog = ({
  open,
  onClose,
  dialogType,
  dialogMode,
  formData,
  formErrors,
  studyStages,
  grades,
  studyYears,
  onInputChange,
  onSubmit,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {dialogMode === 'create' 
          ? t(`create${dialogType.charAt(0).toUpperCase() + dialogType.slice(1)}`)
          : t(`edit${dialogType.charAt(0).toUpperCase() + dialogType.slice(1)}`)
        }
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label={t('name')}
          value={formData.name}
          onChange={(e) => onInputChange('name', e.target.value)}
          error={!!formErrors.name}
          helperText={formErrors.name}
          sx={{ mb: 2, mt: 1 }}
        />
        
        {dialogType === 'grade' && (
          <>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>{t('studyStage')}</InputLabel>
              <Select
                value={formData.study_stage_id}
                onChange={(e) => onInputChange('study_stage_id', e.target.value)}
                error={!!formErrors.study_stage_id}
                label={t('studyStage')}
              >
                {studyStages.map((stage) => (
                  <MenuItem key={stage.id} value={stage.id}>
                    {stage.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>{t('studyYear')}</InputLabel>
              <Select
                value={formData.study_year_id}
                onChange={(e) => onInputChange('study_year_id', e.target.value)}
                error={!!formErrors.study_year_id}
                label={t('studyYear')}
              >
                {studyYears.map((year) => (
                  <MenuItem key={year.id} value={year.id}>
                    {year.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}
        
        {dialogType === 'section' && (
          <>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>{t('grade')}</InputLabel>
              <Select
                value={formData.grade_id}
                onChange={(e) => onInputChange('grade_id', e.target.value)}
                error={!!formErrors.grade_id}
                label={t('grade')}
              >
                {grades.map((grade) => (
                  <MenuItem key={grade.id} value={grade.id}>
                    {grade.name} - {grade.study_stage.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              type="number"
              label={t('limit')}
              value={formData.limit}
              onChange={(e) => onInputChange('limit', e.target.value)}
              error={!!formErrors.limit}
              helperText={formErrors.limit || t('maximumStudentsInSection')}
              sx={{ mb: 2 }}
              inputProps={{ min: 1 }}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          {t('cancel')}
        </Button>
        <Button onClick={onSubmit} variant="contained">
          {dialogMode === 'create' ? t('create') : t('update')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateEditDialog; 