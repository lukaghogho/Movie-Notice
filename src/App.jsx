import React, { useEffect, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import AuthErrors from "./components/store/auth-errors";
import { valueErrors } from "./components/store/auth-errors";
import NotFound from "./pages/errors/NotFound";
import "./App.css";
import Spinner from "./components/UI/spinner/Spinner";

const Trending = React.lazy(() => import("./pages/trending/Trending"));
const MoviesSearched = React.lazy(() =>
  import("./pages/movies-searched/MoviesSearched")
);
const MovieItem = React.lazy(() => import("./pages/movie-item/MovieItem"));
const SignUp = React.lazy(() => import("./pages/sign-up/SignUp"));
const Rules = React.lazy(() => import("./pages/rules/Rules"));
const UserProfile = React.lazy(() =>
  import("./pages/user-profile/UserProfile")
);

function App() {
  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);
  return (
    <AuthErrors.Provider value={valueErrors}>
      <Suspense fallback={<Spinner />}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/rules-and-terms-of-use" element={<Rules />} />
            <Route path="/:type/:movieID" element={<MovieItem />} />
            <Route
              path="/movies-searched/:movieWord"
              element={<MoviesSearched />}
            />
            <Route path="/trending" element={<Trending></Trending>} />
            <Route path="/user/profile/:userID" element={<UserProfile />} />
            <Route path="/*" element={<NotFound></NotFound>} />
          </Routes>
        </main>
        <Footer />
      </Suspense>
    </AuthErrors.Provider>
  );
}

export default App;
