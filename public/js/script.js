// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false,
    );
  });
})();

// filter feature in index.ejs
let taxSwitch = document.querySelector("#switchCheckDefault");
taxSwitch.addEventListener("click", () => {
  let taxInfo = document.querySelectorAll("#tax-info");
  for (info of taxInfo) {
    info.classList.toggle("tax-info");
  }
});

const radios = document.querySelectorAll('input[type="radio"]');
// Add event listener to each
radios.forEach((radio) => {
  radio.addEventListener("change", function () {
    sessionStorage.setItem("selectedRadio", radio.value);
    this.form.submit(); // Automatically submits the parent form
  });
});

window.onload = () => {
  const savedValue = sessionStorage.getItem("selectedRadio");
  if (savedValue) {
    document.querySelector(`input[value="${savedValue}"]`).checked = true;
    sessionStorage.removeItem("selectedRadio");
  }
};
