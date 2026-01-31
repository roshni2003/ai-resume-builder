import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Chip,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  Divider,
} from '@mui/material';
import { CircularProgress } from '@mui/material';
import { Add, Delete, AutoAwesome, Close } from '@mui/icons-material';
import { AI_PROMPTS } from '../AI_PROMPTS';
import { generateWithBackend } from '../api/aiBackendClient';
import { MenuItem } from '@mui/material';

const SectionEditor = ({ sectionId, sectionTitle, data, onUpdate }) => {
  const [items, setItems] = useState(data || []);
  const [currentItem, setCurrentItem] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [generating, setGenerating] = useState(false);

  React.useEffect(() => {
    if (sectionId === 'summary' && data) {
      setCurrentItem(data);
      setIsAdding(true);
    }
  }, [sectionId, data]);

  const getDefaultItem = () => {
    switch (sectionId) {
      case 'summary':
        return {
          rawText: '',
          aiGenerated: '',
        };
      case 'education':
        return {
          degree: '',
          institution: '',
          location: '',
          startDate: '',
          endDate: '',
          gpa: '',
          coursework: '',
          description: '',
          hasProjects: null,
          projectDetails: '',
        };
      case 'experience':
        return {
          title: '',
          company: '',
          location: '',
          startDate: '',
          endDate: '',
          description: '',
          responsibilities: '',
          hasProjects: null,
          projectDetails: '',
        };
      case 'projects':
        return {
          name: '',
          technologies: '',
          duration: '',
          description: '',
          link: '',
          highlights: '',
        };
      case 'skills':
        return {
          category: '',
          items: [],
          tempSkill: '',
        };
      case 'languages':
        return {
          language: '',
          proficiency: '',
        };
      case 'interests':
        return {
          interest: '',
        };
      default:
        return {};
    }
  };

  const handleStartAdding = () => {
    setCurrentItem(getDefaultItem());
    setIsAdding(true);
  };

  const handleCancelAdding = () => {
    setCurrentItem(null);
    setIsAdding(false);
  };

  const handleFieldChange = (field, value) => {
    setCurrentItem({ ...currentItem, [field]: value });
  };

  const handleGenerateAI = async () => {
    setGenerating(true);
    try {
      let prompt = '';

      switch (sectionId) {
        case 'summary':
          prompt = AI_PROMPTS.summary(currentItem.rawText);
          break;
        case 'education':
          prompt = AI_PROMPTS.education(currentItem);
          break;
        case 'experience':
          prompt = AI_PROMPTS.experience(currentItem);
          break;
        case 'projects':
          prompt = AI_PROMPTS.projects(currentItem);
          break;
        case 'skills':
          // If the user typed a tempSkill but hasn't committed it, include it in the prompt
          const itemsForPrompt = [...(currentItem.items || [])];
          if (currentItem.tempSkill && currentItem.tempSkill.trim()) itemsForPrompt.push(currentItem.tempSkill.trim());
          prompt = AI_PROMPTS.skills_description({ ...currentItem, items: itemsForPrompt });
          break;
        default:
          prompt = AI_PROMPTS.general_enhancement(
            currentItem.description || ''
          );
      }

      const enhancedContent = await generateWithBackend(prompt);

      setCurrentItem({
        ...currentItem,
        aiGenerated: enhancedContent,
      });

    } catch (error) {
      console.error('Gemini AI generation failed:', error);
      alert('AI generation failed. Check backend logs for Gemini error.');
    }
    finally {
      setGenerating(false);
    }
  };


  const handleSaveItem = () => {
    // For skills: if user has a tempSkill, commit it before saving
    if (sectionId === 'summary') {
      onUpdate(currentItem);     // save summary
      setItems([]);              // clear items list
      handleCancelAdding();      // CLOSE input box
      return;
    }
    let toSave = { ...currentItem };
    if (sectionId === 'skills') {
      const committed = [...(toSave.items || [])];
      if (toSave.tempSkill && toSave.tempSkill.trim()) {
        committed.push(toSave.tempSkill.trim());
        toSave.items = committed;
        toSave.tempSkill = '';
      }

      // If AI returned a sentence but no explicit items, try to extract comma/and-separated skills
      if ((!toSave.items || toSave.items.length === 0) && toSave.aiGenerated) {
        const extractSkillsFromAI = (text) => {
          try {
            const s = text.split(/[.\n]/)[0]; // first sentence
            // look for 'in X, Y and Z' or 'Proficient in X and Y' patterns
            const inMatch = s.match(/in\s+(.+)$/i);
            const listPart = inMatch ? inMatch[1] : s;
            // remove phrases after 'with' or 'with experience' etc.
            const cleaned = listPart.split(/with\b|with experience|who\b/gi)[0];
            // split by commas and ' and '
            const parts = cleaned.split(/,| and /i).map(p => p.trim()).filter(Boolean);
            // filter out short words
            return parts.filter(p => p.length > 1);
          } catch (e) { return []; }
        };

        const parsed = extractSkillsFromAI(toSave.aiGenerated || '');
        if (parsed.length) {
          toSave.items = parsed;
        }
      }
    }

    const updatedItems = [...items, toSave];
    setItems(updatedItems);
    onUpdate(updatedItems);
    handleCancelAdding();
  };

  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    onUpdate(updatedItems);
  };

  const renderItemForm = () => {
    if (!currentItem) return null;

    switch (sectionId) {
      case 'summary':
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Professional Summary (write freely)"
              value={currentItem.rawText}
              onChange={(e) => handleFieldChange('rawText', e.target.value)}
              placeholder="Frontend developer with experience in React, building scalable web applications..."
            />

            {currentItem.aiGenerated && (
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  borderRadius: 2,
                  bgcolor: 'rgba(108, 92, 231, 0.05)',
                  border: '1px dashed',
                  borderColor: 'primary.main',
                }}
              >
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: 'primary.main' }}>
                  ✨ AI Generated Summary
                </Typography>

                <Typography variant="body2" sx={{ whiteSpace: 'pre-line', mb: 1 }}>
                  {currentItem.aiGenerated}
                </Typography>

                <Button
                  fullWidth
                  variant="contained"
                  startIcon={
                    generating ? <CircularProgress size={18} color="inherit" /> : <AutoAwesome />
                  }
                  onClick={handleGenerateAI}
                  disabled={generating}
                >
                  {generating ? 'Generating...' : 'Generate AI Content'}
                </Button>

              </Box>
            )}
          </Box>
        );

      case 'education':
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Degree / Qualification"
              value={currentItem.degree}
              onChange={(e) => handleFieldChange('degree', e.target.value)}
              placeholder="Bachelor of Science in Computer Science"
            />
            <TextField
              fullWidth
              label="Institution / University"
              value={currentItem.institution}
              onChange={(e) => handleFieldChange('institution', e.target.value)}
              placeholder="MIT"
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Location"
                  value={currentItem.location}
                  onChange={(e) => handleFieldChange('location', e.target.value)}
                  placeholder="Boston, MA"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="GPA (Optional)"
                  value={currentItem.gpa}
                  onChange={(e) => handleFieldChange('gpa', e.target.value)}
                  placeholder="3.8/4.0"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Start Date"
                  value={currentItem.startDate}
                  onChange={(e) => handleFieldChange('startDate', e.target.value)}
                  placeholder="Aug 2020"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="End Date"
                  value={currentItem.endDate}
                  onChange={(e) => handleFieldChange('endDate', e.target.value)}
                  placeholder="May 2024"
                />
              </Grid>
            </Grid>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Relevant Coursework"
              value={currentItem.coursework}
              onChange={(e) => handleFieldChange('coursework', e.target.value)}
              placeholder="Data Structures, Algorithms, Machine Learning"
            />

            <Divider sx={{ my: 1 }} />

            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Did you work on any projects as part of this course?
            </Typography>
            <RadioGroup
              value={currentItem.hasProjects || ''}
              onChange={(e) => handleFieldChange('hasProjects', e.target.value)}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>

            {currentItem.hasProjects === 'yes' && (
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Project Details"
                value={currentItem.projectDetails}
                onChange={(e) => handleFieldChange('projectDetails', e.target.value)}
                placeholder="Describe your academic projects..."
              />
            )}
          </Box>
        );

      case 'experience':
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Job Title"
              value={currentItem.title}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              placeholder="Software Engineer"
            />
            <TextField
              fullWidth
              label="Company"
              value={currentItem.company}
              onChange={(e) => handleFieldChange('company', e.target.value)}
              placeholder="Google"
            />
            <TextField
              fullWidth
              label="Location"
              value={currentItem.location}
              onChange={(e) => handleFieldChange('location', e.target.value)}
              placeholder="Mountain View, CA"
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Start Date"
                  value={currentItem.startDate}
                  onChange={(e) => handleFieldChange('startDate', e.target.value)}
                  placeholder="Jun 2023"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="End Date"
                  value={currentItem.endDate}
                  onChange={(e) => handleFieldChange('endDate', e.target.value)}
                  placeholder="Present"
                />
              </Grid>
            </Grid>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Key Responsibilities"
              value={currentItem.responsibilities}
              onChange={(e) => handleFieldChange('responsibilities', e.target.value)}
              placeholder="Describe your main responsibilities..."
            />

            <Divider sx={{ my: 1 }} />

            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Did you work on specific projects in this role?
            </Typography>
            <RadioGroup
              value={currentItem.hasProjects || ''}
              onChange={(e) => handleFieldChange('hasProjects', e.target.value)}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>

            {currentItem.hasProjects === 'yes' && (
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Project Details"
                value={currentItem.projectDetails}
                onChange={(e) => handleFieldChange('projectDetails', e.target.value)}
                placeholder="Describe the projects you worked on..."
              />
            )}
          </Box>
        );

      case 'projects':
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Project Name"
              value={currentItem.name}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              placeholder="E-commerce Platform"
            />
            <TextField
              fullWidth
              label="Technologies Used"
              value={currentItem.technologies}
              onChange={(e) => handleFieldChange('technologies', e.target.value)}
              placeholder="React, Node.js, MongoDB"
            />
            <TextField
              fullWidth
              label="Duration"
              value={currentItem.duration}
              onChange={(e) => handleFieldChange('duration', e.target.value)}
              placeholder="3 months"
            />
            <TextField
              fullWidth
              label="Project Link (Optional)"
              value={currentItem.link}
              onChange={(e) => handleFieldChange('link', e.target.value)}
              placeholder="https://github.com/username/project"
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              value={currentItem.description}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              placeholder="Describe what you built and achieved..."
            />
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Key Highlights"
              value={currentItem.highlights}
              onChange={(e) => handleFieldChange('highlights', e.target.value)}
              placeholder="Major achievements and impact..."
            />
          </Box>
        );

      case 'skills':
        const QUICK_SKILLS = [
          'JavaScript', 'TypeScript', 'React', 'Next.js',
          'Node.js', 'HTML', 'CSS', 'Tailwind',
          'Git', 'REST API',
          'Communication', 'Problem Solving', 'Teamwork'
        ];

        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

            <Typography variant="subtitle2">Quick Add Skills</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {QUICK_SKILLS.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  onClick={() => {
                    if (!(currentItem.items || []).includes(skill)) {
                      handleFieldChange('items', [...(currentItem.items || []), skill]);
                    }
                  }}
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                label="Add Custom Skill"
                value={currentItem.tempSkill || ''}
                onChange={(e) => handleFieldChange('tempSkill', e.target.value)}
              />
              <IconButton
                onClick={() => {
                  if (currentItem.tempSkill) {
                    handleFieldChange('items', [...(currentItem.items || []), currentItem.tempSkill]);
                    handleFieldChange('tempSkill', '');
                  }
                }}
                sx={{ bgcolor: 'primary.main', color: 'white' }}
              >
                <Add />
              </IconButton>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {(currentItem.items || []).map((skill, idx) => (
                <Chip
                  key={idx}
                  label={skill}
                  onDelete={() =>
                    handleFieldChange(
                      'items',
                      currentItem.items.filter((_, i) => i !== idx)
                    )
                  }
                />
              ))}
            </Box>
          </Box>
        );


      case 'languages':
        const QUICK_LANGUAGES = ['English', 'Hindi', 'Spanish', 'French'];

        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

            <Typography variant="subtitle2">Quick Add</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {QUICK_LANGUAGES.map(lang => (
                <Chip
                  key={lang}
                  label={lang}
                  onClick={() => handleFieldChange('language', lang)}
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Box>

            <TextField
              fullWidth
              label="Language"
              value={currentItem.language}
              onChange={(e) => handleFieldChange('language', e.target.value)}
            />

            <TextField
              select
              fullWidth
              label="Proficiency"
              value={currentItem.proficiency}
              onChange={(e) => handleFieldChange('proficiency', e.target.value)}
            >
              {['Native', 'Fluent', 'Professional', 'Basic'].map(level => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        );

      case 'interests':
        const QUICK_INTERESTS = [
          'Photography', 'Traveling', 'Reading',
          'Open Source', 'Blogging', 'Chess'
        ];

        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

            <Typography variant="subtitle2">Quick Add</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {QUICK_INTERESTS.map(item => (
                <Chip
                  key={item}
                  label={item}
                  onClick={() => handleFieldChange('interest', item)}
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Box>

            <TextField
              fullWidth
              label="Interest / Hobby"
              value={currentItem.interest}
              onChange={(e) => handleFieldChange('interest', e.target.value)}
              placeholder="e.g. Photography"
            />
          </Box>
        );

      default:
        return null;
    }
  };


  return (
    <Box>
      {sectionId === 'summary' && data && (
        <Box
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 2,
            bgcolor: 'rgba(108, 92, 231, 0.05)',
            border: '1px solid rgba(108, 92, 231, 0.2)',
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            Professional Summary
          </Typography>
          <Typography variant="body2">
            {data.aiGenerated || data.rawText}
          </Typography>
        </Box>
      )}
      {items.length > 0 && (
        <Box sx={{ mb: 3 }}>
          {items.map((item, index) => (
            <Box
              key={index}
              sx={{
                p: 2,
                mb: 2,
                borderRadius: 2,
                bgcolor: 'rgba(108, 92, 231, 0.05)',
                border: '1px solid rgba(108, 92, 231, 0.2)',
                position: 'relative',
              }}
            >
              <IconButton
                size="small"
                onClick={() => handleDeleteItem(index)}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  color: 'error.main',
                }}
              >
                <Delete fontSize="small" />
              </IconButton>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                {item.degree || item.title || item.name || item.category || item.language || item.interest}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.institution || item.company || item.technologies ||
                  (item.items && item.items.join(', ')) || item.proficiency}
              </Typography>
              {item.aiGenerated && (
                <Typography variant="body2" sx={{ mt: 1, whiteSpace: 'pre-line' }}>
                  {item.aiGenerated}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      )}

      {!isAdding && sectionId !== 'summary' ? (
        <Button
          fullWidth
          variant="outlined"
          startIcon={<Add />}
          onClick={handleStartAdding}
          sx={{
            borderColor: 'primary.main',
            color: 'primary.main',
            '&:hover': {
              borderColor: 'primary.dark',
              bgcolor: 'rgba(108, 92, 231, 0.05)',
            },
          }}
        >
          Add {sectionTitle}
        </Button>
      ) : (
        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            bgcolor: 'white',
            border: '2px solid',
            borderColor: 'primary.main',
          }}
        >
          {renderItemForm()}

          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            {!['skills', 'languages', 'interests'].includes(sectionId) && (
              <Button
                fullWidth
                variant="contained"
                startIcon={generating ? <CircularProgress size={18} color="inherit" /> : <AutoAwesome />}
                onClick={handleGenerateAI}
                disabled={generating}
              >
                {generating ? 'Generating...' : 'Generate AI Content'}
              </Button>
            )}

            <Button
              fullWidth
              variant="outlined"
              onClick={handleSaveItem}
            >
              Save
            </Button>
            <IconButton
              onClick={handleCancelAdding}
              sx={{ color: 'error.main' }}
            >
              <Close />
            </IconButton>
          </Box>

          {currentItem.aiGenerated && (
            <Box
              sx={{
                mt: 2,
                p: 2,
                borderRadius: 2,
                bgcolor: 'rgba(108, 92, 231, 0.05)',
                border: '1px dashed',
                borderColor: 'primary.main',
              }}
            >
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: 'primary.main' }}>
                ✨ AI Generated Content:
              </Typography>
              <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                {currentItem.aiGenerated}
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default SectionEditor;
