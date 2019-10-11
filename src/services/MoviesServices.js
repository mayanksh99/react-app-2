import axios from "axios";
import { apiUrl } from "./config.json";

export function getMovies() {
  return axios.get(apiUrl + "/movies");
}

export function getMovie(movieId) {
  return axios.get(apiUrl + "/movies/" + movieId);
}

export function deleteMovies(movieId) {
  return axios.delete(apiUrl + "/movies/" + movieId);
}

export function saveMovie(obj) {
  if (obj._id) {
    const body = { ...obj };
    delete body._id;
    return axios.put(apiUrl + "/movies/" + obj._id, body);
  }
  return axios.post(apiUrl + "/movies", obj);
}
