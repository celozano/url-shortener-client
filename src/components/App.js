import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import NotFound from '../views/404';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from '../contexts/AuthContext';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route exact path="/not-found" component={NotFound} />
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export default App;
