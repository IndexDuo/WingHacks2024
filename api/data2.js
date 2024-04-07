const { MongoClient } = require('mongodb');

// Replace YOUR_URI, YOUR_DB_NAME with actual values
const uri = 'mongodb+srv://linzo75:WwGAMb1OTflA8Ej7@winghacks.wi3akjz.mongodb.net';
const dbName = 'CelebrityPhotos';

async function connectToDatabase() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  const db = client.db(dbName);
  return { db, client };
}

export default async (req, res) => {
    const { db, client } = await connectToDatabase();
    
    try {
      // changing collection to KpopIdols
      const data = await db.collection('WesternFaces').find({}).toArray();
      res.status(200).json(data);
    } catch (error) {
      console.error('Error accessing the database:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      await client.close();
    }
  };
  