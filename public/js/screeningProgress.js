const completedFill = document.getElementById("completedFill");
const failedFill = document.getElementById("failedFill");
const completedCount =document.getElementById("completedCount");

const failedCount =
document.getElementById("failedCount");

const progressText = document.getElementById("progressText");
const screeningStatus = document.getElementById("screeningStatus");

async function updateProgress() {

    const response = await fetch(
        `/screenings/${screeningId}/status`
    );

    const data = await response.json();

    const processed =
        data.completed_resumes +
        data.failed_resumes;

    const processedPercent =
        data.total_resumes === 0
            ? 0
            : Math.round(
                (processed / data.total_resumes) * 100
            );

    const completedPercent =
        data.total_resumes === 0
            ? 0
            : (data.completed_resumes / data.total_resumes) * 100;

    const failedPercent =
        data.total_resumes === 0
            ? 0
            : (data.failed_resumes / data.total_resumes) * 100;

    completedFill.style.width =
        completedPercent + "%";

    failedFill.style.width =
        failedPercent + "%";

    progressText.innerHTML = `
        <strong>${processedPercent}% (${processed}/${data.total_resumes})</strong>
        &nbsp; • &nbsp;
        <span style="color:#3cb44b">
            Completed : ${data.completed_resumes}
        </span>
        &nbsp; • &nbsp;
        <span style="color:#ef4444">
            Failed : ${data.failed_resumes}
        </span>
    `;

    screeningStatus.textContent =
        data.status;

    if (data.status === "COMPLETED") {
         clearInterval(interval);
        if (!sessionStorage.getItem("progressReloaded")) {
        sessionStorage.setItem("progressReloaded", "true");
        window.location.reload();
        }
    }
    completedCount.textContent = data.completed_resumes;
    failedCount.textContent = data.failed_resumes;
}

updateProgress();

const interval = setInterval(
    updateProgress,
    2000
);