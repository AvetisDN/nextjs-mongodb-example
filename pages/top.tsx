import { InferGetStaticPropsType } from "next";
import clientPromise from "../lib/mongodb";
import Movie from "../types/movie";

export default function Top({
  movies,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <h1>Top 20 according to Metacritic</h1>
      {movies.map((movie: Movie, index: number) => (
        <div key={index}>
          <h2>
            {movie.title} - {movie.metacritic}
          </h2>
          <p>{movie.plot}</p>
        </div>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  try {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const movies = await db
      .collection("movies")
      .find({})
      .sort({ metacritic: -1 })
      .limit(1000)
      .toArray();
    return {
      props: {
        movies: JSON.parse(JSON.stringify(movies)),
      },
    };
  } catch (error) {
    console.error(error);
  }
}
