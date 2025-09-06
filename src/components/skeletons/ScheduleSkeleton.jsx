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
  Button,
  Paper,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ScheduleSkeleton = () => {
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

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
  const periods = [
    '08:00-08:45', '09:00-09:45', '10:00-10:45', '11:00-11:45', '12:00-12:45', '13:00-13:45'
  ];

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
          mb: 2,
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Skeleton 
            variant="text" 
            width={120} 
            height={40} 
            sx={{ ...shimmerStyle }}
          />
          
          <Skeleton 
            variant="rectangular" 
            width={200} 
            height={40} 
            sx={{ borderRadius: 2, ...shimmerStyle }}
          />
        </Box>

        {/* Main Schedule Container */}
        <Box sx={{ 
          border: 1, 
          borderColor: theme.palette.divider, 
          borderRadius: 1,
          backgroundColor: theme.palette.background.paper,
          overflow: 'hidden'
        }}>
          {/* Schedule Header Skeleton */}
          <Box sx={{ 
            p: 2, 
            borderBottom: 1, 
            borderColor: theme.palette.divider,
            backgroundColor: theme.palette.background.paper
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Skeleton 
                  variant="text" 
                  width={200} 
                  height={24} 
                  sx={{ mb: 0.5, ...shimmerStyle }}
                />
                <Skeleton 
                  variant="text" 
                  width={150} 
                  height={16} 
                  sx={{ ...shimmerStyle }}
                />
              </Box>
              
              <Skeleton 
                variant="rectangular" 
                width={100} 
                height={36} 
                sx={{ borderRadius: 2, ...shimmerStyle }}
              />
            </Box>
          </Box>

          {/* Schedule Grid Skeleton */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, minWidth: 120 }}>
                    <Skeleton 
                      variant="text" 
                      width={40} 
                      height={20} 
                      sx={{ ...shimmerStyle }}
                    />
                  </TableCell>
                  {periods.map((period, index) => {
                    const delay = index * 0.1;
                    const staggeredShimmerStyle = {
                      ...shimmerStyle,
                      animationDelay: `${delay}s`,
                    };
                    
                    return (
                      <TableCell
                        key={period}
                        align="center"
                        sx={{ fontWeight: 600, minWidth: 150 }}
                      >
                        <Skeleton 
                          variant="text" 
                          width={80} 
                          height={20} 
                          sx={{ ...staggeredShimmerStyle }}
                        />
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {days.map((day, dayIndex) => {
                  const dayDelay = dayIndex * 0.1;
                  const dayShimmerStyle = {
                    ...shimmerStyle,
                    animationDelay: `${dayDelay}s`,
                  };
                  
                  return (
                    <TableRow key={day}>
                      <TableCell sx={{ fontWeight: 600, width: 120 }}>
                        <Skeleton 
                          variant="text" 
                          width={80} 
                          height={20} 
                          sx={{ ...dayShimmerStyle }}
                        />
                      </TableCell>
                      {periods.map((period, periodIndex) => {
                        const cellDelay = dayDelay + (periodIndex * 0.05);
                        const cellShimmerStyle = {
                          ...shimmerStyle,
                          animationDelay: `${cellDelay}s`,
                        };
                        const cellPulseStyle = {
                          ...pulseStyle,
                          animationDelay: `${cellDelay}s`,
                        };
                        
                        // Randomly show some filled cells and some empty cells
                        const showContent = (dayIndex + periodIndex) % 3 === 0;
                        
                        return (
                          <TableCell
                            key={`${day}-${period}`}
                            align="center"
                            sx={{ minHeight: 80, position: 'relative' }}
                          >
                            {showContent ? (
                              // Filled cell skeleton
                              <Box sx={{ p: 1, border: 1, borderColor: 'divider', borderRadius: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                  <Box sx={{ flex: 1 }}>
                                    <Skeleton 
                                      variant="text" 
                                      width={80} 
                                      height={16} 
                                      sx={{ mb: 0.5, ...cellShimmerStyle }}
                                    />
                                    <Skeleton 
                                      variant="text" 
                                      width={60} 
                                      height={12} 
                                      sx={{ ...cellShimmerStyle }}
                                    />
                                  </Box>
                                  <Skeleton 
                                    variant="circular" 
                                    width={20} 
                                    height={20} 
                                    sx={{ ...cellShimmerStyle, ...cellPulseStyle }}
                                  />
                                </Box>
                              </Box>
                            ) : (
                              // Empty cell skeleton
                              <Skeleton 
                                variant="rectangular" 
                                width={32} 
                                height={32} 
                                sx={{ 
                                  borderRadius: 1, 
                                  border: 1, 
                                  borderColor: 'divider',
                                  ...cellShimmerStyle,
                                  ...cellPulseStyle
                                }}
                              />
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default ScheduleSkeleton;
