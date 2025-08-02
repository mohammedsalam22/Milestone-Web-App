import React from 'react';
import {
  Typography,
  Box,
  TextField,
  Grid,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const PersonalInformationStep = ({ formData, errors, handleInputChange, isEditMode }) => {
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
          <PersonIcon sx={{ fontSize: 28, color: theme.palette.primary.main }} />
          <Typography variant="h6" sx={{ 
            fontWeight: 600,
            ...(isRTL && { textAlign: 'right' }),
            ...(!isRTL && { textAlign: 'left' })
          }}>
            {t('personalInformation')}
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t('firstName')}
              value={formData.user.first_name}
              onChange={(e) => handleInputChange('user.first_name', e.target.value)}
              error={!!errors['user.first_name']}
              helperText={errors['user.first_name']}
              required
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t('lastName')}
              value={formData.user.last_name}
              onChange={(e) => handleInputChange('user.last_name', e.target.value)}
              error={!!errors['user.last_name']}
              helperText={errors['user.last_name']}
              required
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t('username')}
              value={formData.user.username}
              onChange={(e) => handleInputChange('user.username', e.target.value)}
              error={!!errors['user.username']}
              helperText={errors['user.username']}
              required
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t('password')}
              type="password"
              value={formData.user.password}
              onChange={(e) => handleInputChange('user.password', e.target.value)}
              error={!!errors['user.password']}
              helperText={isEditMode ? t('leaveBlankToKeepPassword') : errors['user.password']}
              required={!isEditMode}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t('phone')}
              value={formData.user.phone}
              onChange={(e) => handleInputChange('user.phone', e.target.value)}
              error={!!errors['user.phone']}
              helperText={errors['user.phone']}
              required
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t('nationalNo')}
              value={formData.national_no}
              onChange={(e) => handleInputChange('national_no', e.target.value)}
              error={!!errors.national_no}
              helperText={errors.national_no}
              required
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t('fatherName')}
              value={formData.father_name}
              onChange={(e) => handleInputChange('father_name', e.target.value)}
              error={!!errors.father_name}
              helperText={errors.father_name}
              required
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t('motherName')}
              value={formData.mother_name}
              onChange={(e) => handleInputChange('mother_name', e.target.value)}
              error={!!errors.mother_name}
              helperText={errors.mother_name}
              required
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t('nationality')}
              value={formData.nationality}
              onChange={(e) => handleInputChange('nationality', e.target.value)}
              error={!!errors.nationality}
              helperText={errors.nationality}
              required
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t('gender')}
              value={formData.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              error={!!errors.gender}
              helperText={errors.gender}
              required
              select
              SelectProps={{
                native: true,
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            >
              <option value="">{t('selectGender')}</option>
              <option value="male">{t('male')}</option>
              <option value="female">{t('female')}</option>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t('birthDate')}
              type="date"
              value={formData.birth_date}
              onChange={(e) => handleInputChange('birth_date', e.target.value)}
              error={!!errors.birth_date}
              helperText={errors.birth_date}
              required
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t('familyStatus')}
              value={formData.family_status}
              onChange={(e) => handleInputChange('family_status', e.target.value)}
              error={!!errors.family_status}
              helperText={errors.family_status}
              required
              select
              SelectProps={{
                native: true,
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            >
              <option value="">{t('selectFamilyStatus')}</option>
              <option value="single">{t('single')}</option>
              <option value="married">{t('married')}</option>
              <option value="divorced">{t('divorced')}</option>
              <option value="widowed">{t('widowed')}</option>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t('address')}
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              error={!!errors.address}
              helperText={errors.address}
              required
              multiline
              rows={3}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PersonalInformationStep; 