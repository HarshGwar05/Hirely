const checkboxes = document.querySelectorAll(".resume-checkbox");

const selectedCount = document.getElementById("selectedCount");

const selectedResumeCount = document.getElementById("selectedResumeCount");

const startBtn = document.getElementById("startScreeningBtn");

const analyseBtn = document.getElementById("analyseBtn");

function updateSelection() {

    const totalSelected =
        document.querySelectorAll(".resume-checkbox:checked").length;

    selectedCount.textContent = totalSelected;

    selectedResumeCount.textContent = totalSelected;

    if (totalSelected === 0) {

        startBtn.disabled = true;
        startBtn.textContent = "Start Screening";

        analyseBtn.disabled = true;

    } else {

        startBtn.disabled = false;
        startBtn.textContent = `Start Screening (${totalSelected})`;

        analyseBtn.disabled = false;

    }

}

checkboxes.forEach(box => {

    box.addEventListener("change", updateSelection);

});

updateSelection();