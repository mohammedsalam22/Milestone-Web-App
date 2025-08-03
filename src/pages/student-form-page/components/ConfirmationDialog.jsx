import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import {
  Warning,
  Save,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const ConfirmationDialog = ({
  showConfirmDialog,
  setShowConfirmDialog,
  handleSubmit,
  isEditing,
  formData,
  sections,
}) => {
  const theme = useTheme();

  return (
    <Dialog
      open={showConfirmDialog}
      onClose={() => setShowConfirmDialog(false)}
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
        <Warning color="warning" />
        Confirm Student {isEditing ? 'Update' : 'Creation'}
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ mb: 2 }}>
          Are you sure you want to {isEditing ? 'update' : 'create'} this student? Please review all the information before proceeding.
        </Typography>
        <Box sx={{ 
          mt: 3, 
          p: 3, 
          bgcolor: theme.palette.background.paper, 
          borderRadius: 2,
          border: `1px solid ${theme.palette.divider}`
        }}>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
            Student: {formData.card.first_name} {formData.card.last_name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Username: {formData.username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Section: {sections.find(s => s.id === formData.section_id)?.grade?.name} - Section {sections.find(s => s.id === formData.section_id)?.name}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button 
          onClick={() => setShowConfirmDialog(false)}
          sx={{ borderRadius: 2, px: 3 }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          startIcon={<Save />}
          sx={{ 
            borderRadius: 2, 
            px: 3,
            fontWeight: 600
          }}
        >
          {isEditing ? 'Update Student' : 'Create Student'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog; 