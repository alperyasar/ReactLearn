import Logo from "./Logo";
import NavSearchResults from "./NavSearchResults";
import Search from "./Search";

export default function Navbar({ children, query, setQuery }) {
  return (
    <nav className="bg-primary text-white p-2">
      <div className="container">
        <div className="row align-items-center">
          <Logo />
          <Search query={query} setQuery={setQuery} />
          {children}
        </div>
      </div>
    </nav>
  );
}
