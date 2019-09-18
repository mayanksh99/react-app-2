import React, { Component } from "react";

class LoginForm extends Component {
  username = React.createRef();
  handleSumbit = e => {
    e.preventDefault();

    const username = this.username.current.value;
    console.log("Submitted");
  };
  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSumbit}>
          <div className="form-group">
            <label htmlFor="Username">User Name</label>
            <input
              autoFocus
              ref={this.username}
              type="text"
              className="form-control"
              id="Username"
              aria-describedby="emailHelp"
              placeholder="User Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="Password1">Password</label>
            <input
              type="password"
              className="form-control"
              id="Password1"
              placeholder="Password"
            />
          </div>
          <div>
            <button className="btn btn-primary">Log In</button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
