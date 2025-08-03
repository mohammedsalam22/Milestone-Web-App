import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ConfirmationDialog = ({
  showConfirmDialog,
  setShowConfirmDialog,
  handleSubmit,
  isEditing,
  formData,
}) => {
  const theme = useTheme();

  const handleClose = () => {
    setShowConfirmDialog(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString();
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'Not specified';
    return timeString;
  };

  return (
    <Dialog
      open={showConfirmDialog}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: theme.shadows[8],
        },
      }}
    >
      <DialogTitle sx={{ 
        pb: 1,
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.primary.main,
        color: 'white'
      }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Confirm {isEditing ? 'Update' : 'Creation'}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
          Please review the information before {isEditing ? 'updating' : 'creating'} the staff member
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 3 }}>
          {/* Account Information */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main, fontWeight: 600 }}>
              Account Information
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2">
                <strong>Username:</strong> {formData.username}
              </Typography>
              <Typography variant="body2">
                <strong>First Name:</strong> {formData.first_name}
              </Typography>
              <Typography variant="body2">
                <strong>Last Name:</strong> {formData.last_name}
              </Typography>
              <Typography variant="body2">
                <strong>Phone:</strong> {formData.phone}
              </Typography>
            </Box>
          </Box>

          {/* Personal Information */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main, fontWeight: 600 }}>
              Personal Information
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2">
                <strong>National No:</strong> {formData.national_no}
              </Typography>
              <Typography variant="body2">
                <strong>Father Name:</strong> {formData.father_name}
              </Typography>
              <Typography variant="body2">
                <strong>Mother Name:</strong> {formData.mother_name}
              </Typography>
              <Typography variant="body2">
                <strong>Nationality:</strong> {formData.nationality}
              </Typography>
              <Typography variant="body2">
                <strong>Gender:</strong> {formData.gender}
              </Typography>
              <Typography variant="body2">
                <strong>Birth Date:</strong> {formatDate(formData.birth_date)}
              </Typography>
              <Typography variant="body2">
                <strong>Family Status:</strong> {formData.family_status}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ gridColumn: 'span 2', my: 2 }} />

          {/* Work Details */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main, fontWeight: 600 }}>
              Work Details
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2">
                <strong>Role:</strong> {formData.role}
              </Typography>
              <Typography variant="body2">
                <strong>Salary:</strong> {formData.salary}
              </Typography>
              {formData.role === 'teacher' && (
                <Typography variant="body2">
                  <strong>Subjects:</strong> {formData.subjectIDs.length > 0 ? `${formData.subjectIDs.length} subject(s)` : 'No subjects selected'}
                </Typography>
              )}
            </Box>
          </Box>

          {/* Contract & Schedule */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main, fontWeight: 600 }}>
              Contract & Schedule
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2">
                <strong>Contract Start:</strong> {formatDate(formData.contract_start)}
              </Typography>
              <Typography variant="body2">
                <strong>Contract End:</strong> {formatDate(formData.contract_end)}
              </Typography>
              <Typography variant="body2">
                <strong>Work Start:</strong> {formatTime(formData.day_start)}
              </Typography>
              <Typography variant="body2">
                <strong>Work End:</strong> {formatTime(formData.day_end)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 2 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{ 
            borderRadius: 2,
            px: 3,
            py: 1.5
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ 
            borderRadius: 2,
            px: 3,
            py: 1.5,
            fontWeight: 600
          }}
        >
          {isEditing ? 'Update Staff Member' : 'Create Staff Member'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog; 