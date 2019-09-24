import React, { Component } from "react";
import { Link } from "react-router-dom";
import MoviesTable from "./moviesTable";
import ListGroup from "./common/listGroup";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    sortColumn: { path: "tile", order: "asc" },
    pageSize: 4
  };

  componentDidMount = () => {
    const genres = [{ _id: "", name: "All Genre" }, ...getGenres()];
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

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  pagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      movies: allmovies
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allmovies.filter(m => m.genre._id === selectedGenre._id)
        : allmovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    let count = this.state.movies.length;
    const { pageSize, currentPage, sortColumn } = this.state;

    if (count === 0)
      return <p className="m-4">There is no movies in the database</p>;

    const { totalCount, data: movies } = this.pagedData();

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
          <div className="col mt-4">
            <Link className="btn btn-primary" to="/movie/new">
              New Movie
            </Link>
            <p className="mt-2">Showing {totalCount} movies in the database</p>
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.deleteMovies}
              onSort={this.handleSort}
            />
            <div className="container">
              <Pagination
                itemsCount={totalCount}
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
