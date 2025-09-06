import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Skeleton,
  Typography,
  Chip,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const StudyYearsSkeleton = ({ cards = 8 }) => {
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

  // Pulse effect for icons and chips
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
          mb: 4,
        }}>
          <Skeleton 
            variant="text" 
            width={150} 
            height={40} 
            sx={{ ...shimmerStyle }}
          />
          <Skeleton 
            variant="rectangular" 
            width={160} 
            height={40} 
            sx={{ borderRadius: 2, ...shimmerStyle }}
          />
        </Box>

        {/* Cards Grid Skeleton */}
        <Grid container spacing={3}>
          {Array.from({ length: cards }).map((_, index) => {
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
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card
                  elevation={2}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    transition: 'all 0.3s ease-in-out',
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    {/* Header with ID chip and icon */}
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 2,
                    }}>
                      <Skeleton 
                        variant="rectangular" 
                        width={50} 
                        height={24} 
                        sx={{ borderRadius: 12, ...staggeredShimmerStyle, ...staggeredPulseStyle }}
                      />
                      <Skeleton 
                        variant="circular" 
                        width={32} 
                        height={32} 
                        sx={{ ...staggeredShimmerStyle, ...staggeredPulseStyle }}
                      />
                    </Box>
                    
                    {/* Study year name */}
                    <Skeleton 
                      variant="text" 
                      width={120} 
                      height={28} 
                      sx={{ mb: 1, ...staggeredShimmerStyle }}
                    />
                    
                    {/* Description */}
                    <Skeleton 
                      variant="text" 
                      width={180} 
                      height={16} 
                      sx={{ ...staggeredShimmerStyle }}
                    />
                  </CardContent>
                  
                  {/* Actions */}
                  <CardActions sx={{
                    p: 2,
                    pt: 0,
                    opacity: 0.7,
                    transition: 'opacity 0.3s ease-in-out',
                    justifyContent: 'space-between',
                  }}>
                    <Box sx={{
                      display: 'flex',
                      gap: 1,
                    }}>
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
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export default StudyYearsSkeleton;
