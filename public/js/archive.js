const archiveToggle = document.getElementById("archiveToggle");
const archiveList = document.getElementById("archiveList");

if (archiveToggle && archiveList) {

    archiveToggle.addEventListener("click", () => {

        const hidden = archiveList.style.display === "none";

        archiveList.style.display = hidden ? "block" : "none";

        archiveToggle.innerHTML = hidden
            ? archiveToggle.innerHTML.replace("▶", "▼")
            : archiveToggle.innerHTML.replace("▼", "▶");

    });

}