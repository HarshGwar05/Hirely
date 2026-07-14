import connection from "../config/db.js";

export const getDashboardStats = async () => {

    const [rows] = await connection.query(`
         SELECT

            (SELECT COUNT(*)
             FROM Resume
             WHERE is_archived = FALSE) AS totalResumes,

            (SELECT COUNT(*)
             FROM Screening) AS totalScreenings,

            (SELECT COUNT(*)
             FROM ScreeningResume) AS totalCandidates,

            (SELECT ROUND(AVG(score),2)
             FROM ScreeningResult) AS averageScore,

            (SELECT MAX(score)
             FROM ScreeningResult) AS highestScore,

            (SELECT MIN(score)
             FROM ScreeningResult) AS lowestScore,

            (SELECT COUNT(*)
             FROM ScreeningResult
             WHERE decision='STRONG_MATCH') AS strongMatches,

            (SELECT COUNT(*)
             FROM ScreeningResult
             WHERE decision='GOOD_MATCH') AS goodMatches,

            (SELECT COUNT(*)
             FROM ScreeningResult
             WHERE decision='REVIEW') AS reviewCandidates,

            (SELECT COUNT(*)
             FROM ScreeningResult
             WHERE decision='REJECT') AS rejectedCandidates;
    `);

    return rows[0];

};