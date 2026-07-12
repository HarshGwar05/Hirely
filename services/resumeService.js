import connection from "../config/db.js";

export const getAllResumes = async () => {

    const [rows] = await connection.query(`
       SELECT
    resume_id,
    original_name,
    status,
    is_archived,
    uploaded_at
FROM Resume
ORDER BY is_archived ASC, uploaded_at DESC;
    `);

    return rows;

};

import { v4 as uuid } from "uuid";

export const saveResume = async (file, fileHash) => {

    const resumeId = uuid();
    const storagePath = file.path.replace(/\\/g, "/");

    await connection.query(
        `
        INSERT INTO Resume
        (
            resume_id,
            original_name,
            storage_path,
            file_hash,
            mime_type,
            status
        )
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        [
            resumeId,
            file.originalname,
            storagePath,
            fileHash,
            file.mimetype,
            "UPLOADED"
        ]
    );

    return resumeId;

};

export const getResumeByHash = async (fileHash) => {

    const [rows] = await connection.query(
        `
        SELECT resume_id
        FROM Resume
        WHERE file_hash = ?
        LIMIT 1
        `,
        [fileHash]
    );

    return rows[0] || null;

};

export const saveParsedResume = async (
    resumeId,
    rawText
) => {

    await connection.query(
        `
        INSERT INTO ParsedResume
        (
            parsed_id,
            resume_id,
            raw_text,
            parsed_data
        )
        VALUES (?, ?, ?, ?)
        `,
        [
            uuid(),
            resumeId,
            rawText,
            JSON.stringify({})
        ]
    );

};

export const markResumeParsed = async (resumeId) => {

    await connection.query(
        `
        UPDATE Resume
        SET status = 'PARSED'
        WHERE resume_id = ?
        `,
        [resumeId]
    );

};

export const isResumeUsed = async (resumeId) => {

    const [rows] = await connection.query(
        `
        SELECT COUNT(*) AS count
        FROM ScreeningResume
        WHERE resume_id = ?
        `,
        [resumeId]
    );

    return rows[0].count > 0;

};

export const archiveResume = async (resumeId) => {

    await connection.query(
        `
        UPDATE Resume
        SET is_archived = TRUE
        WHERE resume_id = ?
        `,
        [resumeId]
    );

};

export const getResumeById = async (resumeId) => {

    const [rows] = await connection.query(
        `
        SELECT storage_path
        FROM Resume
        WHERE resume_id = ?
        LIMIT 1
        `,
        [resumeId]
    );

    return rows[0] || null;

};

export const deleteResumeById = async (resumeId) => {

    await connection.query(
        `
        DELETE FROM ParsedResume
        WHERE resume_id = ?
        `,
        [resumeId]
    );

    await connection.query(
        `
        DELETE FROM Resume
        WHERE resume_id = ?
        `,
        [resumeId]
    );

};

export const updateParsedData = async (
    resumeId,
    parsedData
) => {

    await connection.query(
        `
        UPDATE ParsedResume
        SET parsed_data = ?
        WHERE resume_id = ?
        `,
        [
            JSON.stringify(parsedData),
            resumeId
        ]
    );

};

export const getParsedResume = async (resumeId) => {

    const [rows] = await connection.query(
        `
        SELECT
            raw_text,
            parsed_data
        FROM ParsedResume
        WHERE resume_id = ?
        LIMIT 1
        `,
        [resumeId]
    );

    return rows[0] || null;

};

export const getScreeningResumes = async (screeningId) => {

    const [rows] = await connection.query(
        `
        SELECT
            sr.screening_resume_id,
            sr.resume_id
        FROM ScreeningResume sr
        WHERE sr.screening_id = ?
        `,
        [screeningId]
    );

    return rows;

};

export const restoreResume = async (resumeId) => {

    await connection.query(
        `
        UPDATE Resume
        SET
            is_archived = FALSE,
            status = 'PARSED'
        WHERE resume_id = ?
        `,
        [resumeId]
    );

};