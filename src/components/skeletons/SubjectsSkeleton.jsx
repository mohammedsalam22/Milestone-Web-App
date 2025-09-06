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
  AvatarGroup,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const SubjectsSkeleton = ({ rows = 10 }) => {
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
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 2 
        }}>
          <Skeleton 
            variant="text" 
            width={150} 
            height={40} 
            sx={{ ...shimmerStyle }}
          />
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <Skeleton 
              variant="rectangular" 
              width={200} 
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
              width={120} 
              height={40} 
              sx={{ borderRadius: 2, ...shimmerStyle }}
            />
            <Skeleton 
              variant="rectangular" 
              width={140} 
              height={40} 
              sx={{ borderRadius: 2, ...shimmerStyle }}
            />
          </Box>
        </Box>

        {/* Table Skeleton */}
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: theme.shadows[2] }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: theme.palette.background.default }}>
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
                    width={50} 
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
                  {/* Subject Column */}
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
                          height={14} 
                          sx={{ ...staggeredShimmerStyle }}
                        />
                      </Box>
                    </Box>
                  </TableCell>
                  
                  {/* Grade Column */}
                  <TableCell>
                    <Skeleton 
                      variant="rectangular" 
                      width={60} 
                      height={24} 
                      sx={{ borderRadius: 12, ...staggeredShimmerStyle, ...staggeredPulseStyle }}
                    />
                  </TableCell>
                  
                  {/* Teachers Column */}
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <Skeleton 
                          variant="circular" 
                          width={24} 
                          height={24} 
                          sx={{ ...staggeredShimmerStyle, ...staggeredPulseStyle }}
                        />
                        <Skeleton 
                          variant="circular" 
                          width={24} 
                          height={24} 
                          sx={{ ...staggeredShimmerStyle, ...staggeredPulseStyle }}
                        />
                        <Skeleton 
                          variant="circular" 
                          width={24} 
                          height={24} 
                          sx={{ ...staggeredShimmerStyle, ...staggeredPulseStyle }}
                        />
                      </Box>
                      <Skeleton 
                        variant="text" 
                        width={20} 
                        height={14} 
                        sx={{ ...staggeredShimmerStyle }}
                      />
                    </Box>
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

export default SubjectsSkeleton;
