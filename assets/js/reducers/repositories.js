import {
  FETCH_REPOSITORIES_REQUEST,
  FETCH_REPOSITORIES_SUCCESS,
  FETCH_REPOSITORIES_FAILURE
} from '../constants';
import initial from './initial';

const repositories = (state = initial.repositories, action) => {
  switch (action.type) {
    case FETCH_REPOSITORIES_REQUEST:
      return Object.assign({}, state, {
        fetching: true,
        data: []
      })
    case FETCH_REPOSITORIES_SUCCESS:
    console.log(action);
      return {
        fetching: false,
        data: {
          ...state.data,
          ...action.payload
        }
      }
    case FETCH_REPOSITORIES_FAILURE:
      return {
        fetching: false,
        data: []
      }
    default:
      return state
  }
}

export default repositories
