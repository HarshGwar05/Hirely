const startAnalysisBtn = document.getElementById("analyseBtn");

startAnalysisBtn.addEventListener("click", async () => {

    const jobTitle = document.getElementById("jobTitle").value.trim();

    const jobDescription = document.getElementById("jobDescription").value.trim();

    const selectedResumeIds = [];

    document
        .querySelectorAll(".resume-checkbox:checked")
        .forEach(box => {
            selectedResumeIds.push(box.value);
        });

    if (!jobTitle || !jobDescription) {
        alert("Please enter Job Title and Job Description.");
        return;
    }

    if (selectedResumeIds.length === 0) {
        alert("Please select at least one resume.");
        return;
    }

    const response = await fetch("/screenings", {

    method: "POST",

    headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify({
        jobTitle,
        jobDescription,
        selectedResumeIds
    })

});

if (!response.ok) {

    const error = await response.text();

    alert(error);

    return;

}

const result = await response.json();

// Allow one reload for this new screening
sessionStorage.removeItem("progressReloaded");

window.location.href = `/screenings/${result.screeningId}`;

});