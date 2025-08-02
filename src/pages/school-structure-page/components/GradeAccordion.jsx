import React from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Chip,
  IconButton,
  Button,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Category as CategoryIcon,
  Folder as FolderIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import SectionCard from './SectionCard';

const GradeAccordion = ({
  grade,
  expandedGrade,
  onGradeExpansion,
  onEditGrade,
  onDeleteGrade,
  onCreateSection,
  onEditSection,
  onDeleteSection,
  getGradeIcon,
  getSectionIcon,
  getSectionsForGrade,
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const theme = useTheme();

  return (
    <Accordion
      key={grade.id}
      expanded={expandedGrade === grade.id}
      onChange={onGradeExpansion(grade.id)}
      sx={{ 
        mb: 2, 
        ml: 2,
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: theme.shadows[1],
        '&:before': { display: 'none' },
        '&.Mui-expanded': {
          boxShadow: theme.shadows[3]
        }
      }}
    >
      <AccordionSummary 
        expandIcon={<ExpandMoreIcon sx={{ color: '#1976d2' }} />}
        sx={{
          transition: 'all 0.3s ease'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', py: 1 }}>
          <Box sx={{ mr: 2 }}>
            {getGradeIcon(grade.name)}
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 600,
              color: 'text.primary',
              mb: 0.5
            }}>
              {grade.name}
            </Typography>
            <Typography variant="body2" sx={{ 
              color: 'text.secondary',
              fontWeight: 500
            }}>
              {getSectionsForGrade(grade.id).length} {t('sections')}
            </Typography>
          </Box>
          <Chip 
            label={`#${grade.id}`} 
            size="small" 
            sx={{ 
              mr: 2,
              background: theme.palette.primary.light,
              color: theme.palette.primary.contrastText,
              fontWeight: 600
            }} 
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onEditGrade(grade);
              }}
              sx={{
                color: theme.palette.warning.main,
                '&:hover': {
                  background: theme.palette.warning.light,
                  transform: 'scale(1.1)'
                },
                transition: 'all 0.2s ease'
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteGrade(grade.id);
              }}
              sx={{
                color: theme.palette.error.main,
                '&:hover': {
                  background: theme.palette.error.light,
                  transform: 'scale(1.1)'
                },
                transition: 'all 0.2s ease'
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ ml: 2 }}>
          {/* Sections for this grade */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              mb: 2,
              p: 2,
              borderRadius: 2
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FolderIcon sx={{ color: theme.palette.secondary.main, fontSize: 20 }} />
                <Typography variant="h6" sx={{ 
                  fontWeight: 600,
                  color: theme.palette.secondary.main
                }}>
                  {t('sections')}
                </Typography>
                <Chip 
                  label={getSectionsForGrade(grade.id).length} 
                  size="small" 
                  sx={{ 
                    background: theme.palette.secondary.light,
                    color: theme.palette.secondary.contrastText,
                    fontWeight: 600
                  }} 
                />
              </Box>
              <Button
                size="small"
                startIcon={isRTL ? null : <AddIcon />}
                endIcon={isRTL ? <AddIcon /> : null}
                onClick={() => onCreateSection(grade.id)}
                sx={{ 
                  background: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                  fontWeight: 600,
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  '&:hover': {
                    background: theme.palette.secondary.dark,
                    transform: 'translateY(-1px)',
                    boxShadow: theme.shadows[4]
                  },
                  transition: 'all 0.3s ease',
                  ...(isRTL && { flexDirection: 'row-reverse' })
                }}
              >
                {t('createSection')}
              </Button>
            </Box>
            <Grid container spacing={2}>
              {getSectionsForGrade(grade.id).map((section) => (
                <Grid item xs={12} sm={6} md={4} key={section.id}>
                  <SectionCard
                    section={section}
                    onEdit={onEditSection}
                    onDelete={onDeleteSection}
                    getSectionIcon={getSectionIcon}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default GradeAccordion; 