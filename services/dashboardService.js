import connection from "../config/db.js";

export const getDashboardStats = async () => {

    const [rows] = await connection.query(`
        SELECT
            (SELECT COUNT(*) FROM Resume WHERE is_archived = FALSE) AS totalResumes,
            (SELECT COUNT(*) FROM Screening) AS totalScreenings;
    `);

    return rows[0];

};