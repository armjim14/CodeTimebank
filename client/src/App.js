import React, { Fragment } from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import Dashboard from "./components/Dashboard";
import Leaderboards from "./components/Leaderboards";
import Alerts from "./components/Alerts";
import Footer from "./components/Footer";
import AlertState from './Context/alert/AlertState';
// Hooks
import AuthState from "./Context/auth/AuthState";
import QuestionState from "./Context/question/QuestionState";

// jwt Middleware
import setAuthToken from "./Utils/setAuthToken";

// used for pages where user must be logged in
import PrivateRoute from "./components/PrivateRoute";

// For GraphQL
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import HelpOthers from "./components/HelpOthers";
import RequestHelp from "./components/RequestHelp";
const client = new ApolloClient({});

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <QuestionState>
       <AlertState>
          <ApolloProvider client={client}>
            <Router>
              <Fragment>
                <Navbar />
                <Footer />
                <div className='container bg-off-white px-5'>
                  <Alerts />
                  <Switch>
                    <Route exact path='/' component={MainPage} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                    <Route
                      exact
                      path='/leaderboards'
                      component={Leaderboards}
                    />
                    <Route exact path='/gethelp' component={RequestHelp} />
                    <Route exact path='/providehelp' component={HelpOthers} />
                    <PrivateRoute
                      exact
                      path='/dashboard'
                      component={Dashboard}
                    />
                  </Switch>
                </div>
              </Fragment>
            </Router>
          </ApolloProvider>
        </AlertState>
      </QuestionState>
    </AuthState>
  );
}

export default App;
