import axios from "axios";

export function getGenres() {
  return axios.get("http://localhost:3900/api/genres");
}
