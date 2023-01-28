import Movie from "../types/movie";
import { InferGetServerSidePropsType } from "next";
import axios from "axios";

export default function Moviesapi({
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
    const movies = await axios.get("http://localhost:3000/api/movies");
    return {
      props: {
        movies: movies.data,
      },
    };
  } catch (error) {
    console.error(error);
  }
}
