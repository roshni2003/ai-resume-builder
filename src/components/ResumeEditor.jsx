import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { ArrowBack, ExpandMore, Download } from '@mui/icons-material';
import ResumePreview from './ResumePreview';
import SectionEditor from './SectionEditor';
import SummaryEditor from './SummaryEditor';

const sections = [
  { id: 'summary', title: 'Summary', icon: '🧾' },
  { id: 'education', title: 'Education', icon: '🎓' },
  { id: 'experience', title: 'Work Experience', icon: '💼' },
  { id: 'projects', title: 'Projects', icon: '🚀' },
  { id: 'skills', title: 'Skills', icon: '⚡' },
  { id: 'languages', title: 'Languages', icon: '🌍' },
  { id: 'interests', title: 'Interests', icon: '🎯' },
];

const ResumeEditor = ({ userData, setUserData, onBack, saveSnapshot, loadSnapshot }) => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [previewKey, setPreviewKey] = useState(0);

  const handleSectionUpdate = (sectionId, data) => {
    setUserData({
      ...userData,
      sections: {
        ...userData.sections,
        [sectionId]: data,
      },
    });
    // Force preview update
    setPreviewKey(prev => prev + 1);
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedSection(isExpanded ? panel : null);
  };

  const handleDownload = () => {
    // Print the preview element and copy current page styles so the PDF matches the on-screen resume
    const previewEl = document.getElementById('resume-preview');
    if (!previewEl) {
      alert('Preview not available for download');
      return;
    }

    const printWindow = window.open('', '_blank');
    if (!printWindow) { alert('Unable to open print window'); return; }

    // Collect current document <link rel="stylesheet"> and <style> tags so we preserve styling
    const headNodes = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'));
    const headHtml = headNodes.map(n => n.outerHTML).join('\n');

    const extraPrintStyles = `
      @page { size: 8.5in 11in; margin: 0.4in; }
      html,body { margin: 0; padding: 0; }
      /* Ensure no accidental page breaks inside resume */
      #resume-preview { page-break-inside: avoid; }
      #resume-preview * { page-break-inside: avoid; }
    `;

    printWindow.document.open();
    printWindow.document.write(`<!doctype html><html><head><title>Resume</title>${headHtml}<style>${extraPrintStyles}</style></head><body>`);

    // Insert the preview DOM
    printWindow.document.write(previewEl.innerHTML);

    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();

    // Wait a moment for styles and fonts to load in the new window, then call print
    setTimeout(() => {
      try { printWindow.print(); } catch (e) { console.error('Print failed', e); }
      // Do not forcibly close the window immediately so user can interact with print dialog
    }, 500);
  };

  const handleSummaryUpdate = (data) => {
    // update data
    handleSectionUpdate('summary', data);
    // if data is present (saved), collapse the summary accordion
    if (data) setExpandedSection(null);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={onBack}
        sx={{
          mb: 3,
          color: 'primary.main',
          fontWeight: 600,
          '&:hover': {
            bgcolor: 'rgba(108, 92, 231, 0.1)',
          },
        }}
      >
        Back to Templates
      </Button>

      <Grid container spacing={4}>
        {/* Left side - Editor */}
        <Grid item xs={12} lg={5}>
          <Paper
            elevation={0}
            className="glass-card"
            sx={{
              p: 3,
              borderRadius: 4,
              maxHeight: 'calc(100vh - 120px)',
              overflow: 'auto',
              position: 'sticky',
              top: 20,
            }}
          >
            <Typography
              variant="h4"
              className="gradient-text"
              sx={{
                mb: 3,
                fontWeight: 800,
              }}
            >
              Build Your Resume ✨
            </Typography>

            <Box sx={{ mb: 3 }}>
              {sections.map((section, index) => (
                <Accordion
                  key={section.id}
                  expanded={expandedSection === section.id}
                  onChange={handleAccordionChange(section.id)}
                  className={`fade-in-up stagger-${index + 1}`}
                  elevation={0}
                  sx={{
                    mb: 2,
                    borderRadius: '12px !important',
                    border: '1px solid rgba(0,0,0,0.08)',
                    '&:before': { display: 'none' },
                    background: expandedSection === section.id 
                      ? 'linear-gradient(135deg, rgba(108, 92, 231, 0.05) 0%, rgba(253, 121, 168, 0.05) 100%)'
                      : 'white',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    sx={{
                      '& .MuiAccordionSummary-content': {
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                      },
                    }}
                  >
                    <Typography sx={{ fontSize: '1.5rem' }}>
                      {section.icon}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {section.title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {section.id === 'summary' ? (
                      <SummaryEditor
                        data={userData.sections.summary}
                        onUpdate={(data) => handleSummaryUpdate(data)}
                      />
                    ) : (
                      <SectionEditor
                        sectionId={section.id}
                        sectionTitle={section.title}
                        data={userData.sections[section.id]}
                        onUpdate={(data) => handleSectionUpdate(section.id, data)}
                      />
                    )}
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>

            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<Download />}
              onClick={handleDownload}
              sx={{
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #6C5CE7 0%, #FD79A8 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5F3DC4 0%, #E84393 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 32px rgba(108, 92, 231, 0.3)',
                },
              }}
            >
              Download Resume
            </Button>
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <Button variant="outlined" onClick={() => { if (typeof saveSnapshot === 'function') { saveSnapshot('latest'); alert('Saved snapshot: latest'); } else alert('Save not available'); }}>
                Save Snapshot
              </Button>
              <Button variant="outlined" onClick={() => { if (typeof loadSnapshot === 'function') { const ok = loadSnapshot('latest'); alert(ok ? 'Loaded snapshot: latest' : 'No snapshot found'); } else alert('Load not available'); }}>
                Load Snapshot
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Right side - Preview */}
        <Grid item xs={12} lg={7}>
          <Box
            sx={{
              position: 'sticky',
              top: 20,
            }}
          >
            <div id="resume-preview">
              <ResumePreview 
                key={previewKey}
                userData={userData} 
              />
            </div>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ResumeEditor;
