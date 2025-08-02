// /src/pages/login-page/LoginPage.js
import  { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Fade,
  Grow,
  Slide,
  Select,
  MenuItem,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { StyledPaper, StyledAvatar, StyledTextField, StyledButton } from '../../styles/LoginPageStyles';
import { useTheme } from '../../theme/ThemeProvider';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { changeLanguage, LANGUAGES } from '../../services/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../featuers/login-slice/loginSlice';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [sessionExpiredMsg, setSessionExpiredMsg] = useState('');
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.login);
  const { getCurrentTheme } = useTheme();
  const theme = getCurrentTheme();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => setShowForm(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (localStorage.getItem('sessionExpired')) {
      setSessionExpiredMsg('Session expired, please log in again.');
      localStorage.removeItem('sessionExpired');
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let valid = true;
    setUsernameError('');
    setPasswordError('');
    if (!username.trim()) {
      setUsernameError('Username is required');
      valid = false;
    }
    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    }
    if (!valid) return;
    const resultAction = await dispatch(login({ username, password }));
    if (login.fulfilled.match(resultAction)) {
      // Optionally store tokens in localStorage/sessionStorage here
      navigate('/dashboard');
    }
  };

  const handleLanguageChange = (event) => {
    changeLanguage(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: theme.palette.background.default }}>
      <Box sx={{ width: '100%', maxWidth: 400 }}>
        <Fade in timeout={1000}>
          <Grow in timeout={1200}>
            <StyledPaper elevation={24} sx={{ bgcolor: theme.palette.background.paper }}>
              {/* Language Switcher */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
                <Select
                  value={i18n.language}
                  onChange={handleLanguageChange}
                  variant="outlined"
                  size="small"
                >
                  {Object.entries(LANGUAGES).map(([code, language]) => (
                    <MenuItem key={code} value={code}>
                      {language.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>

              <Slide direction="down" in timeout={800}>
                <StyledAvatar>
                  <LockOutlinedIcon sx={{ fontSize: 30 }} />
                </StyledAvatar>
              </Slide>

              <Slide direction="up" in timeout={1000}>
                <Typography
                  component="h1"
                  variant="h4"
                  sx={{
                    mt: 2,
                    mb: 3,
                    fontWeight: 700,
                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {t('welcomeBack')}
                </Typography>
              </Slide>

              {sessionExpiredMsg && (
                <Typography color="error" sx={{ mt: 1, mb: 1 }}>
                  {sessionExpiredMsg}
                </Typography>
              )}

              <Fade in={showForm} timeout={1500}>
                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                  <StyledTextField
                    variant="outlined"
                    required
                    fullWidth
                    id="username"
                    label={t('username')}
                    name="username"
                    autoComplete="username"
                    autoFocus
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={!!usernameError}
                    helperText={usernameError}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.5)'
                            : theme.palette.divider,
                        },
                        '&:hover fieldset': {
                          borderColor: theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.7)'
                            : theme.palette.primary.main,
                        },
                      },
                    }}
                  />
                  <StyledTextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label={t('password')}
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!passwordError}
                    helperText={passwordError}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.5)'
                            : theme.palette.divider,
                        },
                        '&:hover fieldset': {
                          borderColor: theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.7)'
                            : theme.palette.primary.main,
                        },
                      },
                    }}
                  />
                  {error && (
                    <Typography color="error" sx={{ mt: 1, mb: 1 }}>
                      {error}
                    </Typography>
                  )}
                  <StyledButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    disableElevation
                    sx={{
                      mt: 2,
                      backgroundColor: theme.palette.primary.main,
                      '&:hover': {
                        backgroundColor: theme.palette.primary.light,
                      },
                    }}
                    disabled={loading}
                  >
                    {loading ? t('signingIn') : t('signIn')}
                  </StyledButton>
                </Box>
              </Fade>
            </StyledPaper>
          </Grow>
        </Fade>
      </Box>
    </Box>
  );
};

export default LoginPage;