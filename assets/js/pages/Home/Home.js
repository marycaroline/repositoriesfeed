import React, { Component } from 'react'
import login from '../../services/repositories';
export default class Home extends Component {
  render() {
    return (
      <div>
            <button onClick={login()}>ooooooooooooooooi</button> 
      </div>
    )
  }
}
