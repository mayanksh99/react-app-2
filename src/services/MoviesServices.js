import axios from "axios";

export function getMovies() {
  return axios.get("http://localhost:3900/api/movies");
}
