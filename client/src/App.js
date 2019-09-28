import React, { Fragment } from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import Dashboard from "./components/Dashboard";
import Leaderboards from "./components/Leaderboards";
// Hooks
import AuthState from "./Context/auth/AuthState";
import TimeState from "./Context/time/TimeState";

// jwt Middleware
import setAuthToken from "./Utils/setAuthToken";

// used for pages where user must be logged in
import PrivateRoute from "./components/PrivateRoute";

// For GraphQL
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
const client = new ApolloClient({});

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <TimeState>
        <div className='container bg-light px-5'>
          <ApolloProvider client={client}>
            <Router>
              <Fragment>
                <Navbar />
                <Switch>
                  <Route exact path='/' component={MainPage} />
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/leaderboards' component={Leaderboards} />
                  <PrivateRoute exact path='/dashboard' component={Dashboard} />
                </Switch>
              </Fragment>
            </Router>
          </ApolloProvider>
        </div>
      </TimeState>
    </AuthState>
  );
}

export default App;
