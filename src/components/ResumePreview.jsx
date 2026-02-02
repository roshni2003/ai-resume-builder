import React from 'react';
import { Box, Paper, Typography, Divider, Chip } from '@mui/material';
import { Email, Phone, LocationOn, LinkedIn, GitHub, Language } from '@mui/icons-material';

const ResumePreview = ({ userData }) => {
  const { preliminary, selectedTemplate, sections } = userData;

  if (selectedTemplate === 1) {
    return <ModernProfessionalTemplate preliminary={preliminary} sections={sections} />;
  } else if (selectedTemplate === 2) {
    return <ClassicEleganceTemplate preliminary={preliminary} sections={sections} />;
  }

  return null;
};

// Template 1: Modern Professional (Two-column)
const ModernProfessionalTemplate = ({ preliminary, sections }) => {
  return (
    <Paper
      elevation={4}
      sx={{
        width: '100%',
        aspectRatio: '8.5/11',
        bgcolor: 'white',
        overflow: 'auto',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      }}
    >
      <Box sx={{ display: 'flex', height: '100%' }}>
        {/* Left Column - Sidebar */}
        <Box
          sx={{
            width: '35%',
            bgcolor: '#2C3E50',
            color: 'white',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          {/* Contact Info */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, fontSize: '0.9rem' }}>
              CONTACT
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {preliminary?.email && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Email sx={{ fontSize: '1rem' }} />
                  <Typography sx={{ fontSize: '0.75rem', wordBreak: 'break-all' }}>
                    {preliminary.email}
                  </Typography>
                </Box>
              )}
              {preliminary?.phone && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Phone sx={{ fontSize: '1rem' }} />
                  <Typography sx={{ fontSize: '0.75rem' }}>{preliminary.phone}</Typography>
                </Box>
              )}
              {preliminary?.location && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn sx={{ fontSize: '1rem' }} />
                  <Typography sx={{ fontSize: '0.75rem' }}>{preliminary.location}</Typography>
                </Box>
              )}
            </Box>
          </Box>

          <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />

          {/* Links */}
          {(preliminary?.linkedin || preliminary?.github || preliminary?.website) && (
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, fontSize: '0.9rem' }}>
                LINKS
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {preliminary.linkedin && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LinkedIn sx={{ fontSize: '1rem' }} />
                    <Typography sx={{ fontSize: '0.7rem', wordBreak: 'break-all' }}>
                      {preliminary.linkedin}
                    </Typography>
                  </Box>
                )}
                {preliminary.github && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <GitHub sx={{ fontSize: '1rem' }} />
                    <Typography sx={{ fontSize: '0.7rem', wordBreak: 'break-all' }}>
                      {preliminary.github}
                    </Typography>
                  </Box>
                )}
                {preliminary.website && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Language sx={{ fontSize: '1rem' }} />
                    <Typography sx={{ fontSize: '0.7rem', wordBreak: 'break-all' }}>
                      {preliminary.website}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          )}

          {/* Skills */}
          {sections?.skills && sections.skills.length > 0 && (
            <>
              <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, fontSize: '0.9rem' }}>
                  SKILLS
                </Typography>
                {sections.skills.map((skill, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, mb: 1 }}>
                      {skill.category}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {skill.items?.map((item, idx) => (
                        <Chip
                          key={idx}
                          label={item}
                          size="small"
                          sx={{
                            bgcolor: 'rgba(255,255,255,0.2)',
                            color: 'white',
                            fontSize: '0.65rem',
                            height: '20px',
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                ))}
              </Box>
            </>
          )}

          {/* Languages */}
          {sections?.languages && sections.languages.length > 0 && (
            <>
              <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, fontSize: '0.9rem' }}>
                  LANGUAGES
                </Typography>
                {sections.languages.map((lang, index) => (
                  <Box key={index} sx={{ mb: 1 }}>
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 600 }}>
                      {lang.language}
                    </Typography>
                    <Typography sx={{ fontSize: '0.7rem', opacity: 0.8 }}>
                      {lang.proficiency}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </>
          )}
        </Box>

        {/* Right Column - Main Content */}
        <Box sx={{ flex: 1, p: 3 }}>
          {/* Name Header */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: '#2C3E50',
                fontSize: '2rem',
                mb: 0.5,
              }}
            >
              {preliminary?.name || 'Your Name'}
            </Typography>
            <Divider sx={{ bgcolor: '#6C5CE7', height: 3, width: 60 }} />
          </Box>

          {/* Education */}
          {/* Summary */}
          {sections?.summary && (sections.summary.aiGenerated || sections.summary.rawText) && (
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="body1"
                sx={{ fontSize: '0.95rem', color: 'text.secondary', mb: 1 }}
              >
                {sections.summary.aiGenerated || sections.summary.rawText}
              </Typography>
            </Box>
          )}
          {sections?.education && sections.education.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: '#6C5CE7',
                  mb: 2,
                  fontSize: '1rem',
                }}
              >
                EDUCATION
              </Typography>
              {sections.education.map((edu, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#2C3E50' }}>
                    {edu.degree}
                  </Typography>
                  <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#6C5CE7' }}>
                    {edu.institution}
                  </Typography>
                  <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                    {edu.location} | {edu.startDate} - {edu.endDate}
                    {edu.gpa && ` | GPA: ${edu.gpa}`}
                  </Typography>
                  {edu.aiGenerated && (
                    <Typography
                      sx={{
                        fontSize: '0.75rem',
                        mt: 1,
                        color: 'text.secondary',
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {edu.aiGenerated}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          )}

          {/* Experience */}
          {sections?.experience && sections.experience.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: '#6C5CE7',
                  mb: 2,
                  fontSize: '1rem',
                }}
              >
                EXPERIENCE
              </Typography>
              {sections.experience.map((exp, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#2C3E50' }}>
                    {exp.title}
                  </Typography>
                  <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#6C5CE7' }}>
                    {exp.company}
                  </Typography>
                  <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                    {exp.location} | {exp.startDate} - {exp.endDate}
                  </Typography>
                  {exp.aiGenerated && (
                    <Typography
                      sx={{
                        fontSize: '0.75rem',
                        mt: 1,
                        color: 'text.secondary',
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {exp.aiGenerated}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          )}

          {/* Projects */}
          {sections?.projects && sections.projects.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: '#6C5CE7',
                  mb: 2,
                  fontSize: '1rem',
                }}
              >
                PROJECTS
              </Typography>
              {sections.projects.map((project, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#2C3E50' }}>
                    {project.name}
                  </Typography>
                  <Typography sx={{ fontSize: '0.75rem', color: '#6C5CE7', mb: 0.5 }}>
                    {project.technologies}
                  </Typography>
                  {project.aiGenerated && (
                    <Typography
                      sx={{
                        fontSize: '0.75rem',
                        color: 'text.secondary',
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {project.aiGenerated}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          )}

          {/* Interests */}
          {sections?.interests && sections.interests.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: '#6C5CE7',
                  mb: 1,
                  fontSize: '1rem',
                }}
              >
                INTERESTS
              </Typography>
              <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                {sections.interests.map((int) => int.interest).join(' • ')}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

// Template 2: Classic Elegance (Single-column)
const ClassicEleganceTemplate = ({ preliminary, sections }) => {
  return (
    <Paper
      elevation={4}
      sx={{
        width: '100%',
        aspectRatio: '8.5/11',
        bgcolor: 'white',
        p: 4,
        overflow: 'auto',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      }}
    >
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 3, pb: 2, borderBottom: '2px solid #FD79A8' }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: '#2C3E50',
            fontSize: '2.2rem',
            mb: 1,
            fontFamily: 'Georgia, serif',
          }}
        >
          {preliminary?.name || 'Your Name'}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 2,
            fontSize: '0.8rem',
            color: 'text.secondary',
          }}
        >
          {preliminary?.email && <Typography sx={{ fontSize: '0.8rem' }}>{preliminary.email}</Typography>}
          {preliminary?.phone && <Typography sx={{ fontSize: '0.8rem' }}>•</Typography>}
          {preliminary?.phone && <Typography sx={{ fontSize: '0.8rem' }}>{preliminary.phone}</Typography>}
          {preliminary?.location && <Typography sx={{ fontSize: '0.8rem' }}>•</Typography>}
          {preliminary?.location && <Typography sx={{ fontSize: '0.8rem' }}>{preliminary.location}</Typography>}
        </Box>

        {(preliminary?.linkedin || preliminary?.github || preliminary?.website) && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: 2,
              mt: 1,
              fontSize: '0.75rem',
              color: '#FD79A8',
            }}
          >
            {preliminary.linkedin && <Typography sx={{ fontSize: '0.75rem' }}>{preliminary.linkedin}</Typography>}
            {preliminary.github && <Typography sx={{ fontSize: '0.75rem' }}>•</Typography>}
            {preliminary.github && <Typography sx={{ fontSize: '0.75rem' }}>{preliminary.github}</Typography>}
            {preliminary.website && <Typography sx={{ fontSize: '0.75rem' }}>•</Typography>}
            {preliminary.website && <Typography sx={{ fontSize: '0.75rem' }}>{preliminary.website}</Typography>}
          </Box>
        )}
      </Box>

      {/* Education */}
      {sections?.education && sections.education.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{
              fontWeight: 700,
              color: '#FD79A8',
              mb: 1.5,
              fontSize: '1.1rem',
              fontFamily: 'Georgia, serif',
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            Education
          </Typography>
          <Divider sx={{ mb: 2, bgcolor: '#FD79A8' }} />
          {sections.education.map((edu, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography sx={{ fontSize: '0.9rem', fontWeight: 700 }}>
                  {edu.degree}
                </Typography>
                <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                  {edu.startDate} - {edu.endDate}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: '0.85rem', fontStyle: 'italic', color: '#FD79A8', mb: 0.5 }}>
                {edu.institution}, {edu.location}
              </Typography>
              {edu.gpa && (
                <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                  GPA: {edu.gpa}
                </Typography>
              )}
              {edu.aiGenerated && (
                <Typography
                  sx={{
                    fontSize: '0.8rem',
                    mt: 1,
                    color: 'text.secondary',
                    whiteSpace: 'pre-line',
                    lineHeight: 1.6,
                  }}
                >
                  {edu.aiGenerated}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      )}

      {/* Experience */}
      {sections?.experience && sections.experience.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{
              fontWeight: 700,
              color: '#FD79A8',
              mb: 1.5,
              fontSize: '1.1rem',
              fontFamily: 'Georgia, serif',
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            Professional Experience
          </Typography>
          <Divider sx={{ mb: 2, bgcolor: '#FD79A8' }} />
          {sections.experience.map((exp, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography sx={{ fontSize: '0.9rem', fontWeight: 700 }}>
                  {exp.title}
                </Typography>
                <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                  {exp.startDate} - {exp.endDate}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: '0.85rem', fontStyle: 'italic', color: '#FD79A8', mb: 0.5 }}>
                {exp.company}, {exp.location}
              </Typography>
              {exp.aiGenerated && (
                <Typography
                  sx={{
                    fontSize: '0.8rem',
                    mt: 1,
                    color: 'text.secondary',
                    whiteSpace: 'pre-line',
                    lineHeight: 1.6,
                  }}
                >
                  {exp.aiGenerated}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      )}

      {/* Projects */}
      {sections?.projects && sections.projects.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography
            sx={{
              fontWeight: 700,
              color: '#FD79A8',
              mb: 1.5,
              fontSize: '1.1rem',
              fontFamily: 'Georgia, serif',
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            Projects
          </Typography>
          <Divider sx={{ mb: 2, bgcolor: '#FD79A8' }} />
          {sections.projects.map((project, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography sx={{ fontSize: '0.9rem', fontWeight: 700 }}>
                {project.name}
              </Typography>
              <Typography sx={{ fontSize: '0.8rem', color: '#FD79A8', mb: 0.5 }}>
                {project.technologies}
              </Typography>
              {project.aiGenerated && (
                <Typography
                  sx={{
                    fontSize: '0.8rem',
                    color: 'text.secondary',
                    whiteSpace: 'pre-line',
                    lineHeight: 1.6,
                  }}
                >
                  {project.aiGenerated}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      )}

      {/* Skills */}
      {sections?.skills && sections.skills.length > 0 && (
  <Box sx={{ mb: 3 }}>
    <Typography
      sx={{
        fontWeight: 700,
        color: '#FD79A8',
        mb: 1.5,
        fontSize: '1.1rem',
        fontFamily: 'Georgia, serif',
        textTransform: 'uppercase',
        letterSpacing: 1,
      }}
    >
      Skills
    </Typography>

    <Divider sx={{ mb: 2, bgcolor: '#FD79A8' }} />

    <Box
      sx={{
        columnCount: 2,          // ✅ two columns
        columnGap: '32px',       // ✅ space between columns
      }}
    >
      <Typography
        sx={{
          fontSize: '0.85rem',
          color: 'text.secondary',
          lineHeight: 1.9,
        }}
      >
        {sections.skills
          .flatMap(skill => skill.items || [])
          .join(' • ')}
      </Typography>
    </Box>
  </Box>
)}


      {/* Languages & Interests */}
      <Box sx={{ display: 'flex', gap: 4 }}>
        {sections?.languages && sections.languages.length > 0 && (
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontWeight: 700,
                color: '#FD79A8',
                mb: 1,
                fontSize: '1rem',
                fontFamily: 'Georgia, serif',
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}
            >
              Languages
            </Typography>
            {sections.languages.map((lang, index) => (
              <Typography key={index} sx={{ fontSize: '0.8rem', mb: 0.5 }}>
                <strong>{lang.language}:</strong> {lang.proficiency}
              </Typography>
            ))}
          </Box>
        )}

        {sections?.interests && sections.interests.length > 0 && (
          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontWeight: 700,
                color: '#FD79A8',
                mb: 1,
                fontSize: '1rem',
                fontFamily: 'Georgia, serif',
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}
            >
              Interests
            </Typography>
            <Typography sx={{ fontSize: '0.8rem' }}>
              {sections.interests.map((int) => int.interest).join(', ')}
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default ResumePreview;
