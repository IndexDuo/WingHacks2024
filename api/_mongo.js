const { MongoClient } = require("mongodb");

const databaseName = process.env.MONGODB_DB_NAME || "CelebrityPhotos";
let clientPromise;

const getDatabase = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not configured.");

  if (!clientPromise) {
    clientPromise = new MongoClient(uri).connect();
  }

  const client = await clientPromise;
  return client.db(databaseName);
};

module.exports = { getDatabase };
