import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Person,
  Email,
  Phone,
  LocationOn,
  LinkedIn,
  GitHub,
  Language,
  Add,
  Delete,
} from '@mui/icons-material';

const PreliminaryDetails = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    location: initialData?.location || '',
    linkedin: initialData?.linkedin || '',
    github: initialData?.github || '',
    website: initialData?.website || '',
    additionalLinks: initialData?.additionalLinks || [],
  });

  const [newLink, setNewLink] = useState('');

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleAddLink = () => {
    if (newLink.trim()) {
      setFormData({
        ...formData,
        additionalLinks: [...formData.additionalLinks, newLink.trim()],
      });
      setNewLink('');
    }
  };

  const handleRemoveLink = (index) => {
    setFormData({
      ...formData,
      additionalLinks: formData.additionalLinks.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box className="fade-in-up">
        <Paper
          elevation={0}
          className="glass-card"
          sx={{
            p: 5,
            borderRadius: 4,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative element */}
          <Box
            sx={{
              position: 'absolute',
              top: -50,
              right: -50,
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #6C5CE7 0%, #FD79A8 100%)',
              opacity: 0.1,
              filter: 'blur(40px)',
            }}
          />

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
            Let's Get Started! ✨
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 5, textAlign: 'center', fontSize: '1.1rem' }}
          >
            Tell us about yourself and we'll create an amazing resume for you
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Name */}
              <Grid item xs={12} className="fade-in-up stagger-1">
                <TextField
                  fullWidth
                  required
                  label="Full Name"
                  value={formData.name}
                  onChange={handleChange('name')}
                  placeholder="John Doe"
                  InputProps={{
                    startAdornment: <Person sx={{ mr: 1, color: 'primary.main' }} />,
                  }}
                />
              </Grid>

              {/* Email and Phone */}
              <Grid item xs={12} md={6} className="fade-in-up stagger-2">
                <TextField
                  fullWidth
                  required
                  type="email"
                  label="Email"
                  value={formData.email}
                  onChange={handleChange('email')}
                  placeholder="john@example.com"
                  InputProps={{
                    startAdornment: <Email sx={{ mr: 1, color: 'primary.main' }} />,
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6} className="fade-in-up stagger-2">
                <TextField
                  fullWidth
                  required
                  label="Phone Number"
                  value={formData.phone}
                  onChange={handleChange('phone')}
                  placeholder="+1 234 567 8900"
                  InputProps={{
                    startAdornment: <Phone sx={{ mr: 1, color: 'primary.main' }} />,
                  }}
                />
              </Grid>

              {/* Location */}
              <Grid item xs={12} className="fade-in-up stagger-3">
                <TextField
                  fullWidth
                  required
                  label="Location"
                  value={formData.location}
                  onChange={handleChange('location')}
                  placeholder="New York, USA"
                  InputProps={{
                    startAdornment: <LocationOn sx={{ mr: 1, color: 'primary.main' }} />,
                  }}
                />
              </Grid>

              {/* LinkedIn and GitHub */}
              <Grid item xs={12} md={6} className="fade-in-up stagger-4">
                <TextField
                  fullWidth
                  label="LinkedIn Profile"
                  value={formData.linkedin}
                  onChange={handleChange('linkedin')}
                  placeholder="linkedin.com/in/johndoe"
                  InputProps={{
                    startAdornment: <LinkedIn sx={{ mr: 1, color: 'primary.main' }} />,
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6} className="fade-in-up stagger-4">
                <TextField
                  fullWidth
                  label="GitHub Profile"
                  value={formData.github}
                  onChange={handleChange('github')}
                  placeholder="github.com/johndoe"
                  InputProps={{
                    startAdornment: <GitHub sx={{ mr: 1, color: 'primary.main' }} />,
                  }}
                />
              </Grid>

              {/* Website */}
              <Grid item xs={12} className="fade-in-up stagger-5">
                <TextField
                  fullWidth
                  label="Personal Website"
                  value={formData.website}
                  onChange={handleChange('website')}
                  placeholder="www.johndoe.com"
                  InputProps={{
                    startAdornment: <Language sx={{ mr: 1, color: 'primary.main' }} />,
                  }}
                />
              </Grid>

              {/* Additional Links */}
              <Grid item xs={12} className="fade-in-up stagger-5">
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <TextField
                    fullWidth
                    label="Additional Links (Portfolio, Blog, etc.)"
                    value={newLink}
                    onChange={(e) => setNewLink(e.target.value)}
                    placeholder="https://example.com"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddLink();
                      }
                    }}
                  />
                  <IconButton
                    onClick={handleAddLink}
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'white',
                      mt: 1,
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      },
                    }}
                  >
                    <Add />
                  </IconButton>
                </Box>

                {formData.additionalLinks.length > 0 && (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                    {formData.additionalLinks.map((link, index) => (
                      <Chip
                        key={index}
                        label={link}
                        onDelete={() => handleRemoveLink(index)}
                        deleteIcon={<Delete />}
                        sx={{
                          bgcolor: 'rgba(108, 92, 231, 0.1)',
                          color: 'primary.main',
                          fontWeight: 500,
                        }}
                      />
                    ))}
                  </Box>
                )}
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12} className="fade-in-up stagger-5">
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    mt: 2,
                    py: 2,
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
                  Continue to Templates →
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default PreliminaryDetails;
