import React, { Component } from "react";
import MoviesTable from "./moviesTable";
import ListGroup from "./common/listGroup";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4
  };

  componentDidMount = () => {
    const genres = [{ name: "All Genre" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  };

  deleteMovies = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies: movies });
  };

  genreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  pageChange = page => {
    this.setState({ currentPage: page });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  render() {
    let count = this.state.movies.length;
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allmovies
    } = this.state;

    if (count === 0)
      return <p className="m-4">There is no movies in the database</p>;
    const filtered =
      selectedGenre && selectedGenre._id
        ? allmovies.filter(m => m.genre._id === selectedGenre._id)
        : allmovies;

    const movies = paginate(filtered, currentPage, pageSize);

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3 mt-4">
            <ListGroup
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onGenreSelect={this.genreSelect}
            />
          </div>
          <div className="col">
            <p className="m-4">
              Showing {filtered.length} movies in the database
            </p>
            <MoviesTable
              movies={movies}
              onLike={this.handleLike}
              onDelete={this.deleteMovies}
            />
            <div className="container">
              <Pagination
                itemsCount={filtered.length}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.pageChange}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
