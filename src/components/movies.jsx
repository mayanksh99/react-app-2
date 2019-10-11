import React, { Component } from "react";
import { Link } from "react-router-dom";

import MoviesTable from "./moviesTable";
import ListGroup from "./common/listGroup";
import { getMovies } from "../services/MoviesServices";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/GenreServices";
import _ from "lodash";
import Search from "./common/searchBox";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "tile", order: "asc" },
    pageSize: 4
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genre" }, ...data];
    // await getMovies()
    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  deleteMovies = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies: movies });
  };

  genreSelect = genre => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleChange = query => {
    console.log(query);
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
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
      searchQuery,
      selectedGenre,
      movies: allmovies
    } = this.state;

    let filtered = allmovies;
    if (searchQuery)
      filtered = allmovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allmovies.filter(m => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    let count = this.state.movies.length;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

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
            <Link className="btn btn-primary" to="/movies/new">
              New Movie
            </Link>
            <p className="mt-2">Showing {totalCount} movies in the database</p>
            <Search value={searchQuery} onChange={this.handleChange} />
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
