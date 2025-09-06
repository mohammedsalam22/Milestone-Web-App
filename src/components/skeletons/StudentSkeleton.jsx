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
  Chip,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const StudentSkeleton = ({ rows = 10 }) => {
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

  // Pulse effect for avatars and chips
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Skeleton 
            variant="text" 
            width={200} 
            height={40} 
            sx={{ ...shimmerStyle }}
          />
          
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <Skeleton 
              variant="rectangular" 
              width={250} 
              height={40} 
              sx={{ borderRadius: 2, ...shimmerStyle }}
            />
            <Skeleton 
              variant="rectangular" 
              width={120} 
              height={40} 
              sx={{ borderRadius: 2, ...shimmerStyle }}
            />
            <Skeleton 
              variant="rectangular" 
              width={100} 
              height={40} 
              sx={{ borderRadius: 2, ...shimmerStyle }}
            />
            <Skeleton 
              variant="rectangular" 
              width={120} 
              height={40} 
              sx={{ borderRadius: 2, ...shimmerStyle }}
            />
          </Box>
        </Box>

        {/* Active Filters Skeleton */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
          <Skeleton 
            variant="rectangular" 
            width={100} 
            height={32} 
            sx={{ borderRadius: 16, ...shimmerStyle }}
          />
          <Skeleton 
            variant="rectangular" 
            width={120} 
            height={32} 
            sx={{ borderRadius: 16, ...shimmerStyle }}
          />
        </Box>

        {/* Results Count Skeleton */}
        <Box sx={{ mb: 2 }}>
          <Skeleton 
            variant="text" 
            width={200} 
            height={20} 
            sx={{ ...shimmerStyle }}
          />
        </Box>

        {/* Table Skeleton */}
        <Paper elevation={2}>
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: theme.palette.grey[50] }}>
                  <TableCell>
                    <Skeleton 
                      variant="text" 
                      width={60} 
                      height={24} 
                      sx={{ ...shimmerStyle }}
                    />
                  </TableCell>
                  <TableCell>
                    <Skeleton 
                      variant="text" 
                      width={60} 
                      height={24} 
                      sx={{ ...shimmerStyle }}
                    />
                  </TableCell>
                  <TableCell>
                    <Skeleton 
                      variant="text" 
                      width={80} 
                      height={24} 
                      sx={{ ...shimmerStyle }}
                    />
                  </TableCell>
                  <TableCell>
                    <Skeleton 
                      variant="text" 
                      width={80} 
                      height={24} 
                      sx={{ ...shimmerStyle }}
                    />
                  </TableCell>
                  <TableCell>
                    <Skeleton 
                      variant="text" 
                      width={100} 
                      height={24} 
                      sx={{ ...shimmerStyle }}
                    />
                  </TableCell>
                  <TableCell>
                    <Skeleton 
                      variant="text" 
                      width={40} 
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
                    {/* Student Column */}
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
                            width={120} 
                            height={20} 
                            sx={{ mb: 0.5, ...staggeredShimmerStyle }}
                          />
                          <Skeleton 
                            variant="text" 
                            width={80} 
                            height={16} 
                            sx={{ ...staggeredShimmerStyle }}
                          />
                        </Box>
                      </Box>
                    </TableCell>
                    
                    {/* Gender Column */}
                    <TableCell>
                      <Skeleton 
                        variant="rectangular" 
                        width={80} 
                        height={24} 
                        sx={{ borderRadius: 12, ...staggeredShimmerStyle, ...staggeredPulseStyle }}
                      />
                    </TableCell>
                    
                    {/* Birth Date Column */}
                    <TableCell>
                      <Skeleton 
                        variant="text" 
                        width={90} 
                        height={20} 
                        sx={{ ...staggeredShimmerStyle }}
                      />
                    </TableCell>
                    
                    {/* Birth City Column */}
                    <TableCell>
                      <Skeleton 
                        variant="text" 
                        width={100} 
                        height={20} 
                        sx={{ ...staggeredShimmerStyle }}
                      />
                    </TableCell>
                    
                    {/* Grade & Section Column */}
                    <TableCell>
                      <Skeleton 
                        variant="text" 
                        width={140} 
                        height={20} 
                        sx={{ ...staggeredShimmerStyle }}
                      />
                    </TableCell>
                    
                    {/* Age Column */}
                    <TableCell>
                      <Skeleton 
                        variant="text" 
                        width={30} 
                        height={20} 
                        sx={{ ...staggeredShimmerStyle }}
                      />
                    </TableCell>
                  </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          
          {/* Pagination Skeleton */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            p: 2,
            borderTop: `1px solid ${theme.palette.divider}`
          }}>
            <Skeleton 
              variant="text" 
              width={150} 
              height={20} 
              sx={{ ...shimmerStyle }}
            />
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Skeleton 
                variant="rectangular" 
                width={60} 
                height={32} 
                sx={{ borderRadius: 1, ...shimmerStyle }}
              />
              <Skeleton 
                variant="text" 
                width={20} 
                height={20} 
                sx={{ ...shimmerStyle }}
              />
              <Skeleton 
                variant="text" 
                width={20} 
                height={20} 
                sx={{ ...shimmerStyle }}
              />
              <Skeleton 
                variant="text" 
                width={20} 
                height={20} 
                sx={{ ...shimmerStyle }}
              />
              <Skeleton 
                variant="rectangular" 
                width={60} 
                height={32} 
                sx={{ borderRadius: 1, ...shimmerStyle }}
              />
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default StudentSkeleton;
