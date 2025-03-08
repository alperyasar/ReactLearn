import { useState } from "react";
import "./App.css";
import StarRating from "./StarRating";

const movie_list = [
  {
    id: 2,
    title: "The Cotton Club",
    year: "1984",
    runtime: 127,
    genres: ["Crime", "Drama", "Music"],
    director: "Francis Ford Coppola",
    actors: "Richard Gere, Gregory Hines, Diane Lane, Lonette McKee",
    plot: "The Cotton Club was a famous night club in Harlem. The story follows the people that visited the club, those that ran it, and is peppered with the Jazz music that made it so famous.",
    poster:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMTU5ODAyNzA4OV5BMl5BanBnXkFtZTcwNzYwNTIzNA@@._V1_SX300.jpg",
  },
  {
    id: 6,
    title: "Ratatouille",
    year: "2007",
    runtime: 111,
    genres: ["Animation", "Comedy", "Family"],
    director: "Brad Bird, Jan Pinkava",
    actors: "Patton Oswalt, Ian Holm, Lou Romano, Brian Dennehy",
    plot: "A rat who can cook makes an unusual alliance with a young kitchen worker at a famous restaurant.",
    poster:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMTMzODU0NTkxMF5BMl5BanBnXkFtZTcwMjQ4MzMzMw@@._V1_SX300.jpg",
  },
  {
    id: 7,
    title: "City of God",
    year: "2002",
    runtime: 130,
    genres: ["Crime", "Drama"],
    director: "Fernando Meirelles, Kátia Lund",
    actors:
      "Alexandre Rodrigues, Leandro Firmino, Phellipe Haagensen, Douglas Silva",
    plot: "Two boys growing up in a violent neighborhood of Rio de Janeiro take different paths: one becomes a photographer, the other a drug dealer.",
    poster:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMjA4ODQ3ODkzNV5BMl5BanBnXkFtZTYwOTc4NDI3._V1_SX300.jpg",
  },
  {
    id: 10,
    title: "Stardust",
    year: "2007",
    runtime: 127,
    genres: ["Adventure", "Family", "Fantasy"],
    director: "Matthew Vaughn",
    actors: "Ian McKellen, Bimbo Hart, Alastair MacIntosh, David Kelly",
    plot: "In a countryside town bordering on a magical land, a young man makes a promise to his beloved that he'll retrieve a fallen star by venturing into the magical realm.",
    poster:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMjkyMTE1OTYwNF5BMl5BanBnXkFtZTcwMDIxODYzMw@@._V1_SX300.jpg",
  },
  {
    id: 11,
    title: "Apocalypto",
    year: "2006",
    runtime: 139,
    genres: ["Action", "Adventure", "Drama"],
    director: "Mel Gibson",
    actors:
      "Rudy Youngblood, Dalia Hernández, Jonathan Brewer, Morris Birdyellowhead",
    plot: "As the Mayan kingdom faces its decline, the rulers insist the key to prosperity is to build more temples and offer human sacrifices. Jaguar Paw, a young man captured for sacrifice, flees to avoid his fate.",
    poster:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BNTM1NjYyNTY5OV5BMl5BanBnXkFtZTcwMjgwNTMzMQ@@._V1_SX300.jpg",
  },
  {
    id: 17,
    title: "The Third Man",
    year: "1949",
    runtime: 93,
    genres: ["Film-Noir", "Mystery", "Thriller"],
    director: "Carol Reed",
    actors: "Joseph Cotten, Alida Valli, Orson Welles, Trevor Howard",
    plot: "Pulp novelist Holly Martins travels to shadowy, postwar Vienna, only to find himself investigating the mysterious death of an old friend, Harry Lime.",
    poster:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMjMwNzMzMTQ0Ml5BMl5BanBnXkFtZTgwNjExMzUwNjE@._V1_SX300.jpg",
  },
  {
    id: 18,
    title: "The Beach",
    year: "2000",
    runtime: 119,
    genres: ["Adventure", "Drama", "Romance"],
    director: "Danny Boyle",
    actors:
      "Leonardo DiCaprio, Daniel York, Patcharawan Patarakijjanon, Virginie Ledoyen",
    plot: "Twenty-something Richard travels to Thailand and finds himself in possession of a strange map. Rumours state that it leads to a solitary beach paradise, a tropical bliss - excited and intrigued, he sets out to find it.",
    poster:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BN2ViYTFiZmUtOTIxZi00YzIxLWEyMzUtYjQwZGNjMjNhY2IwXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg",
  },
  {
    id: 19,
    title: "Scarface",
    year: "1983",
    runtime: 170,
    genres: ["Crime", "Drama"],
    director: "Brian De Palma",
    actors:
      "Al Pacino, Steven Bauer, Michelle Pfeiffer, Mary Elizabeth Mastrantonio",
    plot: "In Miami in 1980, a determined Cuban immigrant takes over a drug cartel and succumbs to greed.",
    poster:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMjAzOTM4MzEwNl5BMl5BanBnXkFtZTgwMzU1OTc1MDE@._V1_SX300.jpg",
  },
  {
    id: 20,
    title: "Sid and Nancy",
    year: "1986",
    runtime: 112,
    genres: ["Biography", "Drama", "Music"],
    director: "Alex Cox",
    actors: "Gary Oldman, Chloe Webb, David Hayman, Debby Bishop",
    plot: "Morbid biographical story of Sid Vicious, bassist with British punk group the Sex Pistols, and his girlfriend Nancy Spungen. When the Sex Pistols break up after their fateful US tour, ...",
    poster:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMjExNjA5NzY4M15BMl5BanBnXkFtZTcwNjQ2NzI5NA@@._V1_SX300.jpg",
  },
  {
    id: 21,
    title: "Black Swan",
    year: "2010",
    runtime: 108,
    genres: ["Drama", "Thriller"],
    director: "Darren Aronofsky",
    actors: "Natalie Portman, Mila Kunis, Vincent Cassel, Barbara Hershey",
    plot: 'A committed dancer wins the lead role in a production of Tchaikovsky\'s "Swan Lake" only to find herself struggling to maintain her sanity.',
    poster:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BNzY2NzI4OTE5MF5BMl5BanBnXkFtZTcwMjMyNDY4Mw@@._V1_SX300.jpg",
  },
  {
    id: 22,
    title: "Inception",
    year: "2010",
    runtime: 148,
    genres: ["Action", "Adventure", "Sci-Fi"],
    director: "Christopher Nolan",
    actors: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page, Tom Hardy",
    plot: "A thief, who steals corporate secrets through use of dream-sharing technology, is given the inverse task of planting an idea into the mind of a CEO.",
    poster:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    id: 23,
    title: "The Deer Hunter",
    year: "1978",
    runtime: 183,
    genres: ["Drama", "War"],
    director: "Michael Cimino",
    actors: "Robert De Niro, John Cazale, John Savage, Christopher Walken",
    plot: "An in-depth examination of the ways in which the U.S. Vietnam War impacts and disrupts the lives of people in a small industrial town in Pennsylvania.",
    poster: "https://m.media-amazon.com/images/I/515NJEV4JGL.jpg",
  },
  {
    id: 24,
    title: "Chasing Amy",
    year: "1997",
    runtime: 113,
    genres: ["Comedy", "Drama", "Romance"],
    director: "Kevin Smith",
    actors: "Ethan Suplee, Ben Affleck, Scott Mosier, Jason Lee",
    plot: "Holden and Banky are comic book artists. Everything's going good for them until they meet Alyssa, also a comic book artist. Holden falls for her, but his hopes are crushed when he finds out she's gay.",
    poster:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BZDM3MTg2MGUtZDM0MC00NzMwLWE5NjItOWFjNjA2M2I4YzgxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
  },
  {
    id: 25,
    title: "Django Unchained",
    year: "2012",
    runtime: 165,
    genres: ["Drama", "Western"],
    director: "Quentin Tarantino",
    actors: "Jamie Foxx, Christoph Waltz, Leonardo DiCaprio, Kerry Washington",
    plot: "With the help of a German bounty hunter, a freed slave sets out to rescue his wife from a brutal Mississippi plantation owner.",
    poster: "https://m.media-amazon.com/images/I/81IVfnsVtIL._SL1500_.jpg",
  },
  {
    id: 26,
    title: "The Silence of the Lambs",
    year: "1991",
    runtime: 118,
    genres: ["Crime", "Drama", "Thriller"],
    director: "Jonathan Demme",
    actors:
      "Jodie Foster, Lawrence A. Bonney, Kasi Lemmons, Lawrence T. Wrentz",
    plot: "A young F.B.I. cadet must confide in an incarcerated and manipulative killer to receive his help on catching another serial killer who skins his victims.",
    poster:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMTQ2NzkzMDI4OF5BMl5BanBnXkFtZTcwMDA0NzE1NA@@._V1_SX300.jpg",
  },
  {
    id: 27,
    title: "American Beauty",
    year: "1999",
    runtime: 122,
    genres: ["Drama", "Romance"],
    director: "Sam Mendes",
    actors: "Kevin Spacey, Annette Bening, Thora Birch, Wes Bentley",
    plot: "A sexually frustrated suburban father has a mid-life crisis after becoming infatuated with his daughter's best friend.",
    poster:
      "https://m.media-amazon.com/images/I/51ewQtOw42L._SX300_SY300_QL70_FMwebp_.jpg",
  },
  {
    id: 28,
    title: "Snatch",
    year: "2000",
    runtime: 102,
    genres: ["Comedy", "Crime"],
    director: "Guy Ritchie",
    actors: "Benicio Del Toro, Dennis Farina, Vinnie Jones, Brad Pitt",
    plot: "Unscrupulous boxing promoters, violent bookmakers, a Russian gangster, incompetent amateur robbers, and supposedly Jewish jewelers fight to track down a priceless stolen diamond.",
    poster:
      "https://m.media-amazon.com/images/I/515sau0m9CL._SX300_SY300_QL70_FMwebp_.jpg",
  },
  {
    id: 30,
    title: "Pulp Fiction",
    year: "1994",
    runtime: 154,
    genres: ["Crime", "Drama"],
    director: "Quentin Tarantino",
    actors: "Tim Roth, Amanda Plummer, Laura Lovelace, John Travolta",
    plot: "The lives of two mob hit men, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    poster:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMTkxMTA5OTAzMl5BMl5BanBnXkFtZTgwNjA5MDc3NjE@._V1_SX300.jpg",
  },
  {
    id: 31,
    title: "Lock, Stock and Two Smoking Barrels",
    year: "1998",
    runtime: 107,
    genres: ["Comedy", "Crime"],
    director: "Guy Ritchie",
    actors: "Jason Flemyng, Dexter Fletcher, Nick Moran, Jason Statham",
    plot: "A botched card game in London triggers four friends, thugs, weed-growers, hard gangsters, loan sharks and debt collectors to collide with each other in a series of unexpected events, all for the sake of weed, cash and two antique shotguns.",
    poster:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMTAyN2JmZmEtNjAyMy00NzYwLThmY2MtYWQ3OGNhNjExMmM4XkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg",
  },
  {
    id: 32,
    title: "Lucky Number Slevin",
    year: "2006",
    runtime: 110,
    genres: ["Crime", "Drama", "Mystery"],
    director: "Paul McGuigan",
    actors: "Josh Hartnett, Bruce Willis, Lucy Liu, Morgan Freeman",
    plot: "A case of mistaken identity lands Slevin into the middle of a war being plotted by two of the city's most rival crime bosses: The Rabbi and The Boss. Slevin is under constant surveillance by relentless Detective Brikowski as well as the infamous assassin Goodkat and finds himself having to hatch his own ingenious plot to get them before they get him.",
    poster: "https://m.media-amazon.com/images/I/51wofaGFCeL._SY445_.jpg",
  },
  {
    id: 33,
    title: "Rear Window",
    year: "1954",
    runtime: 112,
    genres: ["Mystery", "Thriller"],
    director: "Alfred Hitchcock",
    actors: "James Stewart, Grace Kelly, Wendell Corey, Thelma Ritter",
    plot: "A wheelchair-bound photographer spies on his neighbours from his apartment window and becomes convinced one of them has committed murder.",
    poster:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BNGUxYWM3M2MtMGM3Mi00ZmRiLWE0NGQtZjE5ODI2OTJhNTU0XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
  },
  {
    id: 34,
    title: "Pan's Labyrinth",
    year: "2006",
    runtime: 118,
    genres: ["Drama", "Fantasy", "War"],
    director: "Guillermo del Toro",
    actors: "Ivana Baquero, Sergi López, Maribel Verdú, Doug Jones",
    plot: "In the falangist Spain of 1944, the bookish young stepdaughter of a sadistic army officer escapes into an eerie but captivating fantasy world.",
    poster: "https://m.media-amazon.com/images/I/51+Wa8HdzGL._SY300_.jpg",
  },
  {
    id: 35,
    title: "Shutter Island",
    year: "2010",
    runtime: 138,
    genres: ["Mystery", "Thriller"],
    director: "Martin Scorsese",
    actors: "Leonardo DiCaprio, Mark Ruffalo, Ben Kingsley, Max von Sydow",
    plot: "In 1954, a U.S. marshal investigates the disappearance of a murderess who escaped from a hospital for the criminally insane.",
    poster:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMTMxMTIyNzMxMV5BMl5BanBnXkFtZTcwOTc4OTI3Mg@@._V1_SX300.jpg",
  },
];
const selected_movie_list = [
  {
    id: 13,
    title: "No Country for Old Men",
    year: "2007",
    runtime: 122,
    genres: ["Crime", "Drama", "Thriller"],
    director: "Ethan Coen, Joel Coen",
    actors: "Tommy Lee Jones, Javier Bardem, Josh Brolin, Woody Harrelson",
    plot: "Violence and mayhem ensue after a hunter stumbles upon a drug deal gone wrong and more than two million dollars in cash near the Rio Grande.",
    poster:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMjA5Njk3MjM4OV5BMl5BanBnXkFtZTcwMTc5MTE1MQ@@._V1_SX300.jpg",
  },
  {
    id: 4,
    title: "Crocodile Dundee",
    year: "1986",
    runtime: 97,
    genres: ["Adventure", "Comedy"],
    director: "Peter Faiman",
    actors: "Paul Hogan, Linda Kozlowski, John Meillon, David Gulpilil",
    plot: "An American reporter goes to the Australian outback to meet an eccentric crocodile poacher and invites him to New York City.",
    poster:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMTg0MTU1MTg4NF5BMl5BanBnXkFtZTgwMDgzNzYxMTE@._V1_SX300.jpg",
  },
];

