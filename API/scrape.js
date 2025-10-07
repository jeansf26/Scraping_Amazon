// scrape.js
import axios from "axios"; // import the axios library for making HTTP requests
import { JSDOM, VirtualConsole } from "jsdom"; // import JSDOM for parsing HTML and VirtualConsole to handle console messages

// main function to scrape Amazon based on a keyword
async function scrapeAmazon(keyword) {
  const url = "https://www.amazon.com/s?k=" + encodeURIComponent(keyword); // URL with the search keyword

  const response = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9,pt-BR;q=0.8",
      "Accept":
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Referer": "https://www.google.com/",
    },
  }); // do the GET request with headers to mimic a browser

  const html = response.data;
  return getdata(html); // return the extracted data
}

// auxiliary function to parse HTML and extract product data
function getdata(html) {

  const virtualConsole = new VirtualConsole();
  virtualConsole.on("error", () => {}); // ignore errors
  virtualConsole.on("warn", () => {}); // ignore warnings

  const dom = new JSDOM(html, { virtualConsole });
  const document = dom.window.document;
  const items = document.querySelectorAll(
    '[data-component-type="s-search-result"]'
  );

  const resultados = []; // array to hold the results

  // loop through each item and extract relevant information
  items.forEach((item) => {
    const title = item.querySelector("h2 span"); // get the title
    const rating = item.querySelector(".a-icon-star-mini span"); // get the rating
    const numberOfRatings = item.querySelector(
      ".a-link-normal .s-underline-text"
    ); // get the number of ratings
    const image = item.querySelector("img.s-image"); // get the image URL

    // only add to results if all data is present
    if (title && image) {
      resultados.push({
        title: title.textContent.trim(),
        rating: rating ? rating.textContent.trim() : "No rating",
        numberOfRatings: numberOfRatings
          ? numberOfRatings.textContent.trim()
          : "No ratings count",
        imageUrl: image.src,
      });
    }
  });

  return resultados;
}

// Export the scrapeAmazon function for use in other files
export { scrapeAmazon };