import React from 'react';
import {
  Box,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Skeleton,
  Typography,
  Chip,
  Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const SchoolStructuresSkeleton = ({ accordions = 3 }) => {
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
          mb: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 3,
          px: 2,
        }}>
          <Skeleton 
            variant="text" 
            width={200} 
            height={40} 
            sx={{ ...shimmerStyle }}
          />
          <Skeleton 
            variant="rectangular" 
            width={180} 
            height={40} 
            sx={{ borderRadius: 2, ...shimmerStyle }}
          />
        </Box>

        {/* Main Paper Container */}
        <Paper sx={{ 
          p: 3, 
          borderRadius: 3,
          boxShadow: theme.shadows[3],
          border: theme.palette.mode === 'dark' ? '1px solid #333' : 'none'
        }}>
          {/* Accordions Skeleton */}
          {Array.from({ length: accordions }).map((_, accordionIndex) => {
            const delay = accordionIndex * 0.2; // Staggered delay for accordions
            const staggeredShimmerStyle = {
              ...shimmerStyle,
              animationDelay: `${delay}s`,
            };
            const staggeredPulseStyle = {
              ...pulseStyle,
              animationDelay: `${delay}s`,
            };
            
            return (
              <Accordion
                key={accordionIndex}
                expanded={accordionIndex === 0} // First accordion expanded
                sx={{ 
                  mb: 2,
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: theme.shadows[2],
                  '&:before': { display: 'none' },
                  '&.Mui-expanded': {
                    boxShadow: theme.shadows[4]
                  }
                }}
              >
                <AccordionSummary 
                  sx={{
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', py: 1 }}>
                    {/* Study Stage Icon */}
                    <Box sx={{ mr: 2 }}>
                      <Skeleton 
                        variant="circular" 
                        width={28} 
                        height={28} 
                        sx={{ ...staggeredShimmerStyle, ...staggeredPulseStyle }}
                      />
                    </Box>
                    
                    {/* Study Stage Content */}
                    <Box sx={{ flexGrow: 1 }}>
                      <Skeleton 
                        variant="text" 
                        width={150} 
                        height={24} 
                        sx={{ mb: 0.5, ...staggeredShimmerStyle }}
                      />
                      <Skeleton 
                        variant="text" 
                        width={100} 
                        height={16} 
                        sx={{ ...staggeredShimmerStyle }}
                      />
                    </Box>
                    
                    {/* ID Chip */}
                    <Skeleton 
                      variant="rectangular" 
                      width={40} 
                      height={24} 
                      sx={{ 
                        borderRadius: 12, 
                        mr: 2, 
                        ...staggeredShimmerStyle, 
                        ...staggeredPulseStyle 
                      }}
                    />
                    
                    {/* Action Buttons */}
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
                  </Box>
                </AccordionSummary>
                
                <AccordionDetails>
                  <Box sx={{ ml: 2 }}>
                    {/* Grades Section Header */}
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      mb: 2,
                      p: 2,
                      borderRadius: 2
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Skeleton 
                          variant="circular" 
                          width={24} 
                          height={24} 
                          sx={{ ...staggeredShimmerStyle, ...staggeredPulseStyle }}
                        />
                        <Skeleton 
                          variant="text" 
                          width={60} 
                          height={20} 
                          sx={{ ...staggeredShimmerStyle }}
                        />
                        <Skeleton 
                          variant="rectangular" 
                          width={20} 
                          height={20} 
                          sx={{ 
                            borderRadius: 10, 
                            ...staggeredShimmerStyle, 
                            ...staggeredPulseStyle 
                          }}
                        />
                      </Box>
                      <Skeleton 
                        variant="rectangular" 
                        width={120} 
                        height={32} 
                        sx={{ borderRadius: 2, ...staggeredShimmerStyle }}
                      />
                    </Box>
                    
                    {/* Grade Accordions */}
                    {Array.from({ length: 2 }).map((_, gradeIndex) => {
                      const gradeDelay = delay + (gradeIndex * 0.1);
                      const gradeShimmerStyle = {
                        ...shimmerStyle,
                        animationDelay: `${gradeDelay}s`,
                      };
                      const gradePulseStyle = {
                        ...pulseStyle,
                        animationDelay: `${gradeDelay}s`,
                      };
                      
                      return (
                        <Accordion
                          key={gradeIndex}
                          sx={{ 
                            mb: 1,
                            borderRadius: 2,
                            overflow: 'hidden',
                            boxShadow: theme.shadows[1],
                            '&:before': { display: 'none' },
                            '&.Mui-expanded': {
                              boxShadow: theme.shadows[2]
                            }
                          }}
                        >
                          <AccordionSummary>
                            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', py: 1 }}>
                              {/* Grade Icon */}
                              <Box sx={{ mr: 2 }}>
                                <Skeleton 
                                  variant="circular" 
                                  width={24} 
                                  height={24} 
                                  sx={{ ...gradeShimmerStyle, ...gradePulseStyle }}
                                />
                              </Box>
                              
                              {/* Grade Content */}
                              <Box sx={{ flexGrow: 1 }}>
                                <Skeleton 
                                  variant="text" 
                                  width={120} 
                                  height={20} 
                                  sx={{ mb: 0.5, ...gradeShimmerStyle }}
                                />
                                <Skeleton 
                                  variant="text" 
                                  width={80} 
                                  height={14} 
                                  sx={{ ...gradeShimmerStyle }}
                                />
                              </Box>
                              
                              {/* ID Chip */}
                              <Skeleton 
                                variant="rectangular" 
                                width={35} 
                                height={20} 
                                sx={{ 
                                  borderRadius: 10, 
                                  mr: 2, 
                                  ...gradeShimmerStyle, 
                                  ...gradePulseStyle 
                                }}
                              />
                              
                              {/* Action Buttons */}
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                <Skeleton 
                                  variant="circular" 
                                  width={28} 
                                  height={28} 
                                  sx={{ ...gradeShimmerStyle, ...gradePulseStyle }}
                                />
                                <Skeleton 
                                  variant="circular" 
                                  width={28} 
                                  height={28} 
                                  sx={{ ...gradeShimmerStyle, ...gradePulseStyle }}
                                />
                              </Box>
                            </Box>
                          </AccordionSummary>
                          
                          <AccordionDetails>
                            <Box sx={{ ml: 2 }}>
                              {/* Sections Header */}
                              <Box sx={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center', 
                                mb: 2,
                                p: 1.5,
                                borderRadius: 2
                              }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Skeleton 
                                    variant="circular" 
                                    width={20} 
                                    height={20} 
                                    sx={{ ...gradeShimmerStyle, ...gradePulseStyle }}
                                  />
                                  <Skeleton 
                                    variant="text" 
                                    width={80} 
                                    height={18} 
                                    sx={{ ...gradeShimmerStyle }}
                                  />
                                  <Skeleton 
                                    variant="rectangular" 
                                    width={15} 
                                    height={15} 
                                    sx={{ 
                                      borderRadius: 7.5, 
                                      ...gradeShimmerStyle, 
                                      ...gradePulseStyle 
                                    }}
                                  />
                                </Box>
                                <Skeleton 
                                  variant="rectangular" 
                                  width={100} 
                                  height={28} 
                                  sx={{ borderRadius: 2, ...gradeShimmerStyle }}
                                />
                              </Box>
                              
                              {/* Section Cards */}
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {Array.from({ length: 3 }).map((_, sectionIndex) => (
                                  <Skeleton 
                                    key={sectionIndex}
                                    variant="rectangular" 
                                    width={120} 
                                    height={60} 
                                    sx={{ 
                                      borderRadius: 2, 
                                      ...gradeShimmerStyle,
                                      animationDelay: `${gradeDelay + (sectionIndex * 0.05)}s`
                                    }}
                                  />
                                ))}
                              </Box>
                            </Box>
                          </AccordionDetails>
                        </Accordion>
                      );
                    })}
                  </Box>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Paper>
      </Box>
    </>
  );
};

export default SchoolStructuresSkeleton;
