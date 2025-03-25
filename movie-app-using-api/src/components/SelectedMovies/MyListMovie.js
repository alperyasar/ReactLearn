export default function MyListMovie({ movie, onHandleDeletedMovie }) {
  return (
    <div className="card-mb-2">
      <div className="row mb-2">
        <div className="col-4">
          <img
            src={
              movie.poster_path
                ? `https://images.tmdb.org/t/p/w600_and_h900_bestv2/` +
                  movie.poster_path
                : "/img/No_Image_Available.jpg"
            }
            alt={movie.title}
            className="img-fluid rounded-start"
          />
        </div>
        <div className="col-8">
          <div className="card-body">
            <h6 className="card-title">{movie.title}</h6>
            <div className="d-flex justify-content-between">
              <p>
                <i className="bi bi-star-fill text-warning"></i>
                <span>{movie.vote_average}</span>
              </p>
              <p>
                <i className="bi bi-hourglass"></i>
                <span>{movie.runtime} dk</span>
              </p>
            </div>
            <button
              className="btn btn-danger"
              onClick={() => onHandleDeletedMovie(movie.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
