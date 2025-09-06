import React from 'react';
import {
  Box,
  Container,
  Paper,
  Skeleton,
  Typography,
  Avatar,
  Button,
  Divider,
  ImageList,
  ImageListItem,
  Chip,
  Fab,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const PostsSkeleton = ({ posts = 3 }) => {
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

  // Pulse effect for avatars and interactive elements
  const pulseStyle = {
    animation: 'pulse 2s ease-in-out infinite',
  };

  return (
    <>
      <style>{shimmerKeyframes}</style>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        {/* Header Skeleton */}
        <Box
          sx={{
            py: 4,
            px: 2,
            textAlign: 'center',
          }}
        >
          <Skeleton 
            variant="text" 
            width={100} 
            height={40} 
            sx={{ mx: 'auto', ...shimmerStyle }}
          />
        </Box>
        
        <Container maxWidth="md" sx={{ py: 3 }}>
          {/* Create Post Section Skeleton */}
          <Paper 
            elevation={1} 
            sx={{ 
              p: 3, 
              mb: 3, 
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`
            }}
          >
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
                height={20} 
                sx={{ ...shimmerStyle }}
              />
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Skeleton 
              variant="rectangular" 
              height={40} 
              sx={{ borderRadius: 2, ...shimmerStyle }}
            />
          </Paper>

          {/* Posts Feed Skeleton */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {Array.from({ length: posts }).map((_, postIndex) => {
              const delay = postIndex * 0.2; // Staggered delay
              const staggeredShimmerStyle = {
                ...shimmerStyle,
                animationDelay: `${delay}s`,
              };
              const staggeredPulseStyle = {
                ...pulseStyle,
                animationDelay: `${delay}s`,
              };
              
              return (
                <Paper 
                  key={postIndex}
                  elevation={1} 
                  sx={{ 
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.divider}`,
                    overflow: 'hidden'
                  }}
                >
                  {/* Post Header */}
                  <Box sx={{ p: 3, pb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Skeleton 
                          variant="circular" 
                          width={48} 
                          height={48} 
                          sx={{ mr: 2, ...staggeredShimmerStyle, ...staggeredPulseStyle }}
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
                      
                      <Skeleton 
                        variant="circular" 
                        width={32} 
                        height={32} 
                        sx={{ ...staggeredShimmerStyle, ...staggeredPulseStyle }}
                      />
                    </Box>

                    {/* Post Content */}
                    <Box sx={{ mt: 2 }}>
                      {/* Title */}
                      <Skeleton 
                        variant="text" 
                        width="80%" 
                        height={24} 
                        sx={{ mb: 1, ...staggeredShimmerStyle }}
                      />
                      {/* Text Content */}
                      <Skeleton 
                        variant="text" 
                        width="100%" 
                        height={16} 
                        sx={{ mb: 0.5, ...staggeredShimmerStyle }}
                      />
                      <Skeleton 
                        variant="text" 
                        width="90%" 
                        height={16} 
                        sx={{ mb: 0.5, ...staggeredShimmerStyle }}
                      />
                      <Skeleton 
                        variant="text" 
                        width="70%" 
                        height={16} 
                        sx={{ mb: 2, ...staggeredShimmerStyle }}
                      />

                      {/* Section Chips */}
                      <Box sx={{ mb: 2 }}>
                        <Skeleton 
                          variant="rectangular" 
                          width={60} 
                          height={24} 
                          sx={{ 
                            borderRadius: 12, 
                            mr: 1, 
                            mb: 1, 
                            display: 'inline-block',
                            ...staggeredShimmerStyle, 
                            ...staggeredPulseStyle 
                          }}
                        />
                        <Skeleton 
                          variant="rectangular" 
                          width={80} 
                          height={24} 
                          sx={{ 
                            borderRadius: 12, 
                            mr: 1, 
                            mb: 1, 
                            display: 'inline-block',
                            ...staggeredShimmerStyle, 
                            ...staggeredPulseStyle 
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>

                  {/* Images Skeleton */}
                  {postIndex % 3 === 0 && (
                    <Box sx={{ px: 3, pb: 2 }}>
                      <ImageList 
                        cols={postIndex % 2 === 0 ? 1 : 2} 
                        rowHeight={200}
                        sx={{ m: 0 }}
                      >
                        <ImageListItem>
                          <Skeleton 
                            variant="rectangular" 
                            height={200} 
                            sx={{ borderRadius: 1, ...staggeredShimmerStyle }}
                          />
                        </ImageListItem>
                        {postIndex % 2 === 1 && (
                          <ImageListItem>
                            <Skeleton 
                              variant="rectangular" 
                              height={200} 
                              sx={{ borderRadius: 1, ...staggeredShimmerStyle }}
                            />
                          </ImageListItem>
                        )}
                      </ImageList>
                    </Box>
                  )}

                  {/* Files Skeleton */}
                  {postIndex % 4 === 0 && (
                    <Box sx={{ px: 3, pb: 2 }}>
                      <Skeleton 
                        variant="text" 
                        width={100} 
                        height={20} 
                        sx={{ mb: 1, ...staggeredShimmerStyle }}
                      />
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: 1.5,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 1,
                        mb: 1,
                        bgcolor: theme.palette.background.paper
                      }}>
                        <Skeleton 
                          variant="circular" 
                          width={20} 
                          height={20} 
                          sx={{ mr: 1, ...staggeredShimmerStyle, ...staggeredPulseStyle }}
                        />
                        <Skeleton 
                          variant="text" 
                          width={150} 
                          height={16} 
                          sx={{ flex: 1, ...staggeredShimmerStyle }}
                        />
                        <Skeleton 
                          variant="circular" 
                          width={24} 
                          height={24} 
                          sx={{ ml: 1, ...staggeredShimmerStyle, ...staggeredPulseStyle }}
                        />
                      </Box>
                    </Box>
                  )}

                  {/* Post Stats */}
                  <Box sx={{ px: 3, py: 1 }}>
                    <Divider sx={{ mb: 1 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Skeleton 
                        variant="text" 
                        width={80} 
                        height={14} 
                        sx={{ ...staggeredShimmerStyle }}
                      />
                      <Skeleton 
                        variant="text" 
                        width={60} 
                        height={14} 
                        sx={{ ...staggeredShimmerStyle }}
                      />
                    </Box>
                  </Box>

                  {/* Action Buttons */}
                  <Divider />
                  <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Skeleton 
                      variant="rectangular" 
                      width="33%" 
                      height={48} 
                      sx={{ ...staggeredShimmerStyle }}
                    />
                    <Skeleton 
                      variant="rectangular" 
                      width="33%" 
                      height={48} 
                      sx={{ ...staggeredShimmerStyle }}
                    />
                    <Skeleton 
                      variant="rectangular" 
                      width="33%" 
                      height={48} 
                      sx={{ ...staggeredShimmerStyle }}
                    />
                  </Box>
                </Paper>
              );
            })}
          </Box>
        </Container>

        {/* Mobile FAB Skeleton */}
        <Skeleton 
          variant="circular" 
          width={56} 
          height={56} 
          sx={{ 
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 1000,
            ...shimmerStyle,
            ...pulseStyle
          }}
        />
      </Box>
    </>
  );
};

export default PostsSkeleton;
