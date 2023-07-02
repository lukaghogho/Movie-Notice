import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import MovieItem from "./pages/movie-item/MovieItem";
import MoviesSearched from "./pages/movies-searched/MoviesSearched";
import Footer from "./components/footer/Footer";
import UserProfile from "./pages/user-profile/UserProfile";
import AuthErrors from "./components/store/auth-errors";
import { valueErrors } from "./components/store/auth-errors";
import NotFound from "./pages/errors/NotFound";
import Trending from "./pages/trending/Trending";
import "./App.css";
import SignUp from "./pages/sign-up/SignUp";

function App() {
  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);
  return (
    <AuthErrors.Provider value={valueErrors}>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/:type/:movieID" element={<MovieItem />}></Route>
          <Route
            path="/movies-searched/:movieWord"
            element={<MoviesSearched />}
          ></Route>
          <Route path="/trending" element={<Trending></Trending>}></Route>
          <Route path="/user/profile/:userID" element={<UserProfile />}></Route>
          <Route path="/*" element={<NotFound></NotFound>}></Route>
        </Routes>
      </main>
      <Footer />
    </AuthErrors.Provider>
  );
}

export default App;
