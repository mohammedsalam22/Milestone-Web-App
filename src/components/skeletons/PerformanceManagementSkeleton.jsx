import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Skeleton,
  Typography,
  Paper,
  Grid,
  Button,
  Chip,
  Avatar,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const PerformanceManagementSkeleton = ({ rows = 8 }) => {
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

  return (
    <>
      <style>{shimmerKeyframes}</style>
      <Box sx={{
        padding: theme.spacing(3),
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh',
      }}>
        {/* Header Skeleton */}
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
          p: 2,
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Skeleton 
              variant="circular" 
              width={32} 
              height={32} 
              sx={{ ...shimmerStyle, ...pulseStyle }}
            />
            <Box>
              <Skeleton 
                variant="text" 
                width={200} 
                height={32} 
                sx={{ mb: 0.5, ...shimmerStyle }}
              />
              <Skeleton 
                variant="text" 
                width={300} 
                height={16} 
                sx={{ ...shimmerStyle }}
              />
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Skeleton 
              variant="rectangular" 
              width={100} 
              height={36} 
              sx={{ borderRadius: 2, ...shimmerStyle }}
            />
            <Skeleton 
              variant="rectangular" 
              width={100} 
              height={36} 
              sx={{ borderRadius: 2, ...shimmerStyle }}
            />
          </Box>
        </Box>

        {/* Filters Skeleton */}
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={3}>
            {/* School Structure Button */}
            <Grid item xs={12} sm={6} md={4}>
              <Skeleton 
                variant="rectangular" 
                height={56} 
                sx={{ 
                  borderRadius: 2, 
                  border: 2, 
                  borderStyle: 'dashed',
                  ...shimmerStyle 
                }}
              />
            </Grid>
            
            {/* Subject Filter */}
            <Grid item xs={12} sm={6} md={3}>
              <Skeleton 
                variant="rectangular" 
                height={56} 
                sx={{ borderRadius: 2, ...shimmerStyle }}
              />
            </Grid>
            
            {/* Mark Type Filter */}
            <Grid item xs={12} sm={6} md={3}>
              <Skeleton 
                variant="rectangular" 
                height={56} 
                sx={{ borderRadius: 2, ...shimmerStyle }}
              />
            </Grid>
            
            {/* Search Button */}
            <Grid item xs={12} sm={6} md={2}>
              <Skeleton 
                variant="rectangular" 
                height={56} 
                sx={{ borderRadius: 2, ...shimmerStyle }}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Marks Table Skeleton */}
        <Paper elevation={2} sx={{ borderRadius: 2 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: theme.palette.grey[50] }}>
                  <TableCell sx={{ fontWeight: 600 }}>
                    <Skeleton 
                      variant="text" 
                      width={80} 
                      height={24} 
                      sx={{ ...shimmerStyle }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    <Skeleton 
                      variant="text" 
                      width={100} 
                      height={24} 
                      sx={{ ...shimmerStyle }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    <Skeleton 
                      variant="text" 
                      width={80} 
                      height={24} 
                      sx={{ ...shimmerStyle }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    <Skeleton 
                      variant="text" 
                      width={100} 
                      height={24} 
                      sx={{ ...shimmerStyle }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    <Skeleton 
                      variant="text" 
                      width={80} 
                      height={24} 
                      sx={{ ...shimmerStyle }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    <Skeleton 
                      variant="text" 
                      width={60} 
                      height={24} 
                      sx={{ ...shimmerStyle }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    <Skeleton 
                      variant="text" 
                      width={60} 
                      height={24} 
                      sx={{ ...shimmerStyle }}
                    />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.from({ length: rows }).map((_, index) => {
                  const delay = index * 0.1; // Staggered delay
                  const staggeredShimmerStyle = {
                    ...shimmerStyle,
                    animationDelay: `${delay}s`,
                  };
                  const staggeredPulseStyle = {
                    ...pulseStyle,
                    animationDelay: `${delay}s`,
                  };
                  
                  return (
                    <TableRow key={index}>
                      {/* Student Info */}
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Skeleton 
                            variant="circular" 
                            width={40} 
                            height={40} 
                            sx={{ ...staggeredShimmerStyle, ...staggeredPulseStyle }}
                          />
                          <Box>
                            <Skeleton 
                              variant="text" 
                              width={120} 
                              height={20} 
                              sx={{ mb: 0.5, ...staggeredShimmerStyle }}
                            />
                            <Skeleton 
                              variant="text" 
                              width={80} 
                              height={14} 
                              sx={{ ...staggeredShimmerStyle }}
                            />
                          </Box>
                        </Box>
                      </TableCell>
                      
                      {/* Subject */}
                      <TableCell>
                        <Skeleton 
                          variant="text" 
                          width={100} 
                          height={20} 
                          sx={{ ...staggeredShimmerStyle }}
                        />
                      </TableCell>
                      
                      {/* Grade */}
                      <TableCell>
                        <Skeleton 
                          variant="rectangular" 
                          width={60} 
                          height={24} 
                          sx={{ borderRadius: 12, ...staggeredShimmerStyle, ...staggeredPulseStyle }}
                        />
                      </TableCell>
                      
                      {/* Section */}
                      <TableCell>
                        <Skeleton 
                          variant="text" 
                          width={80} 
                          height={20} 
                          sx={{ ...staggeredShimmerStyle }}
                        />
                      </TableCell>
                      
                      {/* Mark Type */}
                      <TableCell>
                        <Skeleton 
                          variant="rectangular" 
                          width={70} 
                          height={24} 
                          sx={{ borderRadius: 12, ...staggeredShimmerStyle, ...staggeredPulseStyle }}
                        />
                      </TableCell>
                      
                      {/* Mark */}
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Skeleton 
                            variant="text" 
                            width={30} 
                            height={20} 
                            sx={{ ...staggeredShimmerStyle }}
                          />
                          <Skeleton 
                            variant="rectangular" 
                            width={40} 
                            height={20} 
                            sx={{ borderRadius: 10, ...staggeredShimmerStyle, ...staggeredPulseStyle }}
                          />
                        </Box>
                      </TableCell>
                      
                      {/* Actions */}
                      <TableCell>
                        <Skeleton 
                          variant="circular" 
                          width={32} 
                          height={32} 
                          sx={{ ...staggeredShimmerStyle, ...staggeredPulseStyle }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Action Buttons Skeleton (for Add Mode) */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          gap: 2, 
          mt: 3,
          p: 2,
          border: 1,
          borderColor: theme.palette.divider,
          borderRadius: 2,
          backgroundColor: theme.palette.background.paper
        }}>
          <Skeleton 
            variant="rectangular" 
            width={100} 
            height={36} 
            sx={{ borderRadius: 2, ...shimmerStyle }}
          />
          <Skeleton 
            variant="rectangular" 
            width={100} 
            height={36} 
            sx={{ borderRadius: 2, ...shimmerStyle }}
          />
        </Box>
      </Box>
    </>
  );
};

export default PerformanceManagementSkeleton;
