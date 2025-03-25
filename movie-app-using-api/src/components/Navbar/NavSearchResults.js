export default function NavSearchResults({ movies, totalResults }) {
  return (
    <div className="col-4 text-end">
      <strong>{totalResults}</strong> kayıt bulundu.
      <strong> {movies.length}</strong> listelendi.
    </div>
  );
}
