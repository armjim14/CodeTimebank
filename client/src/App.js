import React, { Fragment } from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ExamplePage from "./components/ExamplePage";

import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import Dashboard from "./components/Dashboard";
import EditProfile from "./components/EditProfile";
import Leaderboards from "./components/Leaderboards";
import Alerts from "./components/Alerts";
import Footer from "./components/Footer";
import AlertState from "./Context/alert/AlertState";
import Profile from "./components/Profile";
import CreditForm from "./components/CreditForm";
// Hooks
import AuthState from "./Context/auth/AuthState";
import QuestionState from "./Context/question/QuestionState";
import TimeState from "./Context/time/TimeState";

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

console.log("re-rendered");

function App() {
  return (
    <AuthState>
      <QuestionState>
        <TimeState>
        <AlertState>
          <ApolloProvider client={client}>
            <Router>
              <Fragment>
                <Navbar />
                <Footer />
                <div className='container bg-off-white px-5 shadow'>
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
                    <PrivateRoute
                      exact
                      path='/gethelp'
                      component={RequestHelp}
                    />
                    <PrivateRoute
                      exact
                      path='/providehelp'
                      component={HelpOthers}
                    />
                    <PrivateRoute
                      exact
                      path='/dashboard'
                      component={Dashboard}
                    />
                    <PrivateRoute 
                      exact 
                      path="/form/:id" 
                      component={CreditForm} 
                    />
                    <Route exact path='/user/:id' component={Profile} />
                    <Route exact path='/editprofile' component={EditProfile} />
                    <Route exact path='/example' component={ExamplePage} />
                  </Switch>
                </div>
              </Fragment>
            </Router>
          </ApolloProvider>
        </AlertState>
        </TimeState>
      </QuestionState>
    </AuthState>
  );
}

export default App;
