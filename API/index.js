import express from "express"; // import the Express framework
import { scrapeAmazon } from "./scrape.js"; // import the scrape function
import cors from "cors"; // importa o middleware CORS

const app = express(); // create an Express application
const port = 3220; // define the port number

app.use(cors()); // enable CORS for all routes

// main route: returns a simple message
app.get("/", (req, res) => {
  res.send("Amazon scrape server running. Acess /scrape");
});

// scrape route: performs the scraping based on the keyword query parameter
app.get("/scrape", async (req, res) => {
  try {
    const keyword = req.query.keyword; // get the keyword from query parameters and return 400 if not provided
    if (!keyword) {
      return res
        .status(400)
        .json({ error: "Keyword query parameter is required." });
    }
    const produtos = await scrapeAmazon(keyword); // call the scrape function with the keyword
    res.json(produtos); // return the scraped data as JSON
  } catch (error) {
    console.error("Error while scraping:", error.message); // log any errors
    res.status(500).json({ error: "internal server error" }); // return a 500 error response
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Running server in http://localhost:${port}`); // log the server URL
});
