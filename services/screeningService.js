import connection from "../config/db.js";
import { v4 as uuid } from "uuid";

export const createScreening = async (
    jobTitle,
    jobDescription,
    resumeIds
) => {

    const screeningId = uuid();

    const db = await connection.getConnection();

    try {

        await db.beginTransaction();

        await db.query(
            `
            INSERT INTO Screening
            (
                screening_id,
                job_title,
                job_description,
                total_resumes
            )
            VALUES (?, ?, ?, ?)
            `,
            [
                screeningId,
                jobTitle,
                jobDescription,
                resumeIds.length
            ]
        );

        for (const resumeId of resumeIds) {

            await db.query(
                `
                INSERT INTO ScreeningResume
                (
                    screening_resume_id,
                    screening_id,
                    resume_id
                )
                VALUES (?, ?, ?)
                `,
                [
                    uuid(),
                    screeningId,
                    resumeId
                ]
            );

        }

        await db.commit();

        return screeningId;

    } catch (err) {

        await db.rollback();

        throw err;

    } finally {

        db.release();

    }

};

export const updateScreeningStatus = async (
    screeningId,
    status
) => {

    await connection.query(
        `
        UPDATE Screening
        SET status = ?
        WHERE screening_id = ?
        `,
        [
            status,
            screeningId
        ]
    );

};

export const updateScreeningResumeStatus = async (
    screeningResumeId,
    status
) => {

    await connection.query(
        `
        UPDATE ScreeningResume
        SET processing_status = ?
        WHERE screening_resume_id = ?
        `,
        [
            status,
            screeningResumeId
        ]
    );

};

export const incrementCompletedResumes = async (
    screeningId
) => {

    await connection.query(
        `
        UPDATE Screening
        SET completed_resumes = completed_resumes + 1
        WHERE screening_id = ?
        `,
        [screeningId]
    );

};

export const incrementFailedResumes = async (
    screeningId
) => {

    await connection.query(
        `
        UPDATE Screening
        SET failed_resumes = failed_resumes + 1
        WHERE screening_id = ?
        `,
        [screeningId]
    );

};


export const getScreening = async (screeningId) => {

    const [rows] = await connection.query(
        `
        SELECT
            screening_id,
            job_title,
            job_description
        FROM Screening
        WHERE screening_id = ?
        LIMIT 1
        `,
        [screeningId]
    );

    return rows[0] || null;

};

export const getScreeningResume = async (
    screeningResumeId
) => {

    const [rows] = await connection.query(
        `
        SELECT
            screening_resume_id,
            screening_id,
            resume_id
        FROM ScreeningResume
        WHERE screening_resume_id = ?
        LIMIT 1
        `,
        [screeningResumeId]
    );

    return rows[0] || null;

};

export const saveScreeningResult = async (
    screeningResumeId,
    result
) => {

    await connection.query(
        `
        INSERT INTO ScreeningResult
        (
            result_id,
            screening_resume_id,
            score,
            decision,
            confidence,
            requirement_coverage,
            analysis_json
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        [
            uuid(),
            screeningResumeId,
            result.score,
            result.decision,
            result.confidence,
            result.requirement_coverage,
            JSON.stringify({
                summary: result.summary,
                strengths: result.strengths,
                weaknesses: result.weaknesses,
                missing_skills: result.missing_skills,
                interview_questions: result.interview_questions,
                improvement_suggestions: result.improvement_suggestions,
                evidence: result.evidence
            })
        ]
    );

};

export const getScreeningStatusData = async (
    screeningId
) => {

    const [rows] = await connection.query(
        `
        SELECT
            status,
            total_resumes,
            completed_resumes,
            failed_resumes
        FROM Screening
        WHERE screening_id = ?
        `,
        [screeningId]
    );

    return rows[0];

};