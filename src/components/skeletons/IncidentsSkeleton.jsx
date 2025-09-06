import React from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Skeleton,
  Typography,
  Avatar,
  AvatarGroup,
  Chip,
  Grid,
  TextField,
  FormControl,
  Button,
  IconButton,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const IncidentsSkeleton = ({ rows = 8 }) => {
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
        <Box sx={{ mb: 3 }}>
          {/* Title and Create Button */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 3,
          }}>
            <Box>
              <Skeleton 
                variant="text" 
                width={120} 
                height={40} 
                sx={{ mb: 0.5, ...shimmerStyle }}
              />
              <Skeleton 
                variant="text" 
                width={300} 
                height={16} 
                sx={{ ...shimmerStyle }}
              />
            </Box>
            <Skeleton 
              variant="rectangular" 
              width={120} 
              height={40} 
              sx={{ borderRadius: 2, ...shimmerStyle }}
            />
          </Box>

          {/* Filters and Search */}
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <Skeleton 
                variant="rectangular" 
                height={56} 
                sx={{ borderRadius: 2, ...shimmerStyle }}
              />
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Skeleton 
                variant="rectangular" 
                height={56} 
                sx={{ borderRadius: 2, ...shimmerStyle }}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Skeleton 
                variant="rectangular" 
                height={56} 
                sx={{ borderRadius: 2, ...shimmerStyle }}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Skeleton 
                  variant="rectangular" 
                  width={80} 
                  height={32} 
                  sx={{ borderRadius: 2, ...shimmerStyle, ...pulseStyle }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Table Skeleton */}
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: theme.shadows[2] }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: theme.palette.background.default }}>
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
                    width={60} 
                    height={24} 
                    sx={{ ...shimmerStyle }}
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }}>
                  <Skeleton 
                    variant="text" 
                    width={70} 
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
                    {/* Incident Column */}
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Skeleton 
                          variant="circular" 
                          width={40} 
                          height={40} 
                          sx={{ ...staggeredShimmerStyle, ...staggeredPulseStyle }}
                        />
                        <Box sx={{ flex: 1 }}>
                          <Skeleton 
                            variant="text" 
                            width={150} 
                            height={20} 
                            sx={{ mb: 0.5, ...staggeredShimmerStyle }}
                          />
                          <Skeleton 
                            variant="text" 
                            width={200} 
                            height={14} 
                            sx={{ ...staggeredShimmerStyle }}
                          />
                        </Box>
                        <Skeleton 
                          variant="rectangular" 
                          width={60} 
                          height={24} 
                          sx={{ borderRadius: 12, ...staggeredShimmerStyle, ...staggeredPulseStyle }}
                        />
                      </Box>
                    </TableCell>
                    
                    {/* Students Column */}
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ display: 'flex', gap: -0.5 }}>
                          <Skeleton 
                            variant="circular" 
                            width={32} 
                            height={32} 
                            sx={{ ...staggeredShimmerStyle, ...staggeredPulseStyle }}
                          />
                          <Skeleton 
                            variant="circular" 
                            width={32} 
                            height={32} 
                            sx={{ ...staggeredShimmerStyle, ...staggeredPulseStyle }}
                          />
                          <Skeleton 
                            variant="circular" 
                            width={32} 
                            height={32} 
                            sx={{ ...staggeredShimmerStyle, ...staggeredPulseStyle }}
                          />
                        </Box>
                        <Skeleton 
                          variant="text" 
                          width={60} 
                          height={16} 
                          sx={{ ...staggeredShimmerStyle }}
                        />
                      </Box>
                    </TableCell>
                    
                    {/* Procedure Column */}
                    <TableCell>
                      <Skeleton 
                        variant="text" 
                        width={120} 
                        height={16} 
                        sx={{ ...staggeredShimmerStyle }}
                      />
                    </TableCell>
                    
                    {/* Date Column */}
                    <TableCell>
                      <Skeleton 
                        variant="text" 
                        width={100} 
                        height={16} 
                        sx={{ ...staggeredShimmerStyle }}
                      />
                    </TableCell>
                    
                    {/* Actions Column */}
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Skeleton 
                          variant="circular" 
                          width={32} 
                          height={32} 
                          sx={{ ...staggeredShimmerStyle, ...staggeredPulseStyle }}
                        />
                        <Skeleton 
                          variant="circular" 
                          width={32} 
                          height={32} 
                          sx={{ ...staggeredShimmerStyle, ...staggeredPulseStyle }}
                        />
                        <Skeleton 
                          variant="circular" 
                          width={32} 
                          height={32} 
                          sx={{ ...staggeredShimmerStyle, ...staggeredPulseStyle }}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default IncidentsSkeleton;
