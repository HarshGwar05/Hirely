import { getDashboardStats } from "../services/dashboardService.js";

export const dashboard = async (req, res) => {

    try {

        const stats = await getDashboardStats();

        res.render("index", {
            totalResumes: stats.totalResumes,
            totalScreenings: stats.totalScreenings
        });

    } catch (err) {

        console.error(err);

        res.status(500).send("Internal Server Error");

    }

};