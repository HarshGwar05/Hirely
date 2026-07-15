import fs from "fs/promises";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

export const extractResumeText = async (filePath) => {

    const pdfBuffer = await fs.readFile(filePath);

    const loadingTask = getDocument({
        data: new Uint8Array(pdfBuffer)
    });

    const pdf = await loadingTask.promise;

    let fullText = "";

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {

        const page = await pdf.getPage(pageNumber);

        const textContent = await page.getTextContent();

        const pageText = textContent.items
            .map(item => item.str)
            .join(" ");

        fullText += pageText + "\n";

    }

    const trimmedText = fullText.trim();

    if (!trimmedText) {

        throw new Error(
            "Unreadable PDF: no extractable text found (likely a scanned or image-only resume)."
        );

    }

    return trimmedText;

};