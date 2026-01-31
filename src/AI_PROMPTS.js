// AI_PROMPTS.js
// Gemini-optimized prompts for ATS-friendly resume generation

export const AI_PROMPTS = {

  education: (data) => `
You are an expert ATS resume writer.

TASK:
Generate professional, resume-ready bullet points for an education entry.

INPUT:
Degree: ${data.degree}
Institution: ${data.institution}
GPA: ${data.gpa || ''}
Coursework: ${data.coursework || ''}
Projects: ${data.projectDetails || ''}

STRICT RULES:
- Output ONLY bullet points
- Do NOT apologize
- Do NOT explain
- Do NOT mention missing data
- Use professional English only (no Hinglish)
- Use strong academic action verbs
- Highlight achievements and relevant coursework
- Mention projects if relevant
- Keep each bullet to 1–2 lines
- Generate EXACTLY 3–4 bullets
- Format bullets starting with •

Generate bullet points now:
`,

  experience: (data) => `
You are an expert ATS resume writer.

TASK:
Generate impactful, achievement-focused bullet points for a work experience entry.

INPUT:
Job Title: ${data.title}
Company: ${data.company}
Responsibilities: ${data.responsibilities || ''}
Projects: ${data.projectDetails || ''}

STRICT RULES:
- Output ONLY bullet points
- Do NOT apologize
- Do NOT explain
- Do NOT mention missing data
- Start every bullet with a strong action verb
- Focus on impact and measurable results
- Use metrics where possible
- Keep each bullet to 1–2 lines
- Generate EXACTLY 4–5 bullets
- Format bullets starting with •

Generate bullet points now:
`,

  projects: (data) => `
You are an expert ATS resume writer.

TASK:
Generate professional, technical bullet points for a project entry.

INPUT:
Project Name: ${data.name}
Technologies: ${data.technologies}
Description: ${data.description || ''}
Highlights: ${data.highlights || ''}

STRICT RULES:
- Output ONLY bullet points
- Do NOT apologize
- Do NOT explain
- Do NOT mention missing data
- Highlight technologies and technical impact
- Start each bullet with an action verb
- Include results or performance improvements if possible
- Keep each bullet to 1–2 lines
- Generate EXACTLY 3–4 bullets
- Format bullets starting with •

Generate bullet points now:
`,

  skills_description: (data) => `
You are an expert ATS resume writer.

TASK:
Write a professional resume sentence describing a skill category.

INPUT:
Category: ${data.category}
Skills (MUST be included verbatim): ${data.items?.join(', ')}

STRICT RULES (IMPORTANT):
- Output EXACTLY ONE sentence
- Do NOT apologize
- Do NOT explain
- Do NOT generalize
- Do NOT replace skills with vague terms
- EVERY listed skill MUST appear exactly as written
- It is OK if a skill is a framework or library
- Use professional, resume-ready English
- Confident and concise tone

BAD EXAMPLE (DO NOT DO THIS):
"Proficient in various programming languages..."

GOOD EXAMPLE:
"Proficient in JavaScript and React, with experience building dynamic, component-based web applications."

Generate the sentence now:
`,


  general_enhancement: (text) => `
You are an expert ATS resume writer.

TASK:
Enhance the provided text to be resume-ready.

INPUT:
${text}

STRICT RULES:
- Output ONLY the enhanced text
- Do NOT apologize
- Do NOT explain
- Do NOT add headings or bullets unless needed
- Use professional English only
- Improve clarity, impact, and strength
- Keep content concise and ATS-friendly

Generate enhanced text now:
`,

  summary: (userData) => `
You are an expert ATS resume writer.

TASK:
Write a compelling professional summary.

INPUT:
${JSON.stringify(userData, null, 2)}

STRICT RULES:
- Output ONLY the summary
- Do NOT apologize
- Do NOT explain
- Do NOT mention missing data
- Write EXACTLY 3–4 sentences
- Highlight strengths, experience, and career focus
- Use strong, professional language
- ATS-friendly keywords only

Generate the professional summary now:
`,
};
