import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Chip,
  TextField,
  InputAdornment,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Close as CloseIcon,
  Search as SearchIcon,
  ExpandMore as ExpandMoreIcon,
  School as SchoolIcon,
  Grade as GradeIcon,
  Class as ClassIcon,
  AccountTree as AccountTreeIcon,
  ChildCare as ChildCareIcon,
  SchoolOutlined as ElementaryIcon,
  Groups as GroupsIcon,
  Book as BookIcon,
  ChildFriendly as ChildFriendlyIcon,
  Check as CheckIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const SchoolStructureDialog = ({
  open,
  onClose,
  onSelect,
  studyStages = [],
  grades = [],
  sections = [],
  selectedStudyStage,
  selectedGrade,
  selectedSection,
  title = 'Select School Structure',
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedStage, setExpandedStage] = useState(null);
  const [expandedGrade, setExpandedGrade] = useState(null);
  const [tempSelectedStage, setTempSelectedStage] = useState(selectedStudyStage);
  const [tempSelectedGrade, setTempSelectedGrade] = useState(selectedGrade);
  const [tempSelectedSection, setTempSelectedSection] = useState(selectedSection);

  // Reset temp selections when dialog opens
  useEffect(() => {
    if (open) {
      setTempSelectedStage(selectedStudyStage);
      setTempSelectedGrade(selectedGrade);
      setTempSelectedSection(selectedSection);
    }
  }, [open, selectedStudyStage, selectedGrade, selectedSection]);

  const getStudyStageIcon = (stageName) => {
    const name = stageName.toLowerCase();
    if (name.includes('kindergarten')) return <ChildCareIcon sx={{ color: theme.palette.primary.main, fontSize: 24 }} />;
    if (name.includes('elementary')) return <ElementaryIcon sx={{ color: theme.palette.primary.main, fontSize: 24 }} />;
    if (name.includes('middle')) return <SchoolIcon sx={{ color: theme.palette.primary.main, fontSize: 24 }} />;
    if (name.includes('high')) return <AccountTreeIcon sx={{ color: theme.palette.primary.main, fontSize: 24 }} />;
    return <GroupsIcon sx={{ color: theme.palette.primary.main, fontSize: 24 }} />;
  };

  const getGradeIcon = (gradeName) => {
    const name = gradeName.toLowerCase();
    if (name.includes('kg')) return <ChildFriendlyIcon sx={{ color: theme.palette.secondary.main, fontSize: 20 }} />;
    if (name.includes('grade')) return <GradeIcon sx={{ color: theme.palette.secondary.main, fontSize: 20 }} />;
    return <ClassIcon sx={{ color: theme.palette.secondary.main, fontSize: 20 }} />;
  };

  const getSectionIcon = () => {
    return <BookIcon sx={{ color: theme.palette.info.main, fontSize: 18 }} />;
  };

  const handleStageClick = (stageId) => {
    setTempSelectedStage(stageId);
    setTempSelectedGrade('');
    setTempSelectedSection('');
    setExpandedStage(expandedStage === stageId ? null : stageId);
    setExpandedGrade(null);
  };

  const handleGradeClick = (gradeId) => {
    setTempSelectedGrade(gradeId);
    setTempSelectedSection('');
    setExpandedGrade(expandedGrade === gradeId ? null : gradeId);
  };

  const handleSectionClick = (sectionId) => {
    setTempSelectedSection(sectionId);
  };

  const handleSelect = () => {
    onSelect({
      studyStage: tempSelectedStage,
      grade: tempSelectedGrade,
      section: tempSelectedSection,
    });
    onClose();
  };

  const handleClear = () => {
    setTempSelectedStage('');
    setTempSelectedGrade('');
    setTempSelectedSection('');
    setExpandedStage(null);
    setExpandedGrade(null);
  };

  const getSelectedPath = () => {
    const stage = studyStages.find(s => s.id === parseInt(tempSelectedStage));
    const grade = grades.find(g => g.id === parseInt(tempSelectedGrade));
    const section = sections.find(s => s.id === parseInt(tempSelectedSection));
    
    let path = '';
    if (stage) path += stage.name;
    if (grade) path += ` → ${grade.name}`;
    if (section) path += ` → ${section.name}`;
    
    return path || t('noSelection');
  };

  const filteredStudyStages = studyStages.filter(stage => 
    stage.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          maxHeight: '80vh',
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pb: 1
      }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        <Button
          onClick={onClose}
          sx={{ minWidth: 'auto', p: 1 }}
        >
          <CloseIcon />
        </Button>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        {/* Search */}
        <Box sx={{ p: 3, pb: 2 }}>
          <TextField
            fullWidth
            placeholder={t('searchSchoolStructure')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
        </Box>

        <Divider />

        {/* School Structure Tree */}
        <Box sx={{ maxHeight: '50vh', overflow: 'auto' }}>
          {filteredStudyStages.length === 0 ? (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                {t('noResultsFound')}
              </Typography>
            </Box>
          ) : (
            filteredStudyStages.map((stage) => (
              <Accordion
                key={stage.id}
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
                    minHeight: 56,
                    '&.Mui-expanded': { minHeight: 56 },
                    '& .MuiAccordionSummary-content': { margin: '12px 0' }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                    {getStudyStageIcon(stage.name)}
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {stage.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {grades.filter(g => g.study_stage?.id === stage.id).length} {t('grades')}
                      </Typography>
                    </Box>
                    <Chip 
                      label={t('studyStage')} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                    />
                    {tempSelectedStage === stage.id && (
                      <CheckIcon color="primary" />
                    )}
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
                                minHeight: 48,
                                pl: 3,
                                '&.Mui-expanded': { minHeight: 48 },
                                '& .MuiAccordionSummary-content': { margin: '8px 0' }
                              }}
                            >
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                                {getGradeIcon(grade.name)}
                                <Box sx={{ flexGrow: 1 }}>
                                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                    {grade.name}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    {sections.filter(s => s.grade?.id === grade.id).length} {t('sections')}
                                  </Typography>
                                </Box>
                                <Chip 
                                  label={t('grade')} 
                                  size="small" 
                                  color="secondary" 
                                  variant="outlined"
                                />
                                {tempSelectedGrade === grade.id && (
                                  <CheckIcon color="secondary" />
                                )}
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
                                        sx={{ pl: 5, py: 1 }}
                                        selected={tempSelectedSection === section.id}
                                      >
                                        <ListItemIcon sx={{ minWidth: 40 }}>
                                          {getSectionIcon()}
                                        </ListItemIcon>
                                        <ListItemText 
                                          primary={section.name}
                                          secondary={section.limit ? `${t('limit')}: ${section.limit}` : ''}
                                        />
                                        <Chip 
                                          label={t('section')} 
                                          size="small" 
                                          color="info" 
                                          variant="outlined"
                                        />
                                        {tempSelectedSection === section.id && (
                                          <CheckIcon color="info" sx={{ ml: 1 }} />
                                        )}
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
            ))
          )}
        </Box>
      </DialogContent>

      <Divider />

      <DialogActions sx={{ p: 3, gap: 2 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {t('selected')}: {getSelectedPath()}
          </Typography>
        </Box>
        <Button onClick={handleClear} color="inherit">
          {t('clear')}
        </Button>
        <Button onClick={onClose} color="inherit">
          {t('cancel')}
        </Button>
        <Button 
          onClick={handleSelect} 
          variant="contained"
          disabled={!tempSelectedStage && !tempSelectedGrade && !tempSelectedSection}
        >
          {t('select')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SchoolStructureDialog;
