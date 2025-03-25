export default function Summary({ selectedMovies }) {
  const avgRating = getAverage(selectedMovies.map((m) => m.vote_average));
  const avgUserRating = getAverage(selectedMovies.map((m) => m.userRating));
  const avgRuntime = getAverage(selectedMovies.map((m) => m.runtime));
  return (
    <div className="card mb-2">
      <div className="card-body">
        <h5>Listem [{selectedMovies.length}] Film eklendi.</h5>
        <div className="d-flex justify-content-between">
          <p>
            <i className="bi bi-star-fill text-warning me-1"></i>
            <span>{avgRating.toFixed(2)}</span>
          </p>
          <p>
            <i className="bi bi-stars text-warning me-1"></i>
            <span>{avgUserRating.toFixed(2)}</span>
          </p>
          <p>
            <i className="bi bi-hourglass me-1"></i>
            <span>{avgRuntime.toFixed(2)} dk</span>
          </p>
        </div>
      </div>
    </div>
  );
}

const getAverage = (array) =>
  array.reduce((sum, value) => sum + value / array.length, 0);
