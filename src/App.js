import React from "react";
import Loader from "react-loader-spinner";
import { Provider } from "react-redux";
import store from "./redux/store";

import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./styles.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Users from "./components/Users";
import Tasks from "./components/Tasks";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">
              Task Management
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/tasks">
                    Tasks
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          <Route exact path="/" component={Users} />
          <Route path="/tasks" component={Tasks} />
        </Router>
        <div id="overlay">
          <Loader
            style={{ position: "absolute", top: "40%", left: "45%" }}
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            visible={true}
          />
        </div>
      </div>
    </Provider>
  );
}

export default App;
