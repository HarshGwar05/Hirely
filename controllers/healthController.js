import connection from "../config/db.js";

export const healthCheck = async (req, res) => {

    try {

        await connection.query("SELECT 1");

        res.json({
            status: "OK",
            database: "Connected"
        });

    } catch (err) {

        res.status(500).json({
            status: "ERROR",
            database: "Disconnected"
        });

    }

};