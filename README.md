# Hirely | AI Powered Smart Resume Screener

An AI-powered Resume Screening System that automatically parses resumes, extracts structured candidate information, compares candidates against a Job Description using Google's Gemini LLM, and generates an explainable AI evaluation report.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini-8E75B2?style=for-the-badge&logo=google-gemini&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)
![License](https://img.shields.io/badge/License-Academic-blue?style=for-the-badge)
![VS Code](https://img.shields.io/badge/VS_Code-0078D4?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

## Demo Video Link: 
https://youtu.be/j2f4AANSl6c

## Screenshots

### Dashboard
<p align="center">
    <img src="Screenshots/Dashboard.png" width="900">
</p>

---

### Screening Progress
<p align="center">
    <img src="Screenshots/ScreeningProgress.png" width="900">
</p>

---
### Screening Result
<p align="center">
    <img src="Screenshots/ScreeningResult.png" width="900">
</p>

---

### AI Report
<p align="center">
    <img src="Screenshots/DetailedReport.png" width="900">
</p>

---
### Screening History
<p align="center">
    <img src="Screenshots/ScreeningHistory.png" width="900">
</p>

---



## Overview
Hiring teams often spend significant time manually reviewing resumes before shortlisting candidates.

Hirely automates this process by:

- Parsing uploaded PDF resumes
- Extracting structured candidate information
- Comparing candidates with a Job Description
- Generating AI-based scores with explanations
- Ranking candidates
- Maintaining complete screening history

Unlike traditional keyword-based resume filters, Hirely uses Large Language Models (Gemini) to perform semantic candidate-job matching and provide evidence-backed justifications.

---

## Features

### Resume Management

- Upload multiple PDF resumes
- Automatic resume parsing
- Resume Library
- Search resumes instantly
- Archive / Restore resumes
- Delete resumes

---

## Key Highlights

- Two-stage AI pipeline (Resume Parsing → Candidate Matching)
- Semantic resume-job matching using Google Gemini
- Explainable AI with requirement-wise evidence
- Resume library with archive and search
- Live screening progress tracking
- AI-generated interview questions
- Reusable parsed resumes across multiple screenings

### AI Resume Parsing (Stage 1)

Each uploaded resume is converted into structured JSON containing:

- Summary
- Skills
- Experience
- Projects
- Education
- Certifications

The parsed profile is stored in MySQL for future screenings.

---

### AI Candidate Matching (Stage 2)

The extracted candidate profile is compared against a Job Description.

The AI generates:

- Match Score (0–10)
- Decision
- Confidence
- Requirement Coverage
- Summary
- Strengths
- Weaknesses
- Missing Skills
- Interview Questions
- Improvement Suggestions
- Requirement-wise Evidence

---

### Screening Dashboard

- Start a new screening
- Select multiple resumes
- Enter Job Title
- Enter Job Description
- View live screening progress

---

### Screening History

- View all previous screenings
- Open previous results
- Access detailed AI reports anytime

---

### AI Report 
Displays the complete AI-generated evaluation produced during Stage 2.

Every screened resume generates a detailed report including:

- Overall Evaluation
- Match Score
- Decision
- Confidence
- Requirement Coverage
- Strengths
- Weaknesses
- Missing Skills
- Evidence Mapping
- Interview Questions
- Improvement Suggestions

---

## Tech Stack

| Category | Technologies |
|----------|--------------|
| Backend | Node.js, Express.js |
| Frontend | HTML, CSS, EJS, JavaScript |
| Database | MySQL |
| AI | Google Gemini API |
| Libraries | Multer, PDF-Parse, UUID, Dotenv |


---

## Project Architecture

```
                Upload Resume (PDF)
                        │
                        ▼
                Resume Parsing
                        │
                        ▼
          Gemini Stage 1 (Extraction)
                        │
                        ▼
          Structured Candidate Profile
                        │
                        ▼
                Store in MySQL
                        │
────────────────────────┼────────────────────────
                        │
                  Start Screening
                        │
              Select Parsed Resumes
                        │
                Enter Job Description
                        │
                        ▼
           Gemini Stage 2 (Matching)
                        │
                        ▼
              Candidate Evaluation
                        │
                        ▼
        Store Screening Results (MySQL)
                        │
                        ▼
      Dashboard → Ranking → AI Report
```

---

## Database Design
The application uses a normalized MySQL database consisting of five primary tables to manage resumes, parsed candidate profiles, screening sessions, and AI-generated evaluation reports.

### Database Tables

| Table | Purpose |
|--------|---------|
| **Resume** | Stores uploaded resume metadata, file information, parsing status, and archive status. |
| **ParsedResume** | Stores the raw extracted resume text and the structured candidate profile generated during AI Stage 1. |
| **Screening** | Stores each screening session, including the job title, job description, overall status, and progress statistics. |
| **ScreeningResume** | Junction table that links resumes to a screening session and tracks the processing status of each resume. |
| **ScreeningResult** | Stores the AI evaluation generated during Stage 2, including score, decision, confidence, requirement coverage, and the complete JSON analysis. |

<p align="center">
    <img src="Screenshots/ErDiagram.png" width="900">
</p>

The separation between **ParsedResume** and **ScreeningResult** allows resumes to be parsed only once while enabling the same candidate profile to be evaluated against multiple job descriptions in different screening sessions.


## Complete System Workflow

The following workflow illustrates how Hirely processes resumes from upload to AI-generated evaluation and report generation.

```text
                         USER

                           │
                           ▼

                Upload One or More PDF Resumes
                           │
                           ▼

                     Resume Table
        (Stores file metadata and upload details)
                           │
                           ▼

                 Extract Resume Text (PDF Parse)
                           │
                           ▼

                 Gemini Stage 1 - Resume Parsing
                           │
                           ▼

          Structured Candidate Profile (JSON)
     • Summary
     • Skills
     • Experience
     • Projects
     • Education
     • Certifications
                           │
                           ▼

                  ParsedResume Table
     (Stores raw text + structured candidate profile)
                           │
                           ▼

         Resume appears in Resume Library Dashboard
                           │
───────────────────────────┼───────────────────────────
                           │
                           ▼

              User selects one or more resumes
                           │
                           ▼

                 Enter Job Title
                           │
                           ▼

               Enter Job Description
                           │
                           ▼

                  Create Screening Session
                           │
                           ▼

                  Screening Table
        (Stores Job Details and Progress)
                           │
                           ▼

              Create ScreeningResume Records
      (Tracks processing status of every resume)
                           │
                           ▼

            Load Parsed Candidate Profile
                    from ParsedResume
                           │
                           ▼

              Gemini Stage 2 - AI Matching
                           │
                           ▼

         Candidate Profile + Job Description
                           │
                           ▼

                AI Candidate Evaluation

                 • Match Score (0–10)
                 • Decision
                 • Confidence
                 • Requirement Coverage
                 • Summary
                 • Strengths
                 • Weaknesses
                 • Missing Skills
                 • Interview Questions
                 • Improvement Suggestions
                 • Requirement-wise Evidence
                           │
                           ▼

               ScreeningResult Table
      (Stores complete AI-generated evaluation)
                           │
                           ▼

          Live Progress Tracking Updates
                           │
                           ▼

                 Screening Completed
                           │
                           ▼

                 View Ranked Candidates
                           │
                           ▼

         Click Candidate → Detailed AI Report
                           │
                           ▼

             Screening stored in History
          (Can be viewed again at any time)
```

### Key Design Advantage

Hirely separates **resume parsing** and **candidate evaluation** into two independent AI stages.

- **Stage 1** parses each resume only once and stores the structured candidate profile.
- **Stage 2** reuses the stored candidate profile for any number of future screening sessions.

This architecture reduces redundant AI calls, improves efficiency, and allows the same resume to be evaluated against multiple job descriptions without re-parsing the document.



## Folder Structure
```
Hirely
|
├── config/              # Database configuration
├── controllers/         # Route controllers
├── routes/              # Express routes
├── services/            # Business logic & AI services
├── validators/          # Request validation
├── public/
│   ├── css/
│   └── js/
├── storage/             # Uploaded resumes
├── views/               # EJS templates
├── screenshots/         # README images
├── app.js
├── package.json
└── README.md
```
## LLM Prompts
Hirely uses a two-stage Gemini pipeline. Each stage has a single, 
narrowly-scoped prompt rather than one large multi-purpose prompt — 
this keeps outputs predictable and easy to validate against a fixed JSON schema.

### stage 1 Extracting Candidats Profile
Hirely uses a two-stage Gemini pipeline. Each stage has a single, 
narrowly-scoped prompt rather than one large multi-purpose prompt — 
this keeps outputs predictable and easy to validate against a fixed JSON schema.

```
You are an expert ATS resume parser.

Your task is to extract structured candidate information.

Return ONLY valid JSON.

Do not include markdown.
Do not include explanation.
Do not wrap inside \`\`\`.

Schema:

{
  "summary": "",
  "skills": [],
  "experience": [],
  "projects": [],
  "education": [],
  "certifications": []
}

Resume:

${resumeText}

```

### stage 2 jobDescription Matching 
Compares the structured candidate profile against the job description 
and produces an evidence-backed evaluation.

Key design choices:
- **Fixed score bands** (9-10, 7-8.5, 5-6.5, etc.) mapped to decisions 
  (STRONG_MATCH / GOOD_MATCH / REVIEW / REJECT) so the LLM can't invent 
  its own scoring logic — every score is anchored to an explicit rubric.
- **Confidence is restricted to 5 fixed values** (40/60/75/90/95) rather 
  than a free-form number, since confidence is about how sure the model 
  is in its own evaluation, not the candidate's quality — keeping it 
  discrete makes it interpretable rather than arbitrary.
- **Holistic evaluation is explicitly instructed**: the prompt tells 
  the model not to reject candidates solely for missing specific 
  technologies, and to weigh transferable skills, projects, and 
  academic experience — this avoids the common failure mode of naive 
  keyword-matching resume screeners.
- **Evidence is mandatory per requirement.** If a resume doesn't support 
  a requirement, the model must explicitly say "Not found in resume" 
  rather than omitting it — this is what makes the output auditable/explainable.
  
```
You are an experienced technical recruiter.

Evaluate the candidate holistically against the job description.

Do NOT reject a candidate only because a few technologies are missing.
Consider:
- relevant projects
- transferable skills
- education
- practical experience
- technical knowledge
- problem-solving ability
- overall potential

Return ONLY valid JSON.

{
  "score": 0.0,
  "decision": "",
  "confidence": 0,
  "requirement_coverage": 0,
  "summary": "",
  "strengths": [],
  "weaknesses": [],
  "missing_skills": [],
  "interview_questions": [],
  "improvement_suggestions": [],
  "evidence":[
    {
      "requirement":"",
      "evidence":""
    }
  ]
}

Rules

1. Score must be between 0.0 and 10.0 (0.5 increments).

Score Guide

9-10
Excellent fit.
Most requirements satisfied.
Strong projects and experience.

7-8.5
Good fit.
Missing a few skills but can contribute immediately.

5-6.5
Partial fit.
Has relevant knowledge/projects but lacks several required skills.
Suitable for interview or further evaluation.

3-4.5
Weak fit.
Some transferable skills but major gaps.

0-2.5
Very poor fit.
Almost no relevant evidence.

2. Decision

9-10 -> STRONG_MATCH
7-8.5 -> GOOD_MATCH
5-6.5 -> REVIEW
0-4.5 -> REJECT

3. Confidence

Use only:
40
60
75
90
95

Confidence means confidence in YOUR evaluation, not candidate quality.

4. Requirement Coverage

Estimate what percentage of explicit job requirements are satisfied.

5. Summary

Maximum 60 words.

6. Lists

strengths
weaknesses
missing_skills
interview_questions
improvement_suggestions

Return 2-5 concise items.

7. Evidence

For every important job requirement provide resume evidence.
If evidence is missing, explicitly state:
"Not found in resume."

8. Important

Reward relevant academic projects, internships and transferable skills.

Do NOT heavily penalize candidates for missing optional technologies if they demonstrate related knowledge.

Candidate Profile:
${JSON.stringify(candidateProfile)}

Job Description:
${jobDescription}


```
## Installation

Clone the repository

```bash
git clone <repository-url>
```

Install dependencies

```bash
npm install
```

Create a .env file

```env
PORT=8080

DB_HOST=

DB_USER=

DB_PASSWORD=

DB_NAME=

GEMINI_API_KEY=
```

Run the application

```bash
npm run dev
```
Open your browser and navigate to: 

```text
http://localhost:8080
```

---

## Future Improvements

- Authentication & Recruiter Accounts
- Cloud-based Resume Storage
- PDF Export of AI Reports
- Resume Comparison
- Batch AI Processing
- Better Prompt Optimization
- Email Notifications

---

## Author
**Harsh**

Final Year B.Tech Project

Vishwakarma Institute of Technology, Pune

## License
This project was developed for academic and educational purposes.