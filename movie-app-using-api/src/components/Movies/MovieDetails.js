import { useState } from "react";
import StarRating from "../../StarRating";
import Loading from "../Loading";
import useMovieDetails from "../../hooks/useMovieDetails";

export default function MovieDetails({
  selectedMovie,
  onUnselectMovie,
  onHandleAddMovie,
}) {
  const [userRating, setUserRating] = useState("");

  const { movie, loading } = useMovieDetails(selectedMovie);

  // const selectedMovieUserRating = selectedMovie.find(
  //   (m) => m.id === selectedMovie
  // )?.userRating;

  function handleAddMovie(movie) {
    const newMovie = { ...movie, userRating };
    onHandleAddMovie(newMovie);
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="border p-2 mb-3">
          <div className="row">
            <div className="col-4">
              <img
                src={
                  movie.poster_path
                    ? `https://images.tmdb.org/t/p/w600_and_h900_bestv2/` +
                      movie.poster_path
                    : "/img/No_Image_Available.jpg"
                }
                alt={movie.title}
                className="img-fluid rounded"
              />
            </div>
            <div className="col-8">
              <div className="card-body ">
                <h6 className="card-title">{movie.title}</h6>
                <div>
                  <i className="bi bi-calendar2-date me-1"></i>
                  <span>{movie.release_date}</span>
                </div>
                <i className="bi-star-fill text-warning"></i>
                <span>{movie.vote_average}</span>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="col-12 border-top p-3 mt-3">
              <p>{movie.overview}</p>
              <p>
                {movie.genres?.map((genre) => (
                  <span key={genre.id} className="badge text-bg-primary me-1">
                    {genre.name}
                  </span>
                ))}
              </p>
              <div className="my-4">
                <StarRating
                  maxRating={10}
                  size={20}
                  onUserRating={setUserRating}
                />
              </div>
              <button
                className="btn btn-primary me-1"
                onClick={() => handleAddMovie(movie)}
              >
                Add Movie
              </button>
              <button className="btn btn-danger" onClick={onUnselectMovie}>
                Close
              </button>
            </div>
          </div>
          <p className="alert alert-primary">{selectedMovie}</p>
        </div>
      )}
    </>
  );
}
