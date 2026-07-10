-- ==========================================
-- Resume Library
-- ==========================================

SELECT * FROM Resume;

-- ==========================================
-- View Parsed Resume
-- ==========================================

SELECT
    original_name,
    parsed_data
FROM Resume
JOIN ParsedResume
ON Resume.resume_id = ParsedResume.resume_id;

-- ==========================================
-- Screening Results
-- ==========================================

SELECT
    job_title,
    original_name,
    score,
    decision,
    confidence
FROM ScreeningResult sr
JOIN ScreeningResume scr
ON sr.screening_resume_id = scr.screening_resume_id
JOIN Resume r
ON scr.resume_id = r.resume_id
JOIN Screening s
ON scr.screening_id = s.screening_id;

-- ==========================================
-- View All Tables
-- ==========================================

SELECT * FROM ParsedResume;
SELECT * FROM Screening;
SELECT * FROM ScreeningResume;
SELECT * FROM ScreeningResult;