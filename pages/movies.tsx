import clientPromise from "../lib/mongodb";
import Movie from "./../types/movie";
import { InferGetServerSidePropsType } from "next";

export default function Movies({
  movies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const movies = await db
      .collection("movies")
      .find({})
      .sort({ metacritic: -1 })
      .limit(20)
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