const getAverage = (array) =>
  array.reduce((sum, value) => sum + value, 0) / array.length;

export default function App() {
  const [movies, setMovies] = useState(movie_list);
  const [selectedMovies, setselectedMovies] = useState(selected_movie_list);
  return (
    <>
      <StarRating maxRating={5} color="red" size={36} />
      <StarRating maxRating={10} />
      <StarRating />
      <Nav>
        <NavSearchResults movies={movies} />
      </Nav>
      <Main>
        <div className="row mt-2">
          <div className="col-md-8">
            <ListContainer>
              <MovieList movies={movies} />
            </ListContainer>
          </div>
          <div className="col-md-4">
            <ListContainer>
              <Summary selectedMovies={selectedMovies} />
              <MySelectedMovies selectedMovies={selectedMovies} />
            </ListContainer>
          </div>
        </div>
      </Main>
    </>
  );
}

function Nav({ children }) {
  return (
    <nav className="bg-primary text-white p-2">
      <div className="container">
        <div className="row align-items-center">
          <Logo />
          <Search />
          {children}
        </div>
      </div>
    </nav>
  );
}

function Logo() {
  return (
    <div className="col-4">
      <i className="bi bi-camera-reels me-2"></i>
      Movie App
    </div>
  );
}

function NavSearchResults({ movies }) {
  return (
    <div className="col-4 text-end">
      <strong>{movies.length}</strong> kayıt bulundu.
    </div>
  );
}

