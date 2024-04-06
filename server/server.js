// this code is used to connect to the MongoDB database and get the data from that collection

const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = 3000;

const uri = "mongodb+srv://linzo75:WwGAMb1OTflA8Ej7@winghacks.wi3akjz.mongodb.net/?retryWrites=true&w=majority&appName=WiNGHacks";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// route to get data from the database
app.get('/game', async (req, res) => {
    try {
        // connect to mongodb
        await client.connect();

        // access database and collection
        const database = client.db("CelebrityPhotos");
        const collection = database.collection("KPopFaces");

        // get data from collection
        const data = await collection.find().toArray();
        
        // send data as json
        res.json(data);
    } catch (e) {
        console.error('Error fetching data:', e);
        res.status(500).send('Internal Server Error');
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log('Server is running on port', port);
});

