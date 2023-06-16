import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: { language: "en-US" },
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNmEzZjVlMjMyODk5NDFhZTEwOGEwM2Q0MjkxMDcwYiIsInN1YiI6IjY0ODE2YzY3ZTM3NWMwMDBjNTI1ZjZiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kj0XKkgWBc-M36Ggtjn4O_cls4TDFmHFj11xn4fppQ0",
  },
});

export default instance;
