// index.js
// Author: Jaakko Flink
// Date: 2025-11-06

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const tableBody = document.getElementById("registrationTable");
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

 
  function clearErrors() {
    [errFullname, errEmail, errPhone, errBirthdate, errTerms].forEach((el) => {
      el.textContent = "";
      el.classList.add("hidden");
    });
  }

 
  function validate() {
    let valid = true;
    clearErrors();

    const parts = fullname.value.trim().split(" ");
    if (parts.length < 2 || parts.some((p) => p.length < 2)) {
      errFullname.textContent = "Please enter your full name (first and last).";
      errFullname.classList.remove("hidden");
      valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      errEmail.textContent = "Invalid email format.";
      errEmail.classList.remove("hidden");
      valid = false;
    }

    const phonePattern = /^\+358\d{7,11}$/;
    if (!phonePattern.test(phone.value.trim())) {
      errPhone.textContent = "Phone must be in +358XXXXXXXXX format.";
      errPhone.classList.remove("hidden");
      valid = false;
    }

    const today = new Date();
    const birth = new Date(birthdate.value);

    if (!birthdate.value) {
      errBirthdate.textContent = "Please enter your birthdate.";
      errBirthdate.classList.remove("hidden");
      valid = false;
    } else {
      const age = today.getFullYear() - birth.getFullYear();
      const hasHadBirthday =
        today.getMonth() > birth.getMonth() ||
        (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());
      const realAge = hasHadBirthday ? age : age - 1;

      if (birth > today) {
        errBirthdate.textContent = "Birthdate cannot be in the future.";
        errBirthdate.classList.remove("hidden");
        valid = false;
      } else if (realAge < 13) {
        errBirthdate.textContent = "You must be at least 13 years old.";
        errBirthdate.classList.remove("hidden");
        valid = false;
      }
    }

    if (!terms.checked) {
      errTerms.textContent = "You must accept the terms.";
      errTerms.classList.remove("hidden");
      valid = false;
    }

    return valid;
  }

  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate()) return;

    timestampInput.value = new Date().toLocaleString("fi-FI");

    const row = document.createElement("tr");
    row.className =
      "odd:bg-slate-50 even:bg-white hover:bg-blue-50 transition border-b border-slate-200";

    row.innerHTML = `
      <td class="py-2 px-3 border border-slate-300">${timestampInput.value}</td>
      <td class="py-2 px-3 border border-slate-300">${fullname.value}</td>
      <td class="py-2 px-3 border border-slate-300">${email.value}</td>
      <td class="py-2 px-3 border border-slate-300">${phone.value}</td>
      <td class="py-2 px-3 border border-slate-300">${birthdate.value}</td>
      <td class="py-2 px-3 border border-slate-300">${terms.checked ? "✅" : "❌"}</td>
    `;

    tableBody.appendChild(row);
    form.reset();

    
    alert("Rekisteröinti onnistui");
  });
});
