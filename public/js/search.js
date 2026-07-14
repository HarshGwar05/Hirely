const searchBox = document.getElementById("searchResume");

if (searchBox) {

    searchBox.addEventListener("input", () => {

        const keyword =
            searchBox.value.toLowerCase().trim();

        const resumes =
        document.querySelectorAll(
        ".resume-item"
        );

        resumes.forEach(resume => {

            const name =
                resume.querySelector(".resume-name")
                .textContent
                .toLowerCase();

            resume.style.display =
                name.includes(keyword)
                ? "flex"
                : "none";

        });

    });

}