import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Card, CardText, CardTitle, Button } from 'react-md';

class Login extends PureComponent {
  render() {
    return (
      Cookies.get('rfeedtoken') ?
        <Redirect to="/rfeed" />
        :
        <Card className="card-login">
          <CardTitle title="Repositories Feed" />
          <CardText>
            <Button raised primary iconChildren="person" href="/oauth/login/github">Login with Github</Button>
          </CardText>
        </Card>
    );
  }
}
export default Login;
