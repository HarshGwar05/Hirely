import connection from "../config/db.js";

export const getScreeningHistory = async () => {

    const [rows] = await connection.query(`
        SELECT
            screening_id,
            job_title,
            status,
            total_resumes,
            completed_resumes,
            failed_resumes,
            created_at
        FROM Screening
        ORDER BY created_at DESC
    `);

    return rows;

};