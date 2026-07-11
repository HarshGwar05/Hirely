import multer from "multer";
import path from "path";
import { v4 as uuid } from "uuid";

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "storage/uploads/");
    },

    filename: (req, file, cb) => {

        const extension = path.extname(file.originalname);

        cb(null, uuid() + extension);

    }

});

const fileFilter = (req, file, cb) => {

    if (file.mimetype === "application/pdf") {

        cb(null, true);

    } else {

        cb(new Error("Only PDF files are allowed."), false);

    }

};

const upload = multer({

    storage,
    fileFilter

});

export default upload;