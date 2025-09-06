import React from 'react';
import {
  Box,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Skeleton,
  Typography,
  Grid,
  TextField,
  FormControl,
  Button,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const StudentRegistrationSkeleton = () => {
  const theme = useTheme();

  // Create shimmer animation keyframes
  const shimmerKeyframes = `
    @keyframes shimmer {
      0% {
        background-position: -200px 0;
        opacity: 1;
      }
      50% {
        opacity: 0.8;
      }
      100% {
        background-position: calc(200px + 100%) 0;
        opacity: 1;
      }
    }
    
    @keyframes pulse {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.6;
      }
      100% {
        opacity: 1;
      }
    }
  `;

  // Shimmer effect styles
  const shimmerStyle = {
    background: `linear-gradient(90deg, ${theme.palette.grey[200]} 25%, ${theme.palette.grey[100]} 50%, ${theme.palette.grey[200]} 75%)`,
    backgroundSize: '200px 100%',
    animation: 'shimmer 1.8s ease-in-out infinite',
  };

  // Pulse effect for interactive elements
  const pulseStyle = {
    animation: 'pulse 2s ease-in-out infinite',
  };

  const steps = [
    'Account Information',
    'Student Personal Information',
    'Parent 1 Information',
    'Parent 2 Information',
  ];

  return (
    <>
      <style>{shimmerKeyframes}</style>
      <Box sx={{
        padding: theme.spacing(3),
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh',
      }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Skeleton 
              variant="circular" 
              width={40} 
              height={40} 
              sx={{ mr: 2, ...shimmerStyle, ...pulseStyle }}
            />
            <Skeleton 
              variant="text" 
              width={200} 
              height={32} 
              sx={{ ...shimmerStyle }}
            />
          </Box>
        </Box>

        {/* Stepper */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Stepper activeStep={0} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>
                  <Skeleton 
                    variant="text" 
                    width={120} 
                    height={20} 
                    sx={{ ...shimmerStyle }}
                  />
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>

        {/* Form Content */}
        <Paper sx={{ p: 3 }}>
          <Card>
            <CardContent>
              {/* Section Title */}
              <Box sx={{ mb: 3 }}>
                <Skeleton 
                  variant="text" 
                  width={200} 
                  height={28} 
                  sx={{ mb: 1, ...shimmerStyle }}
                />
                <Skeleton 
                  variant="text" 
                  width={300} 
                  height={16} 
                  sx={{ ...shimmerStyle }}
                />
              </Box>

              <Divider sx={{ mb: 3 }} />

              {/* Form Fields */}
              <Grid container spacing={3}>
                {/* Row 1 */}
                <Grid item xs={12} md={6}>
                  <Skeleton 
                    variant="rectangular" 
                    height={56} 
                    sx={{ borderRadius: 1, ...shimmerStyle }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Skeleton 
                    variant="rectangular" 
                    height={56} 
                    sx={{ borderRadius: 1, ...shimmerStyle }}
                  />
                </Grid>

                {/* Row 2 */}
                <Grid item xs={12} md={6}>
                  <Skeleton 
                    variant="rectangular" 
                    height={56} 
                    sx={{ borderRadius: 1, ...shimmerStyle }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Skeleton 
                    variant="rectangular" 
                    height={56} 
                    sx={{ borderRadius: 1, ...shimmerStyle }}
                  />
                </Grid>

                {/* Row 3 */}
                <Grid item xs={12} md={6}>
                  <Skeleton 
                    variant="rectangular" 
                    height={56} 
                    sx={{ borderRadius: 1, ...shimmerStyle }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Skeleton 
                    variant="rectangular" 
                    height={56} 
                    sx={{ borderRadius: 1, ...shimmerStyle }}
                  />
                </Grid>

                {/* Row 4 */}
                <Grid item xs={12} md={6}>
                  <Skeleton 
                    variant="rectangular" 
                    height={56} 
                    sx={{ borderRadius: 1, ...shimmerStyle }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Skeleton 
                    variant="rectangular" 
                    height={56} 
                    sx={{ borderRadius: 1, ...shimmerStyle }}
                  />
                </Grid>

                {/* Row 5 - Full width */}
                <Grid item xs={12}>
                  <Skeleton 
                    variant="rectangular" 
                    height={56} 
                    sx={{ borderRadius: 1, ...shimmerStyle }}
                  />
                </Grid>

                {/* Row 6 */}
                <Grid item xs={12} md={6}>
                  <Skeleton 
                    variant="rectangular" 
                    height={56} 
                    sx={{ borderRadius: 1, ...shimmerStyle }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Skeleton 
                    variant="rectangular" 
                    height={56} 
                    sx={{ borderRadius: 1, ...shimmerStyle }}
                  />
                </Grid>

                {/* Row 7 */}
                <Grid item xs={12} md={6}>
                  <Skeleton 
                    variant="rectangular" 
                    height={56} 
                    sx={{ borderRadius: 1, ...shimmerStyle }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Skeleton 
                    variant="rectangular" 
                    height={56} 
                    sx={{ borderRadius: 1, ...shimmerStyle }}
                  />
                </Grid>

                {/* Row 8 - Full width */}
                <Grid item xs={12}>
                  <Skeleton 
                    variant="rectangular" 
                    height={80} 
                    sx={{ borderRadius: 1, ...shimmerStyle }}
                  />
                </Grid>
              </Grid>

              {/* Action Buttons */}
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                mt: 4,
                pt: 3,
                borderTop: `1px solid ${theme.palette.divider}`
              }}>
                <Skeleton 
                  variant="rectangular" 
                  width={100} 
                  height={40} 
                  sx={{ borderRadius: 2, ...shimmerStyle, ...pulseStyle }}
                />
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Skeleton 
                    variant="rectangular" 
                    width={100} 
                    height={40} 
                    sx={{ borderRadius: 2, ...shimmerStyle, ...pulseStyle }}
                  />
                  <Skeleton 
                    variant="rectangular" 
                    width={120} 
                    height={40} 
                    sx={{ borderRadius: 2, ...shimmerStyle, ...pulseStyle }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Paper>
      </Box>
    </>
  );
};

export default StudentRegistrationSkeleton;
