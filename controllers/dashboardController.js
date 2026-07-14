import { getDashboardStats } from "../services/dashboardService.js";
import { getAllResumes } from "../services/resumeService.js";

export const dashboard = async (req, res) => {

    try {

        const stats = await getDashboardStats();

        const resumes = await getAllResumes();

        res.render("index", {stats,resumes});

    } catch (err) {

        console.error(err);

        res.status(500).send("Internal Server Error");

    }

};