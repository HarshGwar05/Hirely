const input = document.getElementById("resumeInput");

input.addEventListener("change", () => {

    if (input.files.length > 0) {

        input.form.submit();

    }

});