import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, Login } from 'pages';
import { SnackbarContainer } from 'containers';

import './style.scss';


const App = () => (
  <div>
    <Switch>
      <Route exact path="/rfeed/login" component={Login} />
      <Route path="/rfeed/:repositoryId?" component={Home} />
    </Switch>
    <SnackbarContainer />
  </div>
);


export default App;

