import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Stack,
  IconButton,
} from '@mui/material';
import {
  Assignment,
  School,
  Grade,
  Class,
  CalendarToday,
  Cake,
  LocationOn,
  Flag,
  AutoAwesome,
  Edit,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import InfoItem from './InfoItem';

const AcademicPersonalInfo = ({ student }) => {
  const theme = useTheme();

  return (
    <Card elevation={4} sx={{ backgroundColor: 'transparent' }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ 
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              borderRadius: 2,
              p: 1.5,
              mr: 2,
              boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
            }}>
              <Assignment sx={{ color: 'white', fontSize: 24 }} />
            </Box>
            <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
              Academic & Personal Information
            </Typography>
          </Box>
          <IconButton 
            size="small"
            sx={{
              background: theme.palette.background.paper,
              '&:hover': {
                background: theme.palette.action.hover,
                transform: 'scale(1.1)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            <Edit fontSize="small" />
          </IconButton>
        </Box>
        
        <Grid container spacing={3}>
          {/* Academic Information */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: theme.palette.primary.main }}>
              Academic Information
            </Typography>
            <Stack spacing={2}>
              <InfoItem
                icon={<School />}
                label="Study Stage"
                value={student.getStudyStage()}
                iconColor={theme.palette.primary.main}
              />
              
              <InfoItem
                icon={<Grade />}
                label="Grade"
                value={student.section?.grade?.name}
                iconColor={theme.palette.primary.main}
              />
              
              <InfoItem
                icon={<Class />}
                label="Section"
                value={student.section?.name}
                iconColor={theme.palette.primary.main}
              />
              
              <InfoItem
                icon={<CalendarToday />}
                label="Study Year"
                value={student.getStudyYear()}
                iconColor={theme.palette.primary.main}
              />
            </Stack>
          </Grid>
          
          {/* Personal Information */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: theme.palette.secondary.main }}>
              Personal Information
            </Typography>
            <Stack spacing={2}>
              <InfoItem
                icon={<Cake />}
                label="Birth Date"
                value={student.getFormattedBirthDate()}
                iconColor={theme.palette.secondary.main}
              />
              
              <InfoItem
                icon={<LocationOn />}
                label="Birth City"
                value={student.card?.birth_city}
                iconColor={theme.palette.secondary.main}
              />
              
              <InfoItem
                icon={<Flag />}
                label="Nationality"
                value={student.getFormattedNationality()}
                iconColor={theme.palette.secondary.main}
              />
              
              <InfoItem
                icon={<AutoAwesome />}
                label="Religion"
                value={student.getFormattedReligion()}
                iconColor={theme.palette.secondary.main}
              />
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AcademicPersonalInfo; 