import {
    getScreeningHistory
} from "../services/historyService.js";

export const showHistory = async (req, res) => {

    try {

        const screenings =
            await getScreeningHistory();

        res.render("history", {

            screenings

        });

    }

    catch(err){

        console.error(err);

        res.status(500).send(
            "Internal Server Error"
        );

    }

};