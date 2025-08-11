// scrape.js
import axios from "axios"; // import the axios library for making HTTP requests
import { JSDOM } from "jsdom"; // import JSDOM for parsing HTML

// main function to scrape Amazon based on a keyword
async function scrapeAmazon(keyword) {
  const url = "https://www.amazon.com/s?k=" + encodeURIComponent(keyword); // URL with the search keyword

  const response = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9,pt-BR,pt;q=0.8",
    },
  }); // do the GET request with headers to mimic a browser

  const html = response.data;
  return getdata(html); // return the extracted data
}

// auxiliary function to parse HTML and extract product data
function getdata(html) {
  const dom = new JSDOM(html);
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
      ".a-link-normal .a-size-base.s-underline-text"
    ); // get the number of ratings
    const image = item.querySelector("img.s-image"); // get the image URL

    // only add to results if all data is present
    if (title && rating && numberOfRatings && image) {
      resultados.push({
        title: title.textContent.trim(),
        rating: rating.textContent.trim(),
        numberOfRatings: numberOfRatings.textContent.trim(),
        imageUrl: image.src,
      });
    }
  });

  return resultados;
}

// Export the scrapeAmazon function for use in other files
export { scrapeAmazon };
