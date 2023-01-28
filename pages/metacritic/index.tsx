import Movie from "../../types/movie";
import useSwr from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Movies() {
  const { data, error, isLoading } = useSwr<Movie[]>(`/api/movies`, fetcher);

  if (error) return <div>Failed to load movies</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

  return (
    <div>
      <h1>Top 10 according to Metacritic</h1>
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
