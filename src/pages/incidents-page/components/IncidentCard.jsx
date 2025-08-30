import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Box,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Collapse,
  Divider,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Report as ReportIcon,
  Schedule as ScheduleIcon,
  Group as GroupIcon,
} from '@mui/icons-material';
import { useTheme } from '../../../theme/ThemeProvider';
import { useTranslation } from 'react-i18next';

const IncidentCard = ({ incident, onEdit, onDelete, deleteLoading }) => {
  const { getCurrentTheme } = useTheme();
  const theme = getCurrentTheme();
  const { t, i18n } = useTranslation();

  const [expanded, setExpanded] = useState(false);
  const isRTL = (language) => ['ar'].includes(language);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(i18n.language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getSeverityColor = (title) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('تنمر') || lowerTitle.includes('bullying')) {
      return 'error';
    } else if (lowerTitle.includes('عنف') || lowerTitle.includes('violence')) {
      return 'warning';
    } else if (lowerTitle.includes('سلوك') || lowerTitle.includes('behavior')) {
      return 'info';
    }
    return 'default';
  };

  const getSeverityIcon = (title) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('تنمر') || lowerTitle.includes('bullying')) {
      return <ReportIcon color="error" />;
    } else if (lowerTitle.includes('عنف') || lowerTitle.includes('violence')) {
      return <ReportIcon color="warning" />;
    }
    return <ReportIcon color="info" />;
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.palette.mode === 'dark' ? 8 : 4,
        },
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      {/* Header with severity indicator */}
      <Box
        sx={{
          p: 2,
          pb: 1,
          borderBottom: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.action.hover,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          {getSeverityIcon(incident.title)}
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontWeight: 600,
              color: theme.palette.text.primary,
              flexGrow: 1,
              textAlign: isRTL(i18n.language) ? 'right' : 'left',
            }}
          >
            {incident.title}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <ScheduleIcon fontSize="small" color="action" />
          <Typography variant="caption" color="text.secondary">
            {formatDate(incident.date)}
          </Typography>
        </Box>

        <Chip
          label={`${incident.student_names.length} ${t('students')}`}
          size="small"
          icon={<GroupIcon />}
          color="primary"
          variant="outlined"
          sx={{ alignSelf: 'flex-start' }}
        />
      </Box>

      {/* Content */}
      <CardContent sx={{ flexGrow: 1, p: 2, pt: 1 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            lineHeight: 1.6,
            textAlign: isRTL(i18n.language) ? 'right' : 'left',
          }}
        >
          {incident.note}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: theme.palette.text.primary }}>
            {t('procedure')}:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {incident.procedure}
          </Typography>
        </Box>

        {/* Students List - Collapsible */}
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
                borderRadius: 1,
              },
              p: 1,
              borderRadius: 1,
            }}
            onClick={handleExpandClick}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
              {t('involvedStudents')} ({incident.student_names.length})
            </Typography>
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Box>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <List dense sx={{ p: 0 }}>
              {incident.student_names.map((student) => (
                <ListItem key={student.id} sx={{ p: 0, pl: 1 }}>
                  <ListItemAvatar sx={{ minWidth: 32 }}>
                    <Avatar
                      sx={{
                        width: 24,
                        height: 24,
                        fontSize: '0.75rem',
                        backgroundColor: theme.palette.primary.main,
                      }}
                    >
                      {student.name.charAt(0).toUpperCase()}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={student.name}
                    primaryTypographyProps={{
                      variant: 'body2',
                      sx: { color: theme.palette.text.primary }
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </Box>
      </CardContent>

      {/* Actions */}
      <CardActions sx={{ justifyContent: 'space-between', p: 2, pt: 0 }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(incident);
            }}
            sx={{
              color: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.light + '20',
              },
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(incident);
            }}
            disabled={deleteLoading}
            sx={{
              color: theme.palette.error.main,
              '&:hover': {
                backgroundColor: theme.palette.error.light + '20',
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

export default IncidentCard;
