
const btnSearch = document.getElementById("btnSearch");
const btnClear = document.getElementById("btnClear");
const resultDiv = document.getElementById("result");

function searchCondition() {
  const input = document.getElementById("conditionInput").value.trim().toLowerCase();
  resultDiv.innerHTML = "";

  if (!input) {
    resultDiv.innerHTML = "<p>Please enter a valid search query (e.g., beach, temple, Australia, Japan).</p>";
    return;
  }

  fetch("travel_recommendation.json")
    .then((response) => response.json())
    .then((data) => {
      let matches = [];

      if (input === "beach" || input === "beaches") {
        matches = data.beaches;
      } else if (input === "temple" || input === "temples") {
        matches = data.temples;
      } else if (input === "country" || input === "countries") {
        data.countries.forEach((country) => {
          matches.push(...country.cities);
        });
      } else {
        const matchedCountry = data.countries.find(
          (c) => c.name.toLowerCase() === input
        );
        if (matchedCountry) {
          matches = matchedCountry.cities;
        }
      }

      if (matches.length > 0) {
        matches.forEach((place) => {
          const card = document.createElement("div");
          card.className = "card";
          card.innerHTML = `
            <img src="${place.imageUrl}" alt="${place.name}" />
            <div class="card-body">
              <h3>${place.name}</h3>
              <p>${place.description}</p>
              <button>Visit</button>
            </div>
          `;
          resultDiv.appendChild(card);
        });
      } else {
        resultDiv.innerHTML = "<p>No destinations found. Try searching 'beach', 'temple', 'Australia', or 'Japan'.</p>";
      }
    })
    .catch((error) => {
      console.error("Error fetching recommendations:", error);
      resultDiv.innerHTML = "<p>An error occurred while fetching data.</p>";
    });
}

function clearSearch() {
  document.getElementById("conditionInput").value = "";
  resultDiv.innerHTML = "";
}

btnSearch.addEventListener("click", searchCondition);
btnClear.addEventListener("click", clearSearch);
