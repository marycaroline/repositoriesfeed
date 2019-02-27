import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, Login } from 'pages';
import { PrivateRoute } from 'app/repositories';
import './style.scss';


class App extends PureComponent {
  render() {
    return (
      <Switch key={location}>
        <Route exact path="/rfeed/login" location={location} component={Login} />
        <PrivateRoute exact path="/rfeed/:repositoryId?" location={location} component={Home} />
      </Switch>
    );
  }
}

export default App;

