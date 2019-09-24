import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import MainPage from './components/MainPage';

function App() {
  return (
    <div className="container">
      <Router>
        <Switch>

          <Route exact path="/">
            <Navbar />
            <MainPage />
          </Route>

          <Route exact path="/login">
            <Navbar />
            <Login />
          </Route>

          <Route exact path="/register">
            <Navbar />
            <Register />
          </Route>
          
          <Route exact path="leaderboard/" />

        </Switch>
      </Router>
    </div>
  )
}

export default App;
