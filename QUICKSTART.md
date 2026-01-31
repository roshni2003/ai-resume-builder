# 🚀 Quick Start Guide - Resume Builder

## Installation & Setup (5 minutes)

### Step 1: Install Node.js
If you don't have Node.js installed:
1. Go to https://nodejs.org/
2. Download the LTS (Long Term Support) version
3. Run the installer
4. Verify installation by opening terminal/command prompt and typing:
   ```bash
   node --version
   npm --version
   ```

### Step 2: Navigate to Project Directory
Open terminal/command prompt and navigate to the project folder:
```bash
cd path/to/resume-builder
```

### Step 3: Install Dependencies
Run this command and wait for it to complete:
```bash
npm install
```
This will take 1-2 minutes and install all required packages.

### Step 4: Start the Application
```bash
npm start
```

Your default browser will automatically open to `http://localhost:3000`

**That's it! You're ready to build resumes! 🎉**

---

## First Time Usage

### 1. Fill Your Details (2 minutes)
- Enter your name, email, phone, location
- Add LinkedIn, GitHub, website (optional)
- Click "Continue to Templates →"

### 2. Choose a Template (30 seconds)
- Click on either:
  - **Modern Professional** (colorful sidebar, two-column)
  - **Classic Elegance** (traditional, single-column)
- Click "Start Building Resume →"

### 3. Build Your Resume (10-15 minutes)
Click each section and fill information:

**🎓 Education:**
- Add your degree, university, dates
- AI will create professional descriptions

**💼 Work Experience:**
- Add job title, company, responsibilities
- AI generates impressive bullet points

**🚀 Projects:**
- List your projects with technologies
- AI enhances descriptions

**⚡ Skills:**
- Categorize your skills
- Add multiple skills per category

**🌍 Languages:**
- List languages you speak
- Add proficiency levels

**🎯 Interests:**
- Quick personal touch

### 4. Generate AI Content
For each section:
1. Fill in the basic information
2. Click "Generate AI Content" button
3. Review AI-generated professional bullet points
4. Click "Save" to add to resume

### 5. Download Your Resume
- Click "Download Resume" at the bottom
- Your professional resume is ready!

---

## Pro Tips 💡

1. **Use the AI Feature**: It converts casual language to professional tone
2. **Hinglish Accepted**: Type in Hindi-English mix, AI will convert to proper English
3. **Be Specific**: More details = better AI-generated content
4. **Real-time Preview**: Watch your resume update as you type
5. **Edit Anytime**: Delete and re-add sections as needed

---

## Troubleshooting

**Problem: npm install fails**
- Solution: Try `npm install --legacy-peer-deps`

**Problem: Port 3000 already in use**
- Solution: The app will ask to use another port (3001), press 'Y'

**Problem: Changes not showing**
- Solution: Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)

**Problem: Styling looks broken**
- Solution: Clear browser cache and reload

---

## Keyboard Shortcuts

- **Enter**: Add skill/link when in text field
- **Ctrl/Cmd + S**: Browser save (download functionality coming soon)
- **Esc**: Close modals/accordions

---

## What to Do Next

1. **Customize Colors**: Edit `src/App.jsx` theme section
2. **Add More Templates**: Check README.md for instructions
3. **Implement PDF Export**: Use libraries like jsPDF or react-pdf
4. **Connect Real AI**: Add Claude API integration (instructions in README)

---

## File Structure (For Developers)

```
resume-builder/
├── src/
│   ├── components/         # All React components
│   ├── App.jsx            # Main app logic
│   ├── App.css            # Animations & styles
│   └── index.js           # Entry point
├── package.json           # Dependencies
└── README.md             # Full documentation
```

---

## Support

- Read full README.md for detailed documentation
- Check code comments for understanding logic
- Customize to fit your needs!

Happy Resume Building! 🎨✨
