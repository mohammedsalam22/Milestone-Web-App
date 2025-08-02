import React from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
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
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import GradeAccordion from './GradeAccordion';

const StudyStageAccordion = ({
  stage,
  expandedStage,
  expandedGrade,
  onStageExpansion,
  onGradeExpansion,
  onEditStage,
  onDeleteStage,
  onCreateGrade,
  onEditGrade,
  onDeleteGrade,
  onCreateSection,
  onEditSection,
  onDeleteSection,
  getStudyStageIcon,
  getGradeIcon,
  getSectionIcon,
  getGradesForStage,
  getSectionsForGrade,
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const theme = useTheme();

  return (
    <Accordion
      key={stage.id}
      expanded={expandedStage === stage.id}
      onChange={onStageExpansion(stage.id)}
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
        expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}
        sx={{
          transition: 'all 0.3s ease'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', py: 1 }}>
          <Box sx={{ mr: 2 }}>
            {getStudyStageIcon(stage.name)}
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 600,
              color: 'text.primary',
              mb: 0.5
            }}>
              {stage.name}
            </Typography>
            <Typography variant="body2" sx={{ 
              color: 'text.secondary',
              fontWeight: 500
            }}>
              {getGradesForStage(stage.id).length} {t('grades')}
            </Typography>
          </Box>
          <Chip 
            label={`#${stage.id}`} 
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
                onEditStage(stage);
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
                onDeleteStage(stage.id);
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
          {/* Grades for this stage */}
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
                <CategoryIcon sx={{ color: theme.palette.primary.main, fontSize: 24 }} />
                <Typography variant="h6" sx={{ 
                  fontWeight: 600,
                  color: theme.palette.primary.main
                }}>
                  {t('grades')}
                </Typography>
                <Chip 
                  label={getGradesForStage(stage.id).length} 
                  size="small" 
                  sx={{ 
                    background: theme.palette.primary.light,
                    color: theme.palette.primary.contrastText,
                    fontWeight: 600
                  }} 
                />
              </Box>
              <Button
                size="small"
                startIcon={isRTL ? null : <AddIcon />}
                endIcon={isRTL ? <AddIcon /> : null}
                onClick={() => onCreateGrade(stage.id)}
                sx={{ 
                  background: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  fontWeight: 600,
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  '&:hover': {
                    background: theme.palette.primary.dark,
                    transform: 'translateY(-1px)',
                    boxShadow: theme.shadows[4]
                  },
                  transition: 'all 0.3s ease',
                  ...(isRTL && { flexDirection: 'row-reverse' })
                }}
              >
                {t('createGrade')}
              </Button>
            </Box>
            {getGradesForStage(stage.id).map((grade) => (
              <GradeAccordion
                key={grade.id}
                grade={grade}
                expandedGrade={expandedGrade}
                onGradeExpansion={onGradeExpansion}
                onEditGrade={onEditGrade}
                onDeleteGrade={onDeleteGrade}
                onCreateSection={onCreateSection}
                onEditSection={onEditSection}
                onDeleteSection={onDeleteSection}
                getGradeIcon={getGradeIcon}
                getSectionIcon={getSectionIcon}
                getSectionsForGrade={getSectionsForGrade}
              />
            ))}
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default StudyStageAccordion; 