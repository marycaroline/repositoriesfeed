import {
  FETCH_REPOSITORIES_REQUEST,
  FETCH_REPOSITORIES_SUCCESS,
  FETCH_REPOSITORIES_FAILURE,
  FOLLOW_REPOSITORY_REQUEST,
  FOLLOW_REPOSITORY_SUCCESS,
  FOLLOW_REPOSITORY_FAILURE
} from 'constants/repositories';
import initial from './initial';

const repositories = (state = initial.repositories, action) => {
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
    case FOLLOW_REPOSITORY_SUCCESS:
      return {
        fetching: false,
        data: [...state.data, action.payload]
      }
    case FOLLOW_REPOSITORY_FAILURE:
    default:
      return state
  }
}

export default repositories
