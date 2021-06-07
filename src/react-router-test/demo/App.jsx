import React from 'react';
import Router from './../react-router-dom/BrowserRouter';
import Route from './../react-router/Route';
import Switch from './../react-router/Switch';
import Home from './pages/Home';
import Login from './pages/Login';
import Backend from './pages/Backend';
import Admin from './pages/Admin';


function ReactRouteApp() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/backend" component={Backend}/>
        <Route path="/admin" component={Admin}/>
        <Route path="/" component={Home}/>
      </Switch>
    </Router>
  );
}

export default ReactRouteApp;