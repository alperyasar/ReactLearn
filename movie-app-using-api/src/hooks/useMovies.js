import { useEffect, useState } from "react";

const api_key = "eb37014b6cf4b58fcfaf8a9116a2b542"; // from https://api.themoviedb.org

const useMovies = (query) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  function nextPage() {
    setCurrentPage((currentPage) => currentPage + 1);
  }

  function prevPage() {
    setCurrentPage((currentPage) => currentPage - 1);
  }

  useEffect(
    function () {
      //first Render (mount)
      const controller = new AbortController();
      const signal = controller.signal;

      async function getMovies(Page) {
        try {
          setLoading(true);
          setError("");
          const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}&page=${Page}`,
            { signal: signal }
          );

          if (!res.ok) {
            throw new Error("Hata oluştu.");
          }
          const data = await res.json();
          if (data.total_results === 0) {
            throw new Error("Film bulunamadı.");
          }
          setMovies(data.results);
          setTotalPages(data.total_pages);
          setTotalResults(data.total_results);
        } catch (err) {
          if (err.name === "AbortError") {
            return;
          } else {
            setError(err.message);
          }
        }
        setLoading(false);
      }

      if (query.length < 4) {
        setMovies([]);
        setError("");
        return;
      }
      getMovies(currentPage);
      return () => {
        controller.abort();
      };

      // fetch(
      //   `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}`
      // )
      //   .then((res) => res.json())
      //   .then((data) => setMovies(data.results));
    },
    [query, currentPage]
  );

  return {
    movies,
    loading,
    error,
    nextPage,
    prevPage,
    currentPage,
    totalPages,
    totalResults,
  };
};

export default useMovies;
