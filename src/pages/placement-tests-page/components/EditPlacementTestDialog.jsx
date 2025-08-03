import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Divider,
  Box,
  CircularProgress,
  Paper,
} from '@mui/material';
import { Save, Cancel } from '@mui/icons-material';
import PlacementTest from '../../../models/PlacementTest';

const EditPlacementTestDialog = ({ open, onClose, placementTest, onSave, loading }) => {
  const [formData, setFormData] = useState({
    placement_result: null,
    student_religion: '',
    student_card: {
      first_name: '',
      last_name: '',
      phone: '',
      nationality: '',
      gender: '',
      birth_date: '',
      birth_city: '',
      address: '',
      place_of_register: '',
      national_no: '',
    },
    parent1_job: '',
    parent1_card: {
      first_name: '',
      last_name: '',
      phone: '',
      nationality: '',
      gender: '',
      birth_date: '',
      birth_city: '',
      address: '',
      place_of_register: '',
      national_no: '',
    },
    parent2_job: '',
    parent2_card: {
      first_name: '',
      last_name: '',
      phone: '',
      nationality: '',
      gender: '',
      birth_date: '',
      birth_city: '',
      address: '',
      place_of_register: '',
      national_no: '',
    },
  });

  useEffect(() => {
    if (placementTest) {
      setFormData({
        placement_result: placementTest.placement_result,
        student_religion: placementTest.student_religion || '',
        student_card: {
          first_name: placementTest.student_card?.first_name || '',
          last_name: placementTest.student_card?.last_name || '',
          phone: placementTest.student_card?.phone || '',
          nationality: placementTest.student_card?.nationality || '',
          gender: placementTest.student_card?.gender || '',
          birth_date: placementTest.student_card?.birth_date || '',
          birth_city: placementTest.student_card?.birth_city || '',
          address: placementTest.student_card?.address || '',
          place_of_register: placementTest.student_card?.place_of_register || '',
          national_no: placementTest.student_card?.national_no || '',
        },
        parent1_job: placementTest.parent1_job || '',
        parent1_card: {
          first_name: placementTest.parent1_card?.first_name || '',
          last_name: placementTest.parent1_card?.last_name || '',
          phone: placementTest.parent1_card?.phone || '',
          nationality: placementTest.parent1_card?.nationality || '',
          gender: placementTest.parent1_card?.gender || '',
          birth_date: placementTest.parent1_card?.birth_date || '',
          birth_city: placementTest.parent1_card?.birth_city || '',
          address: placementTest.parent1_card?.address || '',
          place_of_register: placementTest.parent1_card?.place_of_register || '',
          national_no: placementTest.parent1_card?.national_no || '',
        },
        parent2_job: placementTest.parent2_job || '',
        parent2_card: {
          first_name: placementTest.parent2_card?.first_name || '',
          last_name: placementTest.parent2_card?.last_name || '',
          phone: placementTest.parent2_card?.phone || '',
          nationality: placementTest.parent2_card?.nationality || '',
          gender: placementTest.parent2_card?.gender || '',
          birth_date: placementTest.parent2_card?.birth_date || '',
          birth_city: placementTest.parent2_card?.birth_city || '',
          address: placementTest.parent2_card?.address || '',
          place_of_register: placementTest.parent2_card?.place_of_register || '',
          national_no: placementTest.parent2_card?.national_no || '',
        },
      });
    }
  }, [placementTest]);

  const handleInputChange = (section, field, value) => {
    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  const religions = ['christianity', 'islam', 'judaism', 'other'];
  const genders = ['male', 'female'];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h5" fontWeight="bold">
          Edit Placement Test Information
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Update placement test details and student information
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <Box sx={{ maxWidth: 600, mx: 'auto' }}>
          {/* Test Result Section */}
          <Paper elevation={0} sx={{ p: 3, mb: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
              Test Result
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Test Result</InputLabel>
              <Select
                value={formData.placement_result === null ? '' : formData.placement_result}
                label="Test Result"
                onChange={(e) => handleInputChange(null, 'placement_result', e.target.value)}
              >
                <MenuItem value={true}>Passed</MenuItem>
                <MenuItem value={false}>Failed</MenuItem>
              </Select>
            </FormControl>
          </Paper>

          {/* Student Information Section - Only show if result is true */}
          {formData.placement_result === true && (
            <Paper elevation={0} sx={{ p: 3, mb: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
                Student Information
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Religion</InputLabel>
                  <Select
                    value={formData.student_religion}
                    label="Religion"
                    onChange={(e) => handleInputChange(null, 'student_religion', e.target.value)}
                  >
                    {religions.map((religion) => (
                      <MenuItem key={religion} value={religion}>
                        {religion.charAt(0).toUpperCase() + religion.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    value={formData.student_card.gender}
                    label="Gender"
                    onChange={(e) => handleInputChange('student_card', 'gender', e.target.value)}
                    sx={{ borderRadius: 2 }}
                  >
                    {genders.map((gender) => (
                      <MenuItem key={gender} value={gender}>
                        {gender.charAt(0).toUpperCase() + gender.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="First Name"
                  value={formData.student_card.first_name}
                  onChange={(e) => handleInputChange('student_card', 'first_name', e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />

                <TextField
                  fullWidth
                  label="Last Name"
                  value={formData.student_card.last_name}
                  onChange={(e) => handleInputChange('student_card', 'last_name', e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />

                <TextField
                  fullWidth
                  label="Phone"
                  value={formData.student_card.phone}
                  onChange={(e) => handleInputChange('student_card', 'phone', e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />

                <TextField
                  fullWidth
                  label="Nationality"
                  value={formData.student_card.nationality}
                  onChange={(e) => handleInputChange('student_card', 'nationality', e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />

                <TextField
                  fullWidth
                  label="Birth Date"
                  type="date"
                  value={formData.student_card.birth_date}
                  onChange={(e) => handleInputChange('student_card', 'birth_date', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />

                <TextField
                  fullWidth
                  label="Birth City"
                  value={formData.student_card.birth_city}
                  onChange={(e) => handleInputChange('student_card', 'birth_city', e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />

                <TextField
                  fullWidth
                  label="Address"
                  value={formData.student_card.address}
                  onChange={(e) => handleInputChange('student_card', 'address', e.target.value)}
                  multiline
                  rows={3}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />

                <TextField
                  fullWidth
                  label="Place of Register"
                  value={formData.student_card.place_of_register}
                  onChange={(e) => handleInputChange('student_card', 'place_of_register', e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />

                <TextField
                  fullWidth
                  label="National ID"
                  value={formData.student_card.national_no}
                  onChange={(e) => handleInputChange('student_card', 'national_no', e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              </Box>
            </Paper>
          )}

          {/* Parent 1 Information Section - Only show if result is true */}
          {formData.placement_result === true && (
            <Paper elevation={0} sx={{ p: 3, mb: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
                Parent 1 Information
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Job"
                  value={formData.parent1_job}
                  onChange={(e) => handleInputChange(null, 'parent1_job', e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />

                <FormControl fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    value={formData.parent1_card.gender}
                    label="Gender"
                    onChange={(e) => handleInputChange('parent1_card', 'gender', e.target.value)}
                    sx={{ borderRadius: 2 }}
                  >
                    {genders.map((gender) => (
                      <MenuItem key={gender} value={gender}>
                        {gender.charAt(0).toUpperCase() + gender.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="First Name"
                  value={formData.parent1_card.first_name}
                  onChange={(e) => handleInputChange('parent1_card', 'first_name', e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />

                <TextField
                  fullWidth
                  label="Last Name"
                  value={formData.parent1_card.last_name}
                  onChange={(e) => handleInputChange('parent1_card', 'last_name', e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />

                <TextField
                  fullWidth
                  label="Phone"
                  value={formData.parent1_card.phone}
                  onChange={(e) => handleInputChange('parent1_card', 'phone', e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />

                <TextField
                  fullWidth
                  label="Nationality"
                  value={formData.parent1_card.nationality}
                  onChange={(e) => handleInputChange('parent1_card', 'nationality', e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />

                <TextField
                  fullWidth
                  label="Birth Date"
                  type="date"
                  value={formData.parent1_card.birth_date}
                  onChange={(e) => handleInputChange('parent1_card', 'birth_date', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />

                <TextField
                  fullWidth
                  label="Birth City"
                  value={formData.parent1_card.birth_city}
                  onChange={(e) => handleInputChange('parent1_card', 'birth_city', e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />

                <TextField
                  fullWidth
                  label="Address"
                  value={formData.parent1_card.address}
                  onChange={(e) => handleInputChange('parent1_card', 'address', e.target.value)}
                  multiline
                  rows={3}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />

                <TextField
                  fullWidth
                  label="Place of Register"
                  value={formData.parent1_card.place_of_register}
                  onChange={(e) => handleInputChange('parent1_card', 'place_of_register', e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />

                <TextField
                  fullWidth
                  label="National ID"
                  value={formData.parent1_card.national_no}
                  onChange={(e) => handleInputChange('parent1_card', 'national_no', e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              </Box>
            </Paper>
          )}

          {/* Parent 2 Information Section - Only show if result is true */}
          {formData.placement_result === true && (
            <Paper elevation={0} sx={{ p: 3, mb: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
                Parent 2 Information
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Job"
                  value={formData.parent2_job}
                  onChange={(e) => handleInputChange(null, 'parent2_job', e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />

                <FormControl fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    value={formData.parent2_card.gender}
                    label="Gender"
                    onChange={(e) => handleInputChange('parent2_card', 'gender', e.target.value)}
                    sx={{ borderRadius: 2 }}
                  >
                    {genders.map((gender) => (
                      <MenuItem key={gender} value={gender}>
                        {gender.charAt(0).toUpperCase() + gender.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="First Name"
                  value={formData.parent2_card.first_name}
                  onChange={(e) => handleInputChange('parent2_card', 'first_name', e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />

                <TextField
                  fullWidth
                  label="Last Name"
                  value={formData.parent2_card.last_name}
                  onChange={(e) => handleInputChange('parent2_card', 'last_name', e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />

                <TextField
                  fullWidth
                  label="Phone"
                  value={formData.parent2_card.phone}
                  onChange={(e) => handleInputChange('parent2_card', 'phone', e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />

                <TextField
                  fullWidth
                  label="Nationality"
                  value={formData.parent2_card.nationality}
                  onChange={(e) => handleInputChange('parent2_card', 'nationality', e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />

                <TextField
                  fullWidth
                  label="Birth Date"
                  type="date"
                  value={formData.parent2_card.birth_date}
                  onChange={(e) => handleInputChange('parent2_card', 'birth_date', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />

                <TextField
                  fullWidth
                  label="Birth City"
                  value={formData.parent2_card.birth_city}
                  onChange={(e) => handleInputChange('parent2_card', 'birth_city', e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />

                <TextField
                  fullWidth
                  label="Address"
                  value={formData.parent2_card.address}
                  onChange={(e) => handleInputChange('parent2_card', 'address', e.target.value)}
                  multiline
                  rows={3}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />

                <TextField
                  fullWidth
                  label="Place of Register"
                  value={formData.parent2_card.place_of_register}
                  onChange={(e) => handleInputChange('parent2_card', 'place_of_register', e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />

                <TextField
                  fullWidth
                  label="National ID"
                  value={formData.parent2_card.national_no}
                  onChange={(e) => handleInputChange('parent2_card', 'national_no', e.target.value)}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
              </Box>
            </Paper>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button onClick={onClose} startIcon={<Cancel />} variant="outlined" sx={{ borderRadius: 2 }}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : <Save />}
          sx={{ borderRadius: 2 }}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPlacementTestDialog; 