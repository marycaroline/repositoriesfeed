import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, Login } from 'pages';
import { history } from 'utils';
import './style.scss';


class App extends PureComponent {
  render() {
    return (
      <Route history={history}
        render={({ location }) => (
              <Switch key={location.key}>
                <Route exact path="/rfeed/login" location={location} component={Login} />
                <Route path="/rfeed/:repositoryId?" location={location} component={Home} />
              </Switch>
        )}
      />
    );
  }
}

export default App;

