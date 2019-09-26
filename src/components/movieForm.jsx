import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { saveMovie } from "../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    errors: {}
  };

  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number In Stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label("Daily Rental Rate")
  };

  doSubmit = () => {
    console.log("Submitted");
  };

  newMovie = () => {
    const movie = {
      title: this.state.data.title,
      genre: { name: "Action" },
      numberInStock: this.state.data.numberInStock,
      dailyRentalRate: this.state.data.dailyRentalRate
    };
    saveMovie(movie);
  };

  render() {
    const { match, history } = this.props;
    return (
      <div>
        <h1>Movie Form {match.params.id}</h1>
        <form onSubmit={this.handleSumbit}>
          {this.renderInput("title", "Title")}
          {/* <div className="mb-3">
            <label htmlFor="FormControlSelect">Genre</label>
            <select
              className="form-control"
              value={this.state.data.genre}
              name={this.state.data.genre}
              errors={this.state.errors.genre}
              id="FormControlSelect"
            >
              <option>Action</option>
              <option>Comedy</option>
              <option>Thriller</option>
            </select>
          </div> */}
          {this.renderInput("numberInStock", "Number In Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
        </form>
        <button
          className="btn btn-primary"
          disabled={this.validate()}
          onClick={() => {
            this.newMovie();
            history.push("/movies");
          }}
        >
          Save
        </button>
      </div>
    );
  }
}

export default MovieForm;
