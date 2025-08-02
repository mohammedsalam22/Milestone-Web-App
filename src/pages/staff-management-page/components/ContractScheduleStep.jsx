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
import { Schedule as ScheduleIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const ContractScheduleStep = ({ formData, errors, handleInputChange }) => {
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
          <ScheduleIcon sx={{ fontSize: 28, color: theme.palette.primary.main }} />
          <Typography variant="h6" sx={{ 
            fontWeight: 600,
            ...(isRTL && { textAlign: 'right' }),
            ...(!isRTL && { textAlign: 'left' })
          }}>
            {t('contractSchedule')}
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t('contractStartDate')}
              type="date"
              value={formData.contract_start}
              onChange={(e) => handleInputChange('contract_start', e.target.value)}
              error={!!errors.contract_start}
              helperText={errors.contract_start}
              required
              InputLabelProps={{ shrink: true }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t('contractEndDate')}
              type="date"
              value={formData.contract_end}
              onChange={(e) => handleInputChange('contract_end', e.target.value)}
              error={!!errors.contract_end}
              helperText={errors.contract_end}
              required
              InputLabelProps={{ shrink: true }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t('dayStartTime')}
              type="time"
              value={formData.day_start}
              onChange={(e) => handleInputChange('day_start', e.target.value)}
              error={!!errors.day_start}
              helperText={errors.day_start}
              required
              InputLabelProps={{ shrink: true }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t('dayEndTime')}
              type="time"
              value={formData.day_end}
              onChange={(e) => handleInputChange('day_end', e.target.value)}
              error={!!errors.day_end}
              helperText={errors.day_end}
              required
              InputLabelProps={{ shrink: true }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ContractScheduleStep; 