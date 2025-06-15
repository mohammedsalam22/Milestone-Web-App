// LoginPageStyles.js
import { styled, keyframes } from '@mui/material/styles';
import { Container, Paper, TextField, Button, Avatar } from '@mui/material';

const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(25, 118, 210, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(25, 118, 210, 0);
  }
`;

export const AnimatedContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.palette.background.default,
  padding: theme.spacing(2),
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: 20,
  backdropFilter: 'blur(20px)',
  background: theme.palette.background.paper,
  boxShadow: '0 25px 45px rgba(0, 0, 0, 0.1)',
  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}`,
  animation: `${floatAnimation} 6s ease-in-out infinite`,
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 35px 55px rgba(0, 0, 0, 0.15)',
  },
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  width: 60,
  height: 60,
  animation: `${pulseAnimation} 2s infinite`,
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
    },
    '&.Mui-focused': {
      transform: 'translateY(-2px)',
      boxShadow: `0 8px 25px ${theme.palette.primary.main}28`,
    },
  },
  '& .MuiOutlinedInput-input': {
    padding: '16px 14px',
    color: theme.palette.text.primary,
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
  padding: theme.spacing(1.5),
  borderRadius: 12,
  fontSize: '1.1rem',
  fontWeight: 600,
  background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
  boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    background: 'linear-gradient(45deg, #764ba2 30%, #667eea 90%)',
    transform: 'translateY(-3px)',
    boxShadow: '0 10px 25px rgba(102, 126, 234, 0.6)',
  },
  '&:active': {
    transform: 'translateY(-1px)',
  },
}));