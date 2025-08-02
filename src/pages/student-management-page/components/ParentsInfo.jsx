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
  FamilyRestroom,
  Person,
  Work,
  Phone,
  Flag,
  Cake,
  LocationOn,
  CalendarToday,
  MoreVert,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import InfoItem from './InfoItem';

const ParentsInfo = ({ student }) => {
  const theme = useTheme();

  const formatParentBirthDate = (birthDate) => {
    return birthDate ? new Date(birthDate).toLocaleDateString() : 'N/A';
  };

  return (
    <Card elevation={4} sx={{ backgroundColor: 'transparent' }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ 
              background: `linear-gradient(135deg, ${theme.palette.info.main} 0%, ${theme.palette.info.dark} 100%)`,
              borderRadius: 2,
              p: 1.5,
              mr: 2,
              boxShadow: `0 4px 12px ${theme.palette.info.main}40`,
            }}>
              <FamilyRestroom sx={{ color: 'white', fontSize: 24 }} />
            </Box>
            <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
              Parents Information
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
            <MoreVert fontSize="small" />
          </IconButton>
        </Box>
        
        <Grid container spacing={3}>
          {/* Parent 1 */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: theme.palette.info.main }}>
              Parent 1
            </Typography>
            <Stack spacing={2}>
              <InfoItem
                icon={<Person />}
                label="Name"
                value={student.getParent1Name()}
                iconColor={theme.palette.info.main}
                minWidth={80}
              />
              
              <InfoItem
                icon={<Work />}
                label="Job"
                value={student.parent1?.job}
                iconColor={theme.palette.info.main}
                minWidth={80}
              />
              
              <InfoItem
                icon={<Phone />}
                label="Phone"
                value={student.parent1?.card?.phone}
                iconColor={theme.palette.info.main}
                minWidth={80}
              />
              
              <InfoItem
                icon={<Flag />}
                label="Nationality"
                value={student.parent1?.card?.nationality}
                iconColor={theme.palette.info.main}
                minWidth={80}
              />
              
              <InfoItem
                icon={<Cake />}
                label="Birth Date"
                value={formatParentBirthDate(student.parent1?.card?.birth_date)}
                iconColor={theme.palette.info.main}
                minWidth={80}
              />
              
              <InfoItem
                icon={<LocationOn />}
                label="Birth City"
                value={student.parent1?.card?.birth_city}
                iconColor={theme.palette.info.main}
                minWidth={80}
              />
              
              <InfoItem
                icon={<CalendarToday />}
                label="National No"
                value={student.parent1?.card?.national_no}
                iconColor={theme.palette.info.main}
                minWidth={80}
              />
            </Stack>
          </Grid>
          
          {/* Parent 2 */}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: theme.palette.warning.main }}>
              Parent 2
            </Typography>
            <Stack spacing={2}>
              <InfoItem
                icon={<Person />}
                label="Name"
                value={student.getParent2Name()}
                iconColor={theme.palette.warning.main}
                minWidth={80}
              />
              
              <InfoItem
                icon={<Work />}
                label="Job"
                value={student.parent2?.job}
                iconColor={theme.palette.warning.main}
                minWidth={80}
              />
              
              <InfoItem
                icon={<Phone />}
                label="Phone"
                value={student.parent2?.card?.phone}
                iconColor={theme.palette.warning.main}
                minWidth={80}
              />
              
              <InfoItem
                icon={<Flag />}
                label="Nationality"
                value={student.parent2?.card?.nationality}
                iconColor={theme.palette.warning.main}
                minWidth={80}
              />
              
              <InfoItem
                icon={<Cake />}
                label="Birth Date"
                value={formatParentBirthDate(student.parent2?.card?.birth_date)}
                iconColor={theme.palette.warning.main}
                minWidth={80}
              />
              
              <InfoItem
                icon={<LocationOn />}
                label="Birth City"
                value={student.parent2?.card?.birth_city}
                iconColor={theme.palette.warning.main}
                minWidth={80}
              />
              
              <InfoItem
                icon={<CalendarToday />}
                label="National No"
                value={student.parent2?.card?.national_no}
                iconColor={theme.palette.warning.main}
                minWidth={80}
              />
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ParentsInfo; 