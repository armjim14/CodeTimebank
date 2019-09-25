import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import MainPage from './components/MainPage';
// Hooks
import AuthState from './Context/auth/AuthState';
import TimeState from './Context/time/TimeState';

// For GraphQL
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
const client = new ApolloClient({});

function App() {
  return (
    <AuthState>
      <TimeState>
        <div className='container'>
          <ApolloProvider client={client}>
            <Router>
              <Switch>
                <Route exact path='/'>
                  <Navbar />
                  <MainPage />
                </Route>

                <Route exact path='/login'>
                  <Navbar />
                  <Login />
                </Route>

                <Route exact path='/register'>
                  <Navbar />
                  <Register />
                </Route>

                <Route exact path='leaderboard/' />
              </Switch>
            </Router>
          </ApolloProvider>
        </div>
      </TimeState>
    </AuthState>
  );
}

export default App;
