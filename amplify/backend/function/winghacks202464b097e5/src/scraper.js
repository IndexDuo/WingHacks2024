const axios = require("axios");
const cheerio = require("cheerio");
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://jing:jingpassword@winghacks.wi3akjz.mongodb.net/";
const dbName = "CelebrityPhotos";
const collectionName = "WesternFaces";

const urls = [
  "https://www.famousbirthdays.com/people/aubrey-drake-graham.html",
  "https://www.famousbirthdays.com/people/ariana-grande.html",
  "https://www.famousbirthdays.com/people/taylor-swift.html",
  "https://www.famousbirthdays.com/people/katy-perry.html",
  "https://www.famousbirthdays.com/people/justin-bieber.html",
  "https://www.famousbirthdays.com/people/rihanna.html",
  "https://www.famousbirthdays.com/people/beyonce-knowles.html",
  "https://www.famousbirthdays.com/people/selena-gomez.html",
  "https://www.famousbirthdays.com/people/kim-kardashian.html",
  "https://www.famousbirthdays.com/people/kylie-jenner.html",
  "https://www.famousbirthdays.com/people/kendall-jenner.html",
  "https://www.famousbirthdays.com/people/kourtney-kardashian.html",
  "https://www.famousbirthdays.com/people/khloe-kardashian.html",
  "https://www.famousbirthdays.com/people/kris-jenner.html",
  "https://www.famousbirthdays.com/people/doja-cat.html",
  "https://www.famousbirthdays.com/people/megan-thee-stallion.html",
  "https://www.famousbirthdays.com/people/ice-spice.html",
  "https://www.famousbirthdays.com/people/emma-watson.html",
  "https://www.famousbirthdays.com/people/emma-stone.html",
  "https://www.famousbirthdays.com/people/zendaya-coleman.html",
  "https://www.famousbirthdays.com/people/scarlett-johansson.html",
  "https://www.famousbirthdays.com/people/jennifer-lawrence.html",
  "https://www.famousbirthdays.com/people/angelina-jolie.html",
  "https://www.famousbirthdays.com/people/mila-kunis.html",
  "https://www.famousbirthdays.com/people/anne-hathaway.html",
  "https://www.famousbirthdays.com/people/zayn-malik.html",
  "https://www.famousbirthdays.com/people/harry-styles.html",
  "https://www.famousbirthdays.com/people/liam-payne.html",
  "https://www.famousbirthdays.com/people/louis-tomlinson.html",
  "https://www.famousbirthdays.com/people/niall-horan.html",
  "https://www.famousbirthdays.com/people/justin-timberlake.html",
  "https://www.famousbirthdays.com/people/brad-pitt.html",
  "https://www.famousbirthdays.com/people/leonardo-dicaprio.html",
]
// Function to scrape data from a given URL
async function scrapeData(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Adjust the selector based on the actual structure of the target webpage
    const image = $("div.profile-pictures-carousel__slide.slide-0 img").attr(
      "src"
    );
    const name = $("h1").text().trim();

    if (!image || !name) {
      throw new Error(
        "Could not extract the image or name from the provided URL."
      );
    }

    // Connect to MongoDB
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Insert the scraped data into the MongoDB collection
    const result = await collection.insertOne({ name, image });

    await client.close();

    return {
      message: "Data saved successfully",
      _id: result.insertedId,
      name,
      image,
    };
  } catch (error) {
    console.error("Scraping or database insertion error:", error);
    throw error; // Rethrow to handle it in the calling function
  }
}

async function scrapeUrls() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  for (const url of urls) {
      try {
          const { name, image } = await scrapeData(url);
          
          // Check if the entry already exists
          const exists = await collection.findOne({ name });
          if (!exists) {
              await collection.insertOne({ name, image });
              console.log(`Data saved for ${name}`);
          } else {
              console.log(`Skipping ${name}, already exists.`);
          }
      } catch (error) {
          console.error(`Error processing ${url}:`, error);
      }
  }

  await client.close();
}

scrapeUrls();