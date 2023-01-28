import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  try {
    const limit = parseInt(req.query.q || 10);
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const movies = await db
      .collection("movies")
      .find({})
      .sort({ metacritic: -1 })
      .limit(limit)
      .toArray();
    res.json(movies);
  } catch (error) {
    console.error(error);
  }
};
