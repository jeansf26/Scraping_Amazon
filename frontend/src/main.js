const button = document.querySelector("#load"); // get the button element
const results = document.getElementById("results"); //get the results container
const searchInput = document.querySelector("#search"); // get the search input element

// Add an event listener to the button
// When the button is clicked, it will call the getdata function
// Note: we use .addEventListener instead of .onclick to avoid calling the function immediately

button.addEventListener("click", getdata);

// Function to fetch data from the API and display it
async function getdata() {
  try {
    const url = `http://localhost:3220/scrape?keyword=${encodeURIComponent(
      searchInput.value
    )}`; // construct the URL with the keyword from the input

    const response = await fetch(url);
    const data = await response.json();

    // Check if the data is an array and has items
    // If not, log an error and return
    if (!Array.isArray(data) || data.length === 0) {
      console.error("Nenhum dado encontrado ou formato inválido.");
      return;
    }

    results.innerHTML = ""; // clear previous results

    // Loop through the data and create HTML elements for each item
    // We use a forEach loop to iterate over the array of items
    data.forEach((item) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <div class="image">
        <img src="${item.imageUrl}"/>
        </div>
        <h3>${item.title}</h3>
        <p>⭐ ${item.rating} (${item.numberOfRatings})</p>
      `;
      results.appendChild(card);
    });
  } catch (err) {
    console.error("Erro ao buscar dados:", err);
  }
}
