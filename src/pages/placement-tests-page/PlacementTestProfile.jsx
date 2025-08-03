import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Avatar,
  Divider,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  CircularProgress,
  Skeleton,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  ArrowBack,
  CheckCircle,
  Cancel,
  Schedule,
  Male,
  Female,
  Person,
  School,
  Work,
  Phone,
  Email,
  LocationOn,
  CalendarToday,
  Edit,
  Save,
  PersonAdd,
} from '@mui/icons-material';
import { updatePlacementTest, registerStudent } from '../../featuers/placement-tests-slice/placementTestsSlice';
import { fetchSections } from '../../featuers/sections-slice/sectionsSlice';
import PlacementTest from '../../models/PlacementTest';
import EditPlacementTestDialog from './components/EditPlacementTestDialog';

const PlacementTestProfile = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const { placementTests, updateLoading, registerLoading, error } = useSelector((state) => state.placementTests);
  const { sections } = useSelector((state) => state.sections);
  
  const [placementTest, setPlacementTest] = useState(null);
  const [editDialog, setEditDialog] = useState(false);
  const [registerDialog, setRegisterDialog] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    section_id: '',
    username: '',
    password: '',
  });

  useEffect(() => {
    const test = placementTests.find(t => t.id === parseInt(id));
    if (test) {
      setPlacementTest(test);
    }
  }, [placementTests, id]);

  useEffect(() => {
    dispatch(fetchSections());
  }, [dispatch]);

  const handleUpdatePlacementTest = async (placementData) => {
    await dispatch(updatePlacementTest({ id: parseInt(id), placementData }));
    setEditDialog(false);
  };

  const handleRegisterStudent = async () => {
    if (registrationData.section_id && registrationData.username && registrationData.password) {
      await dispatch(registerStudent({
        id: parseInt(id),
        section_id: parseInt(registrationData.section_id),
        username: registrationData.username,
        password: registrationData.password,
        religion: placementTest.student_religion,
      }));
      setRegisterDialog(false);
      navigate('/placement-tests');
    }
  };

  const getResultIcon = (placementResult) => {
    const placementTestModel = new PlacementTest({ placement_result: placementResult });
    const status = placementTestModel.getResultStatus();
    switch (status) {
      case 'passed':
        return <CheckCircle />;
      case 'failed':
        return <Cancel />;
      default:
        return <Schedule />;
    }
  };

  const getResultColor = (placementResult) => {
    const placementTestModel = new PlacementTest({ placement_result: placementResult });
    const status = placementTestModel.getResultStatus();
    switch (status) {
      case 'passed':
        return 'success';
      case 'failed':
        return 'error';
      default:
        return 'warning';
    }
  };

  const getGenderIcon = (gender) => {
    return gender?.toLowerCase() === 'male' ? <Male /> : <Female />;
  };

  const getGenderColor = (gender) => {
    return gender?.toLowerCase() === 'male' ? 'primary' : 'secondary';
  };

  if (!placementTest) {
    return (
      <Box sx={{ p: 3 }}>
        <Skeleton variant="rectangular" height={400} />
      </Box>
    );
  }

  const placementTestModel = new PlacementTest(placementTest);

  return (
    <Box sx={{ p: 3, backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/placement-tests')}
          variant="outlined"
          sx={{ borderRadius: 2 }}
        >
          Back to Student Registration
        </Button>
        <Typography variant="h4" component="h1">
          Student Registration Profile
        </Typography>
      </Box>

      {/* Error Display */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Student Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    bgcolor: theme.palette.primary.main,
                    mr: 2,
                  }}
                >
                  {placementTestModel.getStudentFullName().charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {placementTestModel.getStudentFullName()}
                  </Typography>
                  <Chip
                    icon={getResultIcon(placementTest.placement_result)}
                    label={placementTestModel.getResultStatus().toUpperCase()}
                    color={getResultColor(placementTest.placement_result)}
                    sx={{ mt: 1 }}
                  />
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom>
                Student Information
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Gender</Typography>
                  <Chip
                    icon={getGenderIcon(placementTest.student_card?.gender)}
                    label={placementTest.student_card?.gender || 'N/A'}
                    color={getGenderColor(placementTest.student_card?.gender)}
                    size="small"
                    sx={{ mt: 0.5 }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Religion</Typography>
                  <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                    {placementTest.student_religion || 'N/A'}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Birth Date</Typography>
                  <Typography variant="body1">
                    {placementTestModel.getStudentBirthDate()}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Age</Typography>
                  <Typography variant="body1">
                    {placementTestModel.getAge()}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Nationality</Typography>
                  <Typography variant="body1">
                    {placementTestModel.getStudentNationality()}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Phone</Typography>
                  <Typography variant="body1">
                    {placementTestModel.getStudentPhone()}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">Address</Typography>
                  <Typography variant="body1">
                    {placementTestModel.getStudentAddress()}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Birth City</Typography>
                  <Typography variant="body1">
                    {placementTestModel.getStudentBirthCity()}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">National ID</Typography>
                  <Typography variant="body1">
                    {placementTestModel.getStudentNationalId()}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Parents Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Parents Information
              </Typography>

              {/* Parent 1 */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Parent 1
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">Name</Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {placementTestModel.getParent1FullName()}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Job</Typography>
                    <Typography variant="body1">
                      {placementTest.parent1_job || 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Phone</Typography>
                    <Typography variant="body1">
                      {placementTestModel.getParent1Phone()}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Parent 2 */}
              <Box>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Parent 2
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">Name</Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {placementTestModel.getParent2FullName()}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Job</Typography>
                    <Typography variant="body1">
                      {placementTest.parent2_job || 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">Phone</Typography>
                    <Typography variant="body1">
                      {placementTestModel.getParent2Phone()}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Actions */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Actions
              </Typography>
                             <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                 <Button
                   variant="outlined"
                   startIcon={<Edit />}
                   onClick={() => setEditDialog(true)}
                   disabled={updateLoading}
                   sx={{ borderRadius: 2 }}
                 >
                   Edit Information
                 </Button>
                 
                 {placementTest.placement_result === true && (
                   <Button
                     variant="contained"
                     color="success"
                     startIcon={<PersonAdd />}
                     onClick={() => setRegisterDialog(true)}
                     disabled={registerLoading}
                     sx={{ borderRadius: 2 }}
                   >
                     Register Student
                   </Button>
                 )}
               </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Edit Placement Test Dialog */}
      <EditPlacementTestDialog
        open={editDialog}
        onClose={() => setEditDialog(false)}
        placementTest={placementTest}
        onSave={handleUpdatePlacementTest}
        loading={updateLoading}
      />

      {/* Register Student Dialog */}
      <Dialog open={registerDialog} onClose={() => setRegisterDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Register Student</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Register {placementTestModel.getStudentFullName()} as a student in the school.
          </Typography>
          
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Section</InputLabel>
            <Select
              value={registrationData.section_id}
              label="Section"
              onChange={(e) => setRegistrationData({ ...registrationData, section_id: e.target.value })}
              sx={{ borderRadius: 2 }}
            >
              {sections.map((section) => (
                <MenuItem key={section.id} value={section.id}>
                  {section.grade?.name} - Section {section.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Username"
            value={registrationData.username}
            onChange={(e) => setRegistrationData({ ...registrationData, username: e.target.value })}
            sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            value={registrationData.password}
            onChange={(e) => setRegistrationData({ ...registrationData, password: e.target.value })}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRegisterDialog(false)} sx={{ borderRadius: 2 }}>Cancel</Button>
          <Button
            onClick={handleRegisterStudent}
            variant="contained"
            color="success"
            disabled={registerLoading || !registrationData.section_id || !registrationData.username || !registrationData.password}
            startIcon={registerLoading ? <CircularProgress size={20} /> : <PersonAdd />}
            sx={{ borderRadius: 2 }}
          >
            {registerLoading ? 'Registering...' : 'Register Student'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PlacementTestProfile; 