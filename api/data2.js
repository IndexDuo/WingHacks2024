const { getDatabase } = require("./_mongo");

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const db = await getDatabase();
    const data = await db.collection("WesternFaces").find({}).toArray();
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    return res.status(200).json(data);
  } catch (error) {
    console.error("Unable to load Western celebrities:", error.message);
    return res.status(500).json({ error: "Unable to load celebrities" });
  }
};
