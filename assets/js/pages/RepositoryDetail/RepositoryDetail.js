import React, { Component } from 'react';
import CommitsContainer from 'containers/Commits/';


export default class Home extends Component {

  render() {
    return (
      <div>
        <CommitsContainer repository={this.props.match.params.id} />
      </div>
    )
  }
}
