export const redactPII = (text) => {

    return text

        // Email
        .replace(
            /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g,
            "[EMAIL]"
        )

        // Phone Numbers
        .replace(
            /\+?\d[\d\s()-]{8,}\d/g,
            "[PHONE]"
        )

        // LinkedIn
        .replace(
            /https?:\/\/(www\.)?linkedin\.com\/[^\s]+/gi,
            "[LINKEDIN]"
        )

        // GitHub
        .replace(
            /https?:\/\/(www\.)?github\.com\/[^\s]+/gi,
            "[GITHUB]"
        );

};