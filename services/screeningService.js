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