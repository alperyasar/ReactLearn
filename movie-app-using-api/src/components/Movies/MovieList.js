import Movie from "./Movie";

export default function MovieList({ movies, onSelectMovie, selectedMovie }) {
  return (
    <div className="row row-cols-1 row-cols-md-3 row-cols-xl-5 g-4">
      {movies.map((movie) => (
        <Movie
          movie={movie}
          key={movie.id}
          onSelectMovie={onSelectMovie}
          selectedMovie={selectedMovie}
        />
      ))}
    </div>
  );
}
