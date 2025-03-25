import { useState } from "react";
import "./App.css";
import useMovies from "./hooks/useMovies";
import useLocalStorage from "./hooks/useLocalStorage";
import Pagination from "./components/Pagination";
import ErrorMessage from "./components/ErrorMessage";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar/Navbar";
import NavSearchResults from "./components/Navbar/NavSearchResults";
import Main from "./components/Main";
import ListContainer from "./components/ListContainer";
import MovieList from "./components/Movies/MovieList";
import MovieDetails from "./components/Movies/MovieDetails";
import MySelectedMovies from "./components/SelectedMovies/MySelectedMovies";
import Summary from "./components/Summary";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedMovies, setselectedMovies] = useLocalStorage(
    [],
    "selectedMovies"
  );
  const [selectedMovie, setselectedMovie] = useState(null);

  const {
    movies,
    loading,
    error,
    nextPage,
    prevPage,
    currentPage,
    totalPages,
    totalResults,
  } = useMovies(query);

  function handleSelectedMovie(id) {
    setselectedMovie((selectedMovie) => (id === selectedMovie ? null : id));
  }

  function handleUnselectedMovie() {
    setselectedMovie(null);
  }

  function handleAddMovie(movie) {
    handleUnselectedMovie();
    setselectedMovies((selectedMovies) => {
      if (selectedMovies.some((m) => m.id === movie.id)) {
        return selectedMovies;
      }
      return [...selectedMovies, movie];
    });
  }

  function handleRemoveMovie(id) {
    setselectedMovies((selectedMovies) =>
      selectedMovies.filter((movie) => movie.id !== id)
    );
  }

  return (
    <>
      <Navbar query={query} setQuery={setQuery}>
        <NavSearchResults movies={movies} totalResults={totalResults} />
      </Navbar>
      <Main>
        <div className="row mt-2">
          <div className="col-md-8">
            <ListContainer>
              {/* {loading ? <Loading /> : <MovieList movies={movies} />} */}
              {loading && <Loading />}
              {!loading && !error && (
                <>
                  {movies.length > 0 && (
                    <>
                      <MovieList
                        movies={movies}
                        onSelectMovie={handleSelectedMovie}
                        selectedMovie={selectedMovie}
                      />

                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onNextPage={nextPage}
                        onPrevPage={prevPage}
                      />
                    </>
                  )}
                </>
              )}
              {error && <ErrorMessage message={error} />}
            </ListContainer>
          </div>
          <div className="col-md-4">
            <ListContainer>
              {selectedMovie ? (
                <MovieDetails
                  selectedMovie={selectedMovie}
                  onUnselectMovie={handleUnselectedMovie}
                  onHandleAddMovie={handleAddMovie}
                />
              ) : (
                <>
                  <Summary selectedMovies={selectedMovies} />
                  <MySelectedMovies
                    selectedMovies={selectedMovies}
                    onHandleDeletedMovie={handleRemoveMovie}
                  />
                </>
              )}
            </ListContainer>
          </div>
        </div>
      </Main>
    </>
  );
}
