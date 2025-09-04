import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
  useTheme,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  School as SchoolIcon,
  Grade as GradeIcon,
  Class as ClassIcon,
  AccountTree as AccountTreeIcon,
  ChildCare as ChildCareIcon,
  SchoolOutlined as ElementaryIcon,
  Groups as GroupsIcon,
  Category as CategoryIcon,
  Book as BookIcon,
  ChildFriendly as ChildFriendlyIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const SchoolStructureSelector = ({
  studyStages = [],
  grades = [],
  sections = [],
  selectedStudyStage,
  selectedGrade,
  selectedSection,
  onStudyStageChange,
  onGradeChange,
  onSectionChange,
  disabled = false,
  fullWidth = true,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [expandedStage, setExpandedStage] = useState(null);
  const [expandedGrade, setExpandedGrade] = useState(null);

  // Get grades for selected study stage
  const gradesForSelectedStage = selectedStudyStage 
    ? grades.filter(grade => grade.study_stage?.id === selectedStudyStage)
    : [];

  // Get sections for selected grade
  const sectionsForSelectedGrade = selectedGrade 
    ? sections.filter(section => section.grade?.id === selectedGrade)
    : [];

  const handleStageClick = (stageId) => {
    onStudyStageChange(stageId);
    onGradeChange('');
    onSectionChange('');
    setExpandedStage(expandedStage === stageId ? null : stageId);
    setExpandedGrade(null);
  };

  const handleGradeClick = (gradeId) => {
    onGradeChange(gradeId);
    onSectionChange('');
    setExpandedGrade(expandedGrade === gradeId ? null : gradeId);
  };

  const handleSectionClick = (sectionId) => {
    onSectionChange(sectionId);
  };

  const getStudyStageIcon = (stageName) => {
    const name = stageName.toLowerCase();
    if (name.includes('kindergarten')) return <ChildCareIcon sx={{ color: theme.palette.primary.main, fontSize: 20 }} />;
    if (name.includes('elementary')) return <ElementaryIcon sx={{ color: theme.palette.primary.main, fontSize: 20 }} />;
    if (name.includes('middle')) return <SchoolIcon sx={{ color: theme.palette.primary.main, fontSize: 20 }} />;
    if (name.includes('high')) return <AccountTreeIcon sx={{ color: theme.palette.primary.main, fontSize: 20 }} />;
    return <GroupsIcon sx={{ color: theme.palette.primary.main, fontSize: 20 }} />;
  };

  const getGradeIcon = (gradeName) => {
    const name = gradeName.toLowerCase();
    if (name.includes('kg')) return <ChildFriendlyIcon sx={{ color: theme.palette.secondary.main, fontSize: 18 }} />;
    if (name.includes('grade')) return <GradeIcon sx={{ color: theme.palette.secondary.main, fontSize: 18 }} />;
    return <ClassIcon sx={{ color: theme.palette.secondary.main, fontSize: 18 }} />;
  };

  const getSectionIcon = () => {
    return <BookIcon sx={{ color: theme.palette.info.main, fontSize: 16 }} />;
  };

  const getDisplayValue = () => {
    if (selectedSection) {
      const section = sections.find(s => s.id === parseInt(selectedSection));
      return section ? section.name : '';
    }
    if (selectedGrade) {
      const grade = grades.find(g => g.id === parseInt(selectedGrade));
      return grade ? grade.name : '';
    }
    if (selectedStudyStage) {
      const stage = studyStages.find(s => s.id === parseInt(selectedStudyStage));
      return stage ? stage.name : '';
    }
    return '';
  };

  return (
    <Box>
      <FormControl fullWidth={fullWidth} disabled={disabled}>
        <InputLabel>{t('schoolStructure')}</InputLabel>
        <Select
          value={selectedSection || selectedGrade || selectedStudyStage || ''}
          label={t('schoolStructure')}
          displayEmpty
          renderValue={() => (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {selectedSection && getSectionIcon()}
              {selectedGrade && !selectedSection && getGradeIcon(grades.find(g => g.id === parseInt(selectedGrade))?.name || '')}
              {selectedStudyStage && !selectedGrade && !selectedSection && getStudyStageIcon(studyStages.find(s => s.id === parseInt(selectedStudyStage))?.name || '')}
              <Typography variant="body2">
                {getDisplayValue() || t('selectSchoolStructure')}
              </Typography>
            </Box>
          )}
        >
          <MenuItem value="">
            <Typography variant="body2" color="text.secondary">
              {t('selectSchoolStructure')}
            </Typography>
          </MenuItem>

          {/* Study Stages with expandable grades and sections */}
          {studyStages.map((stage) => (
            <Box key={stage.id}>
              <Accordion
                expanded={expandedStage === stage.id}
                onChange={() => handleStageClick(stage.id)}
                sx={{ 
                  boxShadow: 'none',
                  '&:before': { display: 'none' },
                  '&.Mui-expanded': { margin: 0 }
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ 
                    minHeight: 48,
                    '&.Mui-expanded': { minHeight: 48 },
                    '& .MuiAccordionSummary-content': { margin: '8px 0' }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                    {getStudyStageIcon(stage.name)}
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {stage.name}
                    </Typography>
                    <Chip 
                      label={t('studyStage')} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                    />
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0 }}>
                  <List dense sx={{ py: 0 }}>
                    {grades
                      .filter(grade => grade.study_stage?.id === stage.id)
                      .map((grade) => (
                        <Box key={grade.id}>
                          <Accordion
                            expanded={expandedGrade === grade.id}
                            onChange={() => handleGradeClick(grade.id)}
                            sx={{ 
                              boxShadow: 'none',
                              '&:before': { display: 'none' },
                              '&.Mui-expanded': { margin: 0 }
                            }}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              sx={{ 
                                minHeight: 40,
                                pl: 2,
                                '&.Mui-expanded': { minHeight: 40 },
                                '& .MuiAccordionSummary-content': { margin: '4px 0' }
                              }}
                            >
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                                {getGradeIcon(grade.name)}
                                <Typography variant="body2">
                                  {grade.name}
                                </Typography>
                                <Chip 
                                  label={t('grade')} 
                                  size="small" 
                                  color="secondary" 
                                  variant="outlined"
                                />
                              </Box>
                            </AccordionSummary>
                            <AccordionDetails sx={{ p: 0 }}>
                              <List dense sx={{ py: 0 }}>
                                {sections
                                  .filter(section => section.grade?.id === grade.id)
                                  .map((section) => (
                                    <ListItem key={section.id} disablePadding>
                                      <ListItemButton
                                        onClick={() => handleSectionClick(section.id)}
                                        sx={{ pl: 4, py: 0.5 }}
                                      >
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                                          {getSectionIcon()}
                                          <ListItemText 
                                            primary={section.name}
                                            primaryTypographyProps={{ variant: 'body2' }}
                                          />
                                          <Chip 
                                            label={t('section')} 
                                            size="small" 
                                            color="info" 
                                            variant="outlined"
                                          />
                                        </Box>
                                      </ListItemButton>
                                    </ListItem>
                                  ))}
                              </List>
                            </AccordionDetails>
                          </Accordion>
                        </Box>
                      ))}
                  </List>
                </AccordionDetails>
              </Accordion>
              <Divider />
            </Box>
          ))}
        </Select>
      </FormControl>

      {/* Selection Summary */}
      {(selectedStudyStage || selectedGrade || selectedSection) && (
        <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {selectedStudyStage && (
            <Chip
              label={`${t('studyStage')}: ${studyStages.find(s => s.id === parseInt(selectedStudyStage))?.name}`}
              color="primary"
              variant="outlined"
              onDelete={() => {
                onStudyStageChange('');
                onGradeChange('');
                onSectionChange('');
                setExpandedStage(null);
                setExpandedGrade(null);
              }}
            />
          )}
          {selectedGrade && (
            <Chip
              label={`${t('grade')}: ${grades.find(g => g.id === parseInt(selectedGrade))?.name}`}
              color="secondary"
              variant="outlined"
              onDelete={() => {
                onGradeChange('');
                onSectionChange('');
                setExpandedGrade(null);
              }}
            />
          )}
          {selectedSection && (
            <Chip
              label={`${t('section')}: ${sections.find(s => s.id === parseInt(selectedSection))?.name}`}
              color="info"
              variant="outlined"
              onDelete={() => {
                onSectionChange('');
              }}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default SchoolStructureSelector;
