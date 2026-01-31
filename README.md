# 🎨 AI-Powered Resume Builder

A beautiful, modern resume builder web application built with React and Material-UI that helps users create professional resumes with AI-enhanced content.

## ✨ Features

- **Multi-step Form Flow**: Guided process from preliminary details → template selection → resume building
- **Two Beautiful Templates**: 
  - Modern Professional (Two-column layout with sidebar)
  - Classic Elegance (Traditional single-column layout)
- **AI Content Generation**: Automatically generate professional bullet points from your inputs
- **Real-time Preview**: See your resume update as you add information
- **Multiple Resume Sections**: Education, Experience, Projects, Skills, Languages, Interests
- **Conditional Questions**: Smart forms that adapt based on your answers
- **Hinglish to English Conversion**: AI automatically converts mixed Hindi-English to proper English
- **Stunning UI**: Gradient backgrounds, glassmorphism effects, smooth animations

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Step 1: Clone or Download the Project

If you have the project files, navigate to the project directory:

```bash
cd resume-builder
```

### Step 2: Install Dependencies

Run the following command to install all required packages:

```bash
npm install
```

This will install:
- React
- Material-UI (MUI)
- MUI Icons
- Emotion (for styling)

### Step 3: Start the Development Server

```bash
npm start
```

The application will open automatically in your browser at `http://localhost:3000`

### Step 4: Build for Production (Optional)

To create an optimized production build:

```bash
npm run build
```

## 📁 Project Structure

```
resume-builder/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── PreliminaryDetails.jsx    # Step 1: User information form
│   │   ├── TemplateSelection.jsx     # Step 2: Choose resume template
│   │   ├── ResumeEditor.jsx          # Step 3: Main editor with sections
│   │   ├── SectionEditor.jsx         # Individual section editing
│   │   └── ResumePreview.jsx         # Live resume preview
│   ├── App.jsx                       # Main app component
│   ├── App.css                       # Animated styles and effects
│   ├── index.js                      # Entry point
│   └── index.css                     # Global styles
├── package.json
└── README.md
```

## 🎯 How to Use the Application

### Step 1: Preliminary Details
1. Fill in your basic information:
   - Full Name *
   - Email *
   - Phone Number *
   - Location *
   - LinkedIn Profile (optional)
   - GitHub Profile (optional)
   - Personal Website (optional)
   - Additional Links (optional - can add multiple)

2. Click "Continue to Templates →"

### Step 2: Template Selection
1. Choose between two templates:
   - **Modern Professional**: Two-column layout, perfect for tech/creative roles
   - **Classic Elegance**: Traditional layout, ideal for corporate positions

2. Click on your preferred template to select it
3. Click "Start Building Resume →"

### Step 3: Build Your Resume
1. Expand each section accordion to add information:

   **Education Section:**
   - Degree/Qualification
   - Institution/University
   - Location & GPA
   - Start and End dates
   - Relevant Coursework
   - Project involvement (Yes/No question)
   - If yes, describe projects

   **Work Experience Section:**
   - Job Title
   - Company
   - Location
   - Start and End dates
   - Key Responsibilities
   - Project involvement (Yes/No question)
   - If yes, describe projects

   **Projects Section:**
   - Project Name
   - Technologies Used
   - Duration
   - Project Link (optional)
   - Description
   - Key Highlights

   **Skills Section:**
   - Category name (e.g., "Programming Languages")
   - Add individual skills (press Enter or click + to add)
   - Multiple categories can be added

   **Languages Section:**
   - Language name
   - Proficiency level (Native/Fluent/Professional/Basic)

   **Interests Section:**
   - Your interests/hobbies

2. For each item, click "Generate AI Content" to:
   - Create professional bullet points
   - Convert Hinglish to proper English
   - Enhance your descriptions

3. Click "Save" to add the item to your resume
4. View real-time preview on the right side

### Step 4: Download Your Resume
- Click "Download Resume" button to export your resume as PDF (feature to be implemented)

## 🎨 Customization

### Changing Colors

Edit `src/App.jsx` theme configuration:

```javascript
const theme = createTheme({
  palette: {
    primary: {
      main: '#6C5CE7', // Change primary color
      light: '#A29BFE',
      dark: '#5F3DC4',
    },
    secondary: {
      main: '#FD79A8', // Change secondary color
      light: '#FDCB6E',
      dark: '#E84393',
    },
  },
});
```

### Adding More Templates

1. Create a new template function in `src/components/ResumePreview.jsx`
2. Add template details to the `templates` array in `TemplateSelection.jsx`
3. Add a condition in `ResumePreview` component to render your template

### Customizing AI Prompts

Edit the `generateAIContent` function in `src/components/SectionEditor.jsx`:

```javascript
const generateAIContent = async (item, section) => {
  // Customize prompts for each section
  // Add your API call to Claude here
};
```

## 🔮 Implementing Real AI Integration

To connect to Claude API for actual AI content generation:

1. Install axios:
```bash
npm install axios
```

2. Update `generateAIContent` in `SectionEditor.jsx`:

```javascript
const generateAIContent = async (item, section) => {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'YOUR_API_KEY', // Use environment variables in production
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: `Create professional resume bullet points for: ${JSON.stringify(item)}. 
                   Convert any Hinglish to proper English. 
                   Make it impressive and ATS-friendly.`
        }]
      })
    });
    
    const data = await response.json();
    return data.content[0].text;
  } catch (error) {
    console.error('AI generation error:', error);
    return 'Error generating content';
  }
};
```

3. Store API key in `.env` file:
```
REACT_APP_CLAUDE_API_KEY=your_api_key_here
```

## 🎨 Design Features

- **Animated Gradient Background**: Floating colored orbs
- **Glassmorphism**: Semi-transparent cards with blur effects
- **Smooth Transitions**: All interactions have elegant animations
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Custom Fonts**: Outfit and Manrope for modern typography
- **Staggered Animations**: Elements fade in sequentially
- **Hover Effects**: Interactive feedback on all clickable elements

## 📝 Future Enhancements

- [ ] PDF export functionality
- [ ] More resume templates (10+ templates)
- [ ] Drag-and-drop section reordering
- [ ] Photo upload for resume
- [ ] Custom color themes
- [ ] Save/Load resume data
- [ ] ATS score checker
- [ ] Multiple resume management
- [ ] Export to different formats (DOCX, TXT)
- [ ] Resume sharing links

## 🛠️ Technologies Used

- **React 18**: Frontend framework
- **Material-UI v5**: UI component library
- **Emotion**: CSS-in-JS styling
- **Google Fonts**: Outfit & Manrope typography

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 📄 License

This project is open source and available for personal and commercial use.

## 💡 Tips for Best Results

1. **Be Specific**: Provide detailed information for better AI-generated content
2. **Use Keywords**: Include industry-relevant terms
3. **Review AI Content**: Always review and edit generated content
4. **Test Both Templates**: Try both templates to see which suits your profile better
5. **Keep It Concise**: Aim for 1-2 pages maximum

## 🎓 Educational Purpose

This project demonstrates:
- Multi-step form handling in React
- State management without external libraries
- MUI component customization
- Conditional rendering
- Real-time preview updates
- Beautiful UI/UX design principles

---

Made with ❤️ using React and Material-UI

For questions or support, please open an issue on the repository.
