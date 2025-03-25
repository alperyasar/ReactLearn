import MyListMovie from "./MyListMovie";

export default function MySelectedMovies({
  selectedMovies,
  onHandleDeletedMovie,
}) {
  return selectedMovies.map((movie) => (
    <MyListMovie
      movie={movie}
      key={movie.id}
      onHandleDeletedMovie={onHandleDeletedMovie}
    />
  ));
}
