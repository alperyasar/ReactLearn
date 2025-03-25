# Getting Started with Create React App

# 🎬 Movie App with React & TMDB API

A React-based movie application that allows users to search for movies, view details, add/remove movies to a personalized list, and manage ratings. Built as part of an educational project focusing on React Hooks, API integration, and state management.

---

## ✨ Features

- **Real-time Movie Search** using TMDB API
- **Pagination** for browsing search results
- **Movie Details** with genres, ratings, and overview
- **Custom Hooks** for API calls (`useMovies`, `useMovieDetails`) and local storage (`useLocalStorage`)
- **Dynamic Lists** with add/remove functionality persisted in localStorage
- **Star Rating System** for user ratings
- **Responsive UI** with Bootstrap components
- Error handling and loading states

---

## 🖼 Screenshots

![Movie App Using API](https://github.com/alperyasar/ReactLearn/raw/main/movie-app-using-api/screenshots/ScreenExplaination.gif)!
\*Demonstration of core features:

1. Searching movies
2. Viewing movie details
3. Adding/removing movies from the list
4. Pagination controls
5. Rating movies with stars\*

---

## 🛠 Technologies Used

- React.js (Hooks: useState, useEffect, custom hooks)
- TMDB API (The Movie Database)
- JavaScript
- Bootstrap 5 + Icons
- LocalStorage for persistent data
- Async/Await for API handling

---

## 📦 Installation

1. Clone the repository:
   bash

   Copy

   ```
   git clone https://github.com/alperyasar/movie-app-using-api.git
   ```

2. Install dependencies:
   bash

   Copy

   ```
   npm install
   ```

3. Get TMDB API key from [https://www.themoviedb.org](https://www.themoviedb.org/)
4. Create `.env` file in root directory:
   env

   Copy

   ```
   REACT_APP_TMDB_API_KEY=your_api_key_here
   ```

5. Start the app:
   bash

   Copy

   ```
   npm start
   ```

---

## 🎓 Educational Focus

This project covers:

1. **API Integration**
   - Fetching paginated data
   - Handling API errors
   - AbortController for cleanup
2. **React Hooks**
   - useState/useEffect patterns
   - Custom hooks for reusable logic
   - LocalStorage synchronization
3. **Component Architecture**
   - Container/presentational components
   - Prop drilling management
   - Dynamic list rendering
4. **UI/UX Features**
   - Loading states
   - Responsive grid layouts
   - Interactive rating system

---

## 🧩 Component Structure

Copy

```
movie-app/
├── public/
├── screenshots/
│   └── ScreenExplanation.gif
├── src/
│   ├── components/
│   │   ├── Movies/          # Movie cards and details
│   │   │   ├── Movie.js
│   │   │   ├── MovieDetails.js
│   │   │   └── MovieList.js
│   │   ├── Navbar/          # Search and header
│   │   │   ├── Logo.js
│   │   │   ├── Navbar.js
│   │   │   ├── NavSearchResults.js
│   │   │   └── Search.js
│   │   ├── SelectedMovies/  # Personalized list management
│   │   │   ├── MyListMovie.js
│   │   │   └── MySelectedMovies.js
│   │   ├── ErrorMessage.js
│   │   ├── ListContainer.js
│   │   ├── Loading.js
│   │   ├── Main.js
│   │   ├── Pagination.js
│   │   └── Summary.js
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   ├── useMovieDetails.js
│   │   └── useMovies.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   ├── index.css
│   └── StarRating.js
```

---

## 📝 Key Code Snippets

**Custom Hook for Movies** (`useMovies.js`):

javascript

Copy

```
// Handles API calls with pagination and error states
const { movies, loading, error, currentPage, totalPages } = useMovies(query);
```

**LocalStorage Integration** (`useLocalStorage.js`):

javascript

Copy

```
// Persists selected movies between sessions
const [selectedMovies, setSelectedMovies] = useLocalStorage([], "selectedMovies");
```

**Movie Details Component**:

jsx

Copy

```
<MovieDetails
  selectedMovie={selectedMovie}
  onHandleAddMovie={handleAddMovie}
  onUnselectMovie={handleUnselectMovie}
/>
```

---

## 🚀 Future Improvements

- User authentication
- Social sharing features
- Advanced filtering/sorting
- Dark mode toggle

---

**License**: MIT
**Contributing**: Pull requests welcome!
**API Credits**: Data provided by [The Movie Database](https://www.themoviedb.org/)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
