document.addEventListener("DOMContentLoaded", function () {
  const concertForm = document.getElementById("concertForm");
  const addConcertBtn = document.getElementById("addConcertBtn");
  const finalizeBtn = document.getElementById("finalizeBtn");
  let concertCount = 1;

  addConcertBtn.addEventListener("click", function () {
    if (concertCount < 5) {
      concertCount++;
      const concertsDiv = document.getElementById("concerts");
      const newConcertDiv = document.createElement("div");
      newConcertDiv.classList.add("concert");

      newConcertDiv.innerHTML = `
        <label>Date du concert:</label>
        <select name="date" class="date-select" required>
          <option value="">Sélectionnez une date</option>
          <option value="2024-08-23">23 août 2024</option>
          <option value="2024-09-07">7 septembre 2024</option>
          <option value="2025-02-08">8 février 2025</option>
          <option value="2025-04-09">9 avril 2025</option>
          <option value="2025-05-24">24 mai 2025</option>
        </select>
        <label>Nombre de places (entre 1 et 5):</label>
        <input type="number" name="places" min="1" max="5" required>
        <button type="button" class="removeConcertBtn" onclick="removeConcert(this)">Supprimer ce concert</button>
      `;

      concertsDiv.appendChild(newConcertDiv);
      updateDateOptions();
    }

    updateButtonVisibility();
  });

  concertForm.addEventListener("click", function (event) {
    if (event.target.classList.contains("removeConcertBtn")) {
      const concertDiv = event.target.parentElement;
      concertDiv.remove();
      concertCount--;

      if (concertCount === 0) {
        addConcertBtn.click();
      }
      updateButtonVisibility();
    }
  });

  finalizeBtn.addEventListener("click", function () {
    const concertForms = document.querySelectorAll(".concert");
    const selectedConcerts = [];

    // Vérifier au moins un formulaire de concert rempli
    let isAtLeastOneFormFilled = false;

    concertForms.forEach((form) => {
      const dateSelect = form.querySelector('select[name="date"]');
      const date = dateSelect.options[dateSelect.selectedIndex].value;
      const places = form.querySelector('input[name="places"]').value;

      // Vérifier valeurs non vides
      if (date && places) {
        isAtLeastOneFormFilled = true;
      }

      selectedConcerts.push({ date, places });
    });

    if (isAtLeastOneFormFilled) {
      // Vérifier formulaire ajouté qui est vide
      const isAnyFormEmpty = Array.from(concertForms).some((form) => {
        const dateSelect = form.querySelector('select[name="date"]');
        const date = dateSelect.options[dateSelect.selectedIndex].value;
        const places = form.querySelector('input[name="places"]').value;
        return !date || !places;
      });

      if (isAnyFormEmpty) {
        alert("Veuillez remplir tous les formulaires de concert avant de finaliser.");
      } else {
        console.log("Concerts sélectionnés:", selectedConcerts);
      }
    } else {
      alert("Veuillez remplir au moins un formulaire de concert avant de finaliser.");
    }
  });

  function updateButtonVisibility() {
    const removeButtons = document.querySelectorAll(".removeConcertBtn");
    const addButtonVisible = concertCount < 5;
    const removeButtonVisible = concertCount > 1; 

    addConcertBtn.style.display = addButtonVisible ? "block" : "none";

    removeButtons.forEach((button) => {
      button.style.display = removeButtonVisible ? "block" : "none";
    });
  }

  function updateDateOptions() {
    const dateSelects = document.querySelectorAll('.date-select');
    const selectedDates = Array.from(dateSelects).map(select => select.value);

    dateSelects.forEach((select) => {
      const options = select.querySelectorAll('option');
      options.forEach((option) => {
        if (selectedDates.includes(option.value) && option.value !== select.value) {
          option.disabled = true;
        } else {
          option.disabled = false;
        }
      });
    });
  }
});

function removeConcert(btn) {
  const concertDiv = btn.parentElement;
  concertDiv.remove();
}
