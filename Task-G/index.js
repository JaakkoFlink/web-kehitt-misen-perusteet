// Author: Jaakko Flink
// Date: 2025-11-06

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("registrationForm");
  const tableBody = document.querySelector("#registrationTable tbody");
  const timestampInput = document.getElementById("timestamp");

  const fullname = document.getElementById("fullname");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const birthdate = document.getElementById("birthdate");
  const terms = document.getElementById("terms");

  const errFullname = document.getElementById("err-fullname");
  const errEmail = document.getElementById("err-email");
  const errPhone = document.getElementById("err-phone");
  const errBirthdate = document.getElementById("err-birthdate");
  const errTerms = document.getElementById("err-terms");

  // --- NEW: INFO BOX ELEMENTS ---
  const infoName = document.querySelector(".student-info .student-name");
  const infoEmail = document.querySelectorAll(".student-info .student-group")[0];
  const infoPhone = document.querySelectorAll(".student-info .student-name")[1];
  const infoBirth = document.querySelectorAll(".student-info .student-group")[1];

  function clearErrors() {
    errFullname.textContent = "";
    errEmail.textContent = "";
    errPhone.textContent = "";
    errBirthdate.textContent = "";
    errTerms.textContent = "";
  }

  function validate() {
    let valid = true;
    clearErrors();

    const parts = fullname.value.trim().split(" ");
    if (parts.length < 2 || parts.some(p => p.length < 2)) {
      errFullname.textContent = "Please enter your full name (first and last).";
      valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      errEmail.textContent = "Invalid email format.";
      valid = false;
    }

    const phonePattern = /^\+358\d{7,11}$/;
    if (!phonePattern.test(phone.value.trim())) {
      errPhone.textContent = "Phone must be in +358XXXXXXXXX format.";
      valid = false;
    }

    const today = new Date();
    const birth = new Date(birthdate.value);

    if (!birthdate.value) {
      errBirthdate.textContent = "Please enter your birthdate.";
      valid = false;
    } else {
      const age = today.getFullYear() - birth.getFullYear();
      const hasHadBirthday =
        today.getMonth() > birth.getMonth() ||
        (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());

      const realAge = hasHadBirthday ? age : age - 1;

      if (birth > today) {
        errBirthdate.textContent = "Birthdate cannot be in the future.";
        valid = false;
      } else if (realAge < 13) {
        errBirthdate.textContent = "You must be at least 13 years old.";
        valid = false;
      }
    }

    if (!terms.checked) {
      errTerms.textContent = "You must accept the terms.";
      valid = false;
    }

    return valid;
  }

  // --- NEW: UPDATE INFO BOX ---
  function updateInfoBox() {
    infoName.textContent = fullname.value;
    infoEmail.textContent = email.value;
    infoPhone.textContent = phone.value;
    infoBirth.textContent = birthdate.value;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate()) return;

    timestampInput.value = new Date().toLocaleString("fi-FI");

    // Update info box
    updateInfoBox();

    // Add row to table
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${timestampInput.value}</td>
      <td>${fullname.value}</td>
      <td>${email.value}</td>
      <td>${phone.value}</td>
      <td>${birthdate.value}</td>
      <td>${terms.checked ? "✅" : "❌"}</td>
    `;

    tableBody.appendChild(row);
    form.reset();
  });
});
