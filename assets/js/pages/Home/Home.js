import React, { Component } from 'react';
import CommitsContainer from 'containers/Commits';
import RepositoriesForm from 'containers/RepositoriesForm';


export default class Home extends Component {
  render() {
    return (
      <div>
        <RepositoriesForm />
        <CommitsContainer />
      </div>
    )
  }
}
