import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, IconButton } from '@mui/material';
import { AutoAwesome, Edit, Delete } from '@mui/icons-material';
import { generateWithBackend } from '../api/aiBackendClient';
import { AI_PROMPTS } from '../AI_PROMPTS';

const SummaryEditor = ({ data, onUpdate }) => {
  const safeData = data || {};
  const [rawText, setRawText] = useState(safeData.rawText || '');
  const [aiGenerated, setAiGenerated] = useState(safeData.aiGenerated || '');
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(!(safeData.rawText || safeData.aiGenerated));

  useEffect(() => {
    const d = data || {};
    setRawText(d.rawText || '');
    setAiGenerated(d.aiGenerated || '');
  // If data exists, show the saved view; otherwise open editor
  setEditing(!(d.rawText || d.aiGenerated));
  }, [data]);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      // Use general_enhancement prompt to make it resume-ready
      const prompt = AI_PROMPTS.general_enhancement(rawText || '');
      const text = await generateWithBackend(prompt);
      setAiGenerated(text || '');
    } catch (e) {
      console.error('Summary generation failed', e);
      alert('AI generation failed. Check backend logs.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    onUpdate({ rawText, aiGenerated });
    setEditing(false);
  };

  const handleDelete = () => {
    // Tell parent to clear the summary
    onUpdate(null);
    setRawText('');
    setAiGenerated('');
    setEditing(true);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {editing ? (
        <>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Summary (one-paragraph)"
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="Write a short professional summary or leave blank and use AI to generate one"
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<AutoAwesome />}
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate AI Content'}
            </Button>
            <Button variant="outlined" onClick={handleSave}>Save</Button>
          </Box>

          {aiGenerated && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>AI Generated Summary</Typography>
              <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>{aiGenerated}</Typography>
            </Box>
          )}
        </>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Saved Summary</Typography>
          <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>{aiGenerated || rawText}</Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            <Button variant="outlined" startIcon={<Edit />} onClick={() => setEditing(true)}>Edit</Button>
            <Button variant="text" color="error" startIcon={<Delete />} onClick={handleDelete}>Delete</Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SummaryEditor;
