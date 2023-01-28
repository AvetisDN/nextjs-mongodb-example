import Movie from "../../types/movie";
import useSwr from "swr";
import { useRouter } from "next/router";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Movies() {
  const { query } = useRouter();
  const { data, error, isLoading } = useSwr<Movie[]>(
    `/api/metacritic?q=${query.q || 10}`,
    fetcher
  );

  if (error) return <div>Failed to load movies</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

  return (
    <div>
      <h1>Top {query.q} according to Metacritic</h1>
      {data.map((movie: Movie, index: number) => (
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
