import {
  FETCH_REPOSITORIES_REQUEST,
  FETCH_REPOSITORIES_SUCCESS,
  FETCH_REPOSITORIES_FAILURE
} from 'constants/repositories';
import initial from './initial';

const repositories = (state = initial.repositories, action) => {
  console.log(action);
  
  switch (action.type) {
    case FETCH_REPOSITORIES_REQUEST:
      return {
        fetching: true,
        data: []
      }
    case FETCH_REPOSITORIES_SUCCESS:
      return {
        fetching: false,
        data: action.payload
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
