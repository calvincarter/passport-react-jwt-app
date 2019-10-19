import React, { Component } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
import "../App.css"; 
import AuthManager from "../utils/AuthManager";
import Nav from "../components/Nav";

class Home extends Component {

  state = {
    isAuthenticated: AuthManager.isAuthenticated()
  };

  handleLogOut = () => {
    AuthManager.logOut();
    this.setState({isAuthenticated: false});
  }

  render() {
    return (
      <div>
        <Nav />
        {
          this.state.isAuthenticated ? (
            <button className="button button-blue" onClick={this.handleLogOut}>
            LOGOUT
            </button>
          ) : (
            <a className="button button-blue" href="http://localhost:3001/login">
            LOGIN
            </a>
          )
        
        }
      </div>
    );
  }
}

export default Home;