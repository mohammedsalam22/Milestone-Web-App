import React from 'react';
import {
  Typography,
  Box,
  TextField,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  useTheme,
} from '@mui/material';
import { Work as WorkIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const WorkDetailsStep = ({ formData, errors, handleInputChange, subjects }) => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isRTL = i18n.language === 'ar';

  return (
    <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: 2 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2, 
          mb: 3,
          flexDirection: isRTL ? 'row-reverse' : 'row'
        }}>
          <WorkIcon sx={{ fontSize: 28, color: theme.palette.primary.main }} />
          <Typography variant="h6" sx={{ 
            fontWeight: 600,
            ...(isRTL && { textAlign: 'right' }),
            ...(!isRTL && { textAlign: 'left' })
          }}>
            {t('workDetails')}
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.role} required>
              <InputLabel>{t('role')}</InputLabel>
              <Select
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                label={t('role')}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="teacher">{t('teacher')}</MenuItem>
                <MenuItem value="admin">{t('admin')}</MenuItem>
                <MenuItem value="cooperator">{t('cooperator')}</MenuItem>
                <MenuItem value="receptionist">{t('receptionist')}</MenuItem>
              </Select>
              {errors.role && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                  {errors.role}
                </Typography>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t('salary')}
              type="number"
              value={formData.salary}
              onChange={(e) => handleInputChange('salary', e.target.value)}
              error={!!errors.salary}
              helperText={errors.salary}
              required
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Grid>
          {formData.role === 'teacher' && (
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.subjectIDs} required>
                <InputLabel>{t('subjects')}</InputLabel>
                <Select
                  multiple
                  value={formData.subjectIDs}
                  onChange={(e) => handleInputChange('subjectIDs', e.target.value)}
                  input={<OutlinedInput label={t('subjects')} />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => {
                        const subject = subjects.find(s => s.id === value);
                        return (
                          <Chip key={value} label={subject?.name || value} size="small" />
                        );
                      })}
                    </Box>
                  )}
                  sx={{ borderRadius: 2 }}
                >
                  {subjects.map((subject) => (
                    <MenuItem key={subject.id} value={subject.id}>
                      {subject.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.subjectIDs && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                    {errors.subjectIDs}
                  </Typography>
                )}
              </FormControl>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WorkDetailsStep; 