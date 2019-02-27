import { FETCH_COMMITS_BY_REPOSITORY_REQUEST, FETCH_COMMITS_REQUEST } from 'constants/commits';
import { FETCH_REPOSITORIES_REQUEST, FETCH_USER_REPOSITORIES_REQUEST, FOLLOW_REPOSITORY_REQUEST } from 'constants/repositories';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
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

const mapStateToProps = state => ({
  fetching: state.commits.fetching,
  commits: state.commits,
  repositories: state.repositories,
  userRepositories: state.userRepositories.results,
});

const mapDispatchToProps = dispatch => ({
  fetchCommits: url => dispatch({ type: FETCH_COMMITS_REQUEST, url }),
  fetchRepositories: () => dispatch({ type: FETCH_REPOSITORIES_REQUEST }),
  fetchUserRepositories: () => dispatch({ type: FETCH_USER_REPOSITORIES_REQUEST }),
  followRepository: full_name => dispatch({ type: FOLLOW_REPOSITORY_REQUEST, full_name }),
  fetchCommitsByRepository: (id, url) => dispatch({ type: FETCH_COMMITS_BY_REPOSITORY_REQUEST, id, url }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