function Search() {
  return (
    <div className="col-4">
      <input
        type="text"
        className="form-control"
        placeholder="Movie Search"
      ></input>
    </div>
  );
}

function Main({ children }) {
  return <main className="container">{children}</main>;
}

function ListContainer({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="movie-list">
      <button
        className="btn btn-sm btn-outline-primary mb-2"
        onClick={() => setIsOpen((val) => !val)}
      >
        {isOpen ? (
          <i className="bi bi-chevron-up"></i>
        ) : (
          <i className="bi bi-chevron-down"></i>
        )}
      </button>
      {isOpen && children}
    </div>
  );
}

function MovieList({ movies }) {
  return (
    <div className="row row-cols-1 row-cols-md-3 row-cols-xl-5 g-4">
      {movies.map((movie) => (
        <Movie movie={movie} key={movie.id} />
      ))}
    </div>
  );
}

function Movie({ movie }) {
  return (
    <div className="col mb-2">
      <div className="card">
        <img src={movie.poster} alt={movie.title} className="card top" />
        <div className="card-body">
          <h6 className="card-title">{movie.title}</h6>
          <div>
            <i className="bi bi-calendar2-date me-1"></i>
            <span>{movie.year}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Summary({ selectedMovies }) {
  const avgRuntime = getAverage(selected_movie_list.map((m) => m.runtime));
  return (
    <div className="card mb-2">
      <div className="card-body">
        <h5>Listem [{selectedMovies.length}] Film eklendi.</h5>
        <div className="d-flex justify-content-between">
          <p>
            <i className="bi bi-hourglass me-1"></i>
            <span>{avgRuntime.toFixed(2)} dk</span>
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

function MySelectedMovies({ selectedMovies }) {
  return selectedMovies.map((movie) => (
    <MyListMovie movie={movie} key={movie.id} />
  ));
}

function MyListMovie({ movie }) {
  return (
    <div className="card-mb-2">
      <div className="row mb-2">
        <div className="col-4">
          <img
            src={movie.poster}
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
                <span>{movie.director}</span>
              </p>
              <p>
                <i className="bi bi-hourglass">{movie.runtime} dk</i>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
