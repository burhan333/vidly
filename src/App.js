import React from 'react';
import Movies from './components/movies';
import { Route, Redirect, Switch } from 'react-router-dom';
import Customers from './components/customers'
import Rentals from './components/rentals'
import NotFound from './components/notFound'
import NavBar from './components/navBar';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm'
import './App.css';

function App() {
  return (
    <React.Fragment>
      <NavBar/>
      <main className="container">
        <Switch>
          <Route path='/registerForm' component={RegisterForm} />
          <Route path='/loginForm' component={LoginForm} />
          <Route path='/movies/:id' component={MovieForm} />
          <Route path='/movies' component={Movies} />
          <Route path='/customers' component={Customers} />
          <Route path='/rentals' component={Rentals} />
          <Route path='/notFound' component={NotFound} />
          <Redirect from='/' exact to='/movies' />
          <Redirect to='/notFound' />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;