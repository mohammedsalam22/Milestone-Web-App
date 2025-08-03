import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Avatar,
  Chip,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';
import {
  ArrowBack,
  Person,
  Cake,
  Email,
  Phone,
  CalendarToday,
  LocationOn,
  Edit,
  Delete,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const StudentProfileHeader = ({ student, onBack, onEdit, onDelete }) => {
  const theme = useTheme();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const getGenderIcon = (gender) => {
    return gender?.toLowerCase() === 'male' ? <Person /> : <Person />;
  };

  const getGenderColor = (gender) => {
    return gender?.toLowerCase() === 'male' ? 'primary' : 'secondary';
  };

  return (
    <Box sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
      {/* Navigation Bar */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        p: 2,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton 
            onClick={onBack} 
            sx={{ 
              color: theme.palette.text.secondary,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}>
            Back to Students
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<Edit />}
            onClick={onEdit}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
              fontSize: '14px',
              fontWeight: 500,
            }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Delete />}
            onClick={() => setShowDeleteDialog(true)}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
              fontSize: '14px',
              fontWeight: 500,
            }}
          >
            Delete
          </Button>
          <Chip
            icon={getGenderIcon(student.card?.gender)}
            label={student.getFormattedGender()}
            color={getGenderColor(student.card?.gender)}
            size="small"
            sx={{ fontWeight: 500 }}
          />
        </Box>
      </Box>

      {/* Student Profile Header */}
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3} alignItems="center">
          {/* Profile Picture */}
          <Grid item xs={12} sm={3} md={2}>
            <Box sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  mx: 'auto',
                  mb: 1,
                  fontSize: '2.5rem',
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                  boxShadow: theme.shadows[4],
                }}
              >
                {student.getFullName().charAt(0)}
              </Avatar>
            </Box>
          </Grid>

          {/* Student Info */}
          <Grid item xs={12} sm={9} md={10}>
            <Typography variant="h4" component="h1" sx={{ 
              fontWeight: 700, 
              mb: 1,
              color: theme.palette.text.primary,
            }}>
              {student.getFullName()}
            </Typography>
            
            <Typography variant="h6" sx={{ 
              color: theme.palette.text.secondary,
              fontWeight: 500,
              mb: 2,
            }}>
              {student.getGradeSection()}
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Chip
                icon={<Cake />}
                label={`${student.getAge() || 'N/A'} years old`}
                size="small"
                sx={{ 
                  backgroundColor: theme.palette.background.default,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              />
              <Chip
                icon={<Email />}
                label={student.card?.email || 'N/A'}
                size="small"
                sx={{ 
                  backgroundColor: theme.palette.background.default,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              />
              <Chip
                icon={<Phone />}
                label={student.card?.phone || 'N/A'}
                size="small"
                sx={{ 
                  backgroundColor: theme.palette.background.default,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              />
              <Chip
                icon={<CalendarToday />}
                label={student.getFormattedRegisterDate()}
                size="small"
                sx={{ 
                  backgroundColor: theme.palette.background.default,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              />
              <Chip
                icon={<LocationOn />}
                label={student.card?.address || 'N/A'}
                size="small"
                sx={{ 
                  backgroundColor: theme.palette.background.default,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          fontWeight: 600
        }}>
          <Delete color="error" />
          Confirm Student Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Are you sure you want to delete <strong>{student.getFullName()}</strong>? 
            This action cannot be undone and will permanently remove all student data.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={() => setShowDeleteDialog(false)}
            sx={{ borderRadius: 2, px: 3 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={() => {
              setShowDeleteDialog(false);
              onDelete();
            }}
            variant="contained" 
            color="error"
            sx={{ 
              borderRadius: 2, 
              px: 3,
              fontWeight: 600
            }}
          >
            Delete Student
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentProfileHeader; 