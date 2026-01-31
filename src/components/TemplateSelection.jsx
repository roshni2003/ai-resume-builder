import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import { ArrowBack, Check } from '@mui/icons-material';

const templates = [
  {
    id: 1,
    name: 'Modern Professional',
    description: 'Clean and contemporary design perfect for tech and creative roles',
    preview: '/template1-preview.png',
    color: '#6C5CE7',
    features: ['Two-column layout', 'Skills bar', 'Icon integration'],
  },
  {
    id: 2,
    name: 'Classic Elegance',
    description: 'Traditional layout ideal for corporate and formal positions',
    preview: '/template2-preview.png',
    color: '#FD79A8',
    features: ['Single-column layout', 'Minimalist design', 'Professional tone'],
  },
];

const TemplateSelection = ({ onSelect, onBack, selectedTemplate }) => {
  const [hoveredTemplate, setHoveredTemplate] = useState(null);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box className="fade-in-up">
        <Button
          startIcon={<ArrowBack />}
          onClick={onBack}
          sx={{
            mb: 4,
            color: 'primary.main',
            fontWeight: 600,
            '&:hover': {
              bgcolor: 'rgba(108, 92, 231, 0.1)',
            },
          }}
        >
          Back to Details
        </Button>

        <Typography
          variant="h2"
          className="gradient-text"
          sx={{
            mb: 2,
            fontSize: { xs: '2rem', md: '3rem' },
            fontWeight: 800,
            textAlign: 'center',
          }}
        >
          Choose Your Style 🎨
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 6, textAlign: 'center', fontSize: '1.1rem' }}
        >
          Select a template that matches your professional personality
        </Typography>

        <Grid container spacing={4}>
          {templates.map((template, index) => (
            <Grid item xs={12} md={6} key={template.id}>
              <Card
                className={`hover-scale fade-in-up stagger-${index + 1}`}
                elevation={0}
                onMouseEnter={() => setHoveredTemplate(template.id)}
                onMouseLeave={() => setHoveredTemplate(null)}
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  position: 'relative',
                  borderRadius: 4,
                  border: selectedTemplate === template.id 
                    ? `3px solid ${template.color}` 
                    : '1px solid rgba(0,0,0,0.08)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  background: selectedTemplate === template.id 
                    ? `linear-gradient(135deg, ${template.color}08 0%, ${template.color}15 100%)`
                    : 'white',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 20px 40px ${template.color}30`,
                  },
                }}
                onClick={() => onSelect(template.id)}
              >
                {selectedTemplate === template.id && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      zIndex: 10,
                      bgcolor: template.color,
                      color: 'white',
                      borderRadius: '50%',
                      width: 48,
                      height: 48,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 4px 12px ${template.color}40`,
                    }}
                  >
                    <Check sx={{ fontSize: 28 }} />
                  </Box>
                )}

                {/* Template Preview Image Placeholder */}
                <Box
                  sx={{
                    height: 300,
                    background: `linear-gradient(135deg, ${template.color}20 0%, ${template.color}40 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Decorative elements */}
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                      p: 3,
                      opacity: hoveredTemplate === template.id ? 0.8 : 0.6,
                      transition: 'opacity 0.3s',
                    }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <Box
                        key={i}
                        sx={{
                          height: 12,
                          bgcolor: 'white',
                          borderRadius: 1,
                          width: `${100 - i * 15}%`,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        }}
                      />
                    ))}
                  </Box>
                  
                  <Typography
                    variant="h4"
                    sx={{
                      color: template.color,
                      fontWeight: 800,
                      textAlign: 'center',
                      zIndex: 1,
                      textShadow: '0 2px 12px rgba(255,255,255,0.8)',
                    }}
                  >
                    {template.name}
                  </Typography>
                </Box>

                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 1,
                      fontWeight: 700,
                      color: template.color,
                    }}
                  >
                    {template.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2, lineHeight: 1.7 }}
                  >
                    {template.description}
                  </Typography>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {template.features.map((feature, idx) => (
                      <Chip
                        key={idx}
                        label={feature}
                        size="small"
                        sx={{
                          bgcolor: `${template.color}15`,
                          color: template.color,
                          fontWeight: 600,
                          border: `1px solid ${template.color}30`,
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {selectedTemplate && (
          <Box
            className="fade-in-up"
            sx={{
              mt: 6,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => onSelect(selectedTemplate)}
              sx={{
                py: 2,
                px: 6,
                fontSize: '1.1rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #6C5CE7 0%, #FD79A8 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5F3DC4 0%, #E84393 100%)',
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 32px rgba(108, 92, 231, 0.3)',
                },
              }}
            >
              Start Building Resume →
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default TemplateSelection;
