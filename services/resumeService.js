import connection from "../config/db.js";

export const getAllResumes = async () => {

    const [rows] = await connection.query(`
        SELECT
            resume_id,
            original_name,
            status,
            uploaded_at
        FROM Resume
        WHERE is_archived = FALSE
        ORDER BY uploaded_at DESC;
    `);

    return rows;

};

import { v4 as uuid } from "uuid";

export const saveResume = async (file) => {

    const resumeId = uuid();
    const storagePath = file.path.replace(/\\/g, "/");

    await connection.query(
        `
        INSERT INTO Resume
        (
             resume_id,
        original_name,
        storage_path,
        mime_type,
        status
        )
        VALUES (?, ?, ?, ?, ?)
        `,
        [
             resumeId,
        file.originalname,
        storagePath,
        file.mimetype,
        "UPLOADED"
        ]
    );

    return resumeId;

};