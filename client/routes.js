import React from 'react';
import ReactDOM from 'react-dom';
// import App from './app/app.jsx';
import Decision from './app/decision.jsx';
import Location from './app/location.jsx';
import mapBar from './app/mapBar.jsx';
import randomBar from './app/randomBar.jsx';
import selectBar from './app/selectBar.jsx';
import signup from './app/signup.jsx';
import Index from './app/index.jsx';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

let App = (props) => (
  <div>
    <div className='container'>{props.children}</div>
  </div>
);

ReactDOM.render (
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Index}></IndexRoute>
      <Route path='decision' component={Decision} />
      <Route path='location' component={Location} />
      <Route path='mapbar' component={mapBar} />
      <Route path='randombar' component={randomBar} />
      <Route path='selectbar' component={selectBar} />
      <Route path='signup' component={signup} />
    </Route>
  </Router>,
    document.getElementById('app'));
