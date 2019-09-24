import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genre: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    errors: {}
  };

  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    genre: Joi.string().required(),
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

  render() {
    const { match, history } = this.props;
    return (
      <div>
        <h1>Movie Form {match.params.id}</h1>
        <form onSubmit={this.handleSumbit}>
          {this.renderInput("title", "Title")}
          <div className="mb-3">
            <label htmlFor="FormControlSelect">Genre</label>
            <select
              className="form-control"
              value={this.state.data.genre}
              name={this.state.data.genre}
              errors={this.state.errors.genre}
              id="FormControlSelect"
            >
              <option defaultValue>Action</option>
              <option>Comedy</option>
              <option>Thriller</option>
            </select>
          </div>
          {this.renderInput("numberInStock", "Number In Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Log In")}
        </form>
        <button
          className="btn btn-secondary"
          disabled={this.validate()}
          onClick={() => history.push("/movies")}
        >
          Save
        </button>
      </div>
    );
  }
}

export default MovieForm;
