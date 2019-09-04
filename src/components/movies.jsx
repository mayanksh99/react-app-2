import React, { Component } from "react";
import Like from "./common/like";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: getMovies()
  };

  deleteMovies = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies: movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  render() {
    if (this.state.movies.length === 0)
      return <p>There is no movies in the database</p>;
    return (
      <React.Fragment>
        <p className="m-4">
          Showing {this.state.movies.length} movies in the database
        </p>
        <table className="table m-4">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map(movie => (
              <tr key={movie._id}>
                <td className="p-4">{movie.title}</td>
                <td className="p-4">{movie.genre.name}</td>
                <td className="p-4">{movie.numberInStock}</td>
                <td className="p-4">{movie.dailyRentalRate}</td>
                <td className="p-4">
                  <Like
                    liked={movie.liked}
                    onClick={() => this.handleLike(movie)}
                  />
                </td>
                <td
                  onClick={() => this.deleteMovies(movie)}
                  className="btn btn-danger btn-sm m-3"
                >
                  Delete
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Movies;
