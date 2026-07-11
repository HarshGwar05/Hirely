import connection from "../config/db.js";

export const getScreeningProgress = async (screeningId) => {

    const [screeningRows] = await connection.query(
`
SELECT
    screening_id,
    job_title,
    status,
    total_resumes,
    completed_resumes,
    failed_resumes
FROM Screening
WHERE screening_id = ?
`,
[screeningId]
);

const [resumeRows] = await connection.query(
`
SELECT
    r.original_name,
    sr.processing_status
FROM ScreeningResume sr
JOIN Resume r
ON sr.resume_id = r.resume_id
WHERE sr.screening_id = ?
ORDER BY r.original_name
`,
[screeningId]
);

return {

    screening: screeningRows[0],

    resumes: resumeRows

};

};