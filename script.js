document.addEventListener("DOMContentLoaded", function() {
  const concertForm = document.getElementById("concertForm");
  const addConcertBtn = document.getElementById("addConcertBtn");
  const finalizeBtn = document.getElementById("finalizeBtn");
  let concertCount = 1;

  addConcertBtn.addEventListener("click", function() {
    if (concertCount < 5) {
      concertCount++;
      const concertsDiv = document.getElementById("concerts");
      const newConcertDiv = document.createElement("div");
      newConcertDiv.classList.add("concert");

      newConcertDiv.innerHTML = `
        <label>Date du concert:</label>
        <select name="date" id="date" required>
        <option value="">Sélectionnez une date</option>
          <option value="2024-08-23">23 août 2024</option>
          <option value="2025-05-24">24 mai 2025</option>
          <option value="2024-09-07">7 septembre 2024</option>
          <option value="2025-02-08">8 février 2025</option>
          <option value="2025-04-09">9 avril 2025</option>
        </select>
        <label>Nombre de places (entre 1 et 5):</label>
        <input type="number" name="places" min="1" max="5" required>
        <button type="button" class="removeConcertBtn" onclick="removeConcert(this)">Supprimer ce concert</button>
      `;

      concertsDiv.appendChild(newConcertDiv);
    }
  });

  concertForm.addEventListener("click", function(event) {
    if (event.target.classList.contains("removeConcertBtn")) {
      const concertDiv = event.target.parentElement;
      concertDiv.remove();
      concertCount--;
    }
  });

  finalizeBtn.addEventListener("click", function() {
    const concertForms = document.querySelectorAll(".concert");
    const selectedConcerts = [];

    concertForms.forEach(form => {
    const dateSelect = form.querySelector('select[name="date"]');
    const date = dateSelect.options[dateSelect.selectedIndex].value;
      const places = form.querySelector('input[name="places"]').value;

      selectedConcerts.push({ date, places });
    });

    console.log("Concerts sélectionnés:", selectedConcerts);
  });
});

function removeConcert(btn) {
  const concertDiv = btn.parentElement;
  concertDiv.remove();
}
