import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import PreliminaryDetails from './components/PreliminaryDetails';
import TemplateSelection from './components/TemplateSelection';
import ResumeEditor from './components/ResumeEditor';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6C5CE7',
      light: '#A29BFE',
      dark: '#5F3DC4',
    },
    secondary: {
      main: '#FD79A8',
      light: '#FDCB6E',
      dark: '#E84393',
    },
    background: {
      default: '#F8F9FF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2D3436',
      secondary: '#636E72',
    },
  },
  typography: {
    fontFamily: '"Outfit", "Manrope", -apple-system, BlinkMacSystemFont, sans-serif',
    h1: {
      fontFamily: '"Clash Display", "Outfit", sans-serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Clash Display", "Outfit", sans-serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: '"Clash Display", "Outfit", sans-serif',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '1rem',
          padding: '12px 28px',
          borderRadius: '12px',
          boxShadow: 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 24px rgba(108, 92, 231, 0.25)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-1px)',
            },
            '&.Mui-focused': {
              boxShadow: '0 4px 16px rgba(108, 92, 231, 0.15)',
            },
          },
        },
      },
    },
  },
});

function App() {
  const [step, setStep] = useState(1);
  const defaultData = {
    preliminary: {},
    selectedTemplate: null,
    sections: {
      summary: {
        rawText: '',
        aiGenerated: '',
      },
      education: [],
      experience: [],
      projects: [],
      skills: [],
      languages: [],
      interests: [],
    }
  };

  const [userData, setUserData] = useState(() => {
    try {
      const raw = localStorage.getItem('resume_userData');
      if (!raw) return defaultData;
      const parsed = JSON.parse(raw);
      // Keep saved resume content but reset preliminary details on page load
      return {
        ...defaultData,
        ...parsed,
        preliminary: {},
      };
    } catch (e) {
      return defaultData;
    }
  });

  const handlePreliminarySubmit = (data) => {
    setUserData({ ...userData, preliminary: data });
    setStep(2);
  };

  const handleTemplateSelect = (template) => {
    setUserData({ ...userData, selectedTemplate: template });
    setStep(3);
  };

  // Persist userData to localStorage whenever it changes
  React.useEffect(() => {
    try {
      localStorage.setItem('resume_userData', JSON.stringify(userData));
    } catch (e) {
      // ignore
    }
  }, [userData]);

  const handleSaveSnapshot = (name = 'latest') => {
    try {
      const snapshots = JSON.parse(localStorage.getItem('resume_snapshots') || '{}');
      snapshots[name] = userData;
      localStorage.setItem('resume_snapshots', JSON.stringify(snapshots));
      return true;
    } catch (e) { return false; }
  };

  const handleLoadSnapshot = (name = 'latest') => {
    try {
      const snapshots = JSON.parse(localStorage.getItem('resume_snapshots') || '{}');
      if (snapshots[name]) setUserData(snapshots[name]);
      return !!snapshots[name];
    } catch (e) { return false; }
  };

  const handleBackToTemplates = () => {
    setStep(2);
  };

  const handleBackToPreliminary = () => {
    setStep(1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="app-container">
        <div className="animated-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>

        {step === 1 && (
          <PreliminaryDetails onSubmit={handlePreliminarySubmit} initialData={userData.preliminary} />
        )}

        {step === 2 && (
          <TemplateSelection
            onSelect={handleTemplateSelect}
            onBack={handleBackToPreliminary}
            selectedTemplate={userData.selectedTemplate}
          />
        )}

        {step === 3 && (
          <ResumeEditor
            userData={userData}
            setUserData={setUserData}
            onBack={handleBackToTemplates}
            saveSnapshot={handleSaveSnapshot}
            loadSnapshot={handleLoadSnapshot}
          />
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
