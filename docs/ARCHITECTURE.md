HIRELY - PROJECT ARCHITECTURE (v1.0)
1. Project Goal

Hirely is an AI-powered Applicant Tracking System (ATS).

It helps recruiters upload resumes and compare them against a job description using a two-stage AI pipeline.

The system stores resumes permanently, reuses previously parsed resumes, explains every hiring decision with evidence, and maintains a history of every screening session.

This is not a resume parser.

It is a resume screening platform.

2. Tech Stack

Backend

Node.js
Express.js
MySQL
mysql2/promise
Multer
pdf-parse
Gemini API
Zod
UUID

Frontend

EJS
HTML
CSS
Vanilla JS
3. Major Differentiating Factors

These must NEVER be removed.

1. Two-Stage AI Pipeline

Stage 1

Resume

↓

Extract structured JSON

↓

Store in database

Stage 2

Stored JSON

Job Description

↓

Gemini

↓

Score + Analysis

Why?

cheaper
reusable
cleaner prompts
2. Resume Reuse (Lazy Parsing)

Resume uploaded

↓

Stored

↓

NOT parsed immediately

↓

Only when selected in a screening

↓

Parsed once

↓

Stored forever

↓

Never parsed again

This saves API calls.

3. Evidence-Based AI

Not

Score = 8.5

Instead

Requirement

↓

Resume Evidence

↓

Reason

Example

AWS

↓

Worked on EC2

↓

Direct project experience

Explainable AI.

4. PII Redaction

Before sending resume to Gemini

Remove

Name
Email
Phone
Address

Tell evaluator

"The model evaluates skills, not identity."

5. Screening History

Every screening is stored.

Recruiter can revisit

old JD
old results
old scores

without rerunning AI.

4. User Flow

Homepage

↓

Resume Library

↓

Upload PDFs

↓

Stored permanently

↓

Start New Screening

↓

Select resumes

↓

Paste Job Title

↓

Paste Job Description

↓

Start Screening

↓

Selected resumes checked

↓

Already Parsed?

↓

YES

↓

Reuse JSON

↓

NO

↓

PDF Parse

↓

Gemini Extraction

↓

Store JSON

↓

Gemini Matching

↓

Store Results

↓

Progress updates every 2 seconds

↓

Dashboard Results

↓

History

5. Progress Flow

Global

Created

↓

Processing

↓

Completed

Per Resume

Pending

↓

Parsing

↓

Matching

↓

Completed

or

↓

Failed
6. Database

Resume

Stores uploaded PDFs.

ParsedResume

Stores extracted JSON.

Screening

One screening session.

ScreeningResume

Processing queue.

ScreeningResult

Final AI output.

Schema is LOCKED.

7. Final AI Output

Each candidate has

Score (1–10)
Decision
Confidence
Requirement Coverage
Summary
Strengths
Weaknesses
Matched Skills
Missing Skills
Evidence
Suggestions
Interview Questions

Stored inside analysis_json.

8. Backend Architecture
Route

↓

Controller

↓

Service

↓

Database

Controllers NEVER contain SQL.

Services contain business logic.

Routes stay thin.

9. Folder Structure
Hirely

config/

controllers/

routes/

services/

prompts/

validators/

public/

views/

database/

docs/

storage/

uploads/

exports/
10. AI Pipeline

Upload

↓

Store PDF

↓

Resume Selected

↓

pdf-parse

↓

PII Redaction

↓

Gemini Prompt #1

↓

JSON

↓

Store ParsedResume

↓

Gemini Prompt #2

↓

Match against JD

↓

Store ScreeningResult

11. Progress Updates

Frontend polls every 2 seconds.

No WebSockets.

Reads

Screening.completed_resumes

Screening.failed_resumes

Screening.status

Enough for this project.

12. Error Handling

Gemini failure

↓

Retry

↓

retry_count++

↓

Still fails

↓

Resume marked FAILED

↓

Other resumes continue.

Screening never crashes because of one resume.

13. Current Status

Completed

✅ Folder Structure

✅ GitHub Repository

✅ SQL Schema

✅ Seed Data

✅ Sample Queries

✅ Express

✅ EJS

✅ Morgan

✅ Static Files

✅ mysql2/promise

✅ MySQL Connection

✅ Health Route

Current Commit

Commit #3

Next Task

Dashboard

14. Planned Commit History
Commit 1

Initial project setup

Commit 2

Design and implement database schema

Commit 3 (Current)

Setup Express application and dashboard foundation

Includes

Express
EJS
Promise MySQL
Health Route
Dashboard
Commit 4

Resume Library backend

Upload
Store PDFs
Resume list
Archive
Commit 5

Screening workflow

New Screening
Select resumes
Create session
Commit 6

PDF parsing pipeline

Multer
pdf-parse
ParsedResume storage
Commit 7

Gemini Extraction

Stage 1 AI

Resume → JSON

Commit 8

Gemini Matching

Stage 2 AI

JSON + JD → Score

Commit 9

Progress tracking

Polling

Resume status

Progress bar

Commit 10

Dashboard & Results

Tables

Candidate details

Evidence

Commit 11

History

Previous screenings

Reuse resumes

Commit 12

UI polish

Error handling

README

Demo

15. Coding Rules

These never change.

Use ES Modules.
Use async/await everywhere.
Never write SQL in controllers.
Never call Gemini directly from routes.
One responsibility per service.
Every commit leaves the project runnable.
Think like we're building software a company could actually use, not just an assignment.
Finally...

I want you to copy this into docs/ARCHITECTURE.md tomorrow morning (or when you wake up). That way, the project's most important decisions live in the repository, not just in this chat.

Get some sleep. Tomorrow we stop designing and start building Hirely. From this point onward, most of our work is implementation on top of a foundation we've already thought through carefully.