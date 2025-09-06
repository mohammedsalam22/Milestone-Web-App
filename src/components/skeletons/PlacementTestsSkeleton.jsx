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
  TablePagination,
  Skeleton,
  Typography,
  Avatar,
  Chip,
  Grid,
  TextField,
  FormControl,
  Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const PlacementTestsSkeleton = ({ rows = 8 }) => {
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
          {/* Title */}
          <Box sx={{ mb: 3 }}>
            <Skeleton 
              variant="text" 
              width={200} 
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

          {/* Filters and Search */}
          <Paper sx={{ p: 2, mb: 2 }}>
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
          </Paper>
        </Box>

        {/* Results Count */}
        <Box sx={{ mb: 2 }}>
          <Skeleton 
            variant="text" 
            width={200} 
            height={20} 
            sx={{ ...shimmerStyle }}
          />
        </Box>

        {/* Table Skeleton */}
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: theme.shadows[2] }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: theme.palette.background.default }}>
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
                    {/* Student Name Column */}
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
                    
                    {/* Gender Column */}
                    <TableCell>
                      <Skeleton 
                        variant="rectangular" 
                        width={60} 
                        height={24} 
                        sx={{ borderRadius: 12, ...staggeredShimmerStyle, ...staggeredPulseStyle }}
                      />
                    </TableCell>
                    
                    {/* Age Column */}
                    <TableCell>
                      <Skeleton 
                        variant="text" 
                        width={40} 
                        height={20} 
                        sx={{ ...staggeredShimmerStyle }}
                      />
                    </TableCell>
                    
                    {/* Religion Column */}
                    <TableCell>
                      <Skeleton 
                        variant="rectangular" 
                        width={80} 
                        height={24} 
                        sx={{ borderRadius: 12, ...staggeredShimmerStyle, ...staggeredPulseStyle }}
                      />
                    </TableCell>
                    
                    {/* Test Date Column */}
                    <TableCell>
                      <Skeleton 
                        variant="text" 
                        width={100} 
                        height={16} 
                        sx={{ ...staggeredShimmerStyle }}
                      />
                    </TableCell>
                    
                    {/* Result Column */}
                    <TableCell>
                      <Skeleton 
                        variant="rectangular" 
                        width={80} 
                        height={24} 
                        sx={{ borderRadius: 12, ...staggeredShimmerStyle, ...staggeredPulseStyle }}
                      />
                    </TableCell>
                    
                    {/* Score Column */}
                    <TableCell>
                      <Skeleton 
                        variant="text" 
                        width={60} 
                        height={20} 
                        sx={{ ...staggeredShimmerStyle }}
                      />
                    </TableCell>
                    
                    {/* Actions Column */}
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
          
          {/* Pagination Skeleton */}
          <TablePagination
            component="div"
            count={0}
            page={0}
            onPageChange={() => {}}
            rowsPerPage={10}
            onRowsPerPageChange={() => {}}
            sx={{
              '& .MuiTablePagination-toolbar': {
                opacity: 0.3,
              },
              '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                opacity: 0.3,
              },
            }}
          />
        </TableContainer>
      </Box>
    </>
  );
};

export default PlacementTestsSkeleton;
