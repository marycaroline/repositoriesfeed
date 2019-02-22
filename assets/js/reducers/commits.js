import {
  FETCH_COMMITS_REQUEST,
  FETCH_COMMITS_SUCCESS,
  FETCH_COMMITS_FAILURE,
  FETCH_ALL_COMMITS_REQUEST,
  FETCH_ALL_COMMITS_SUCCESS,
  FETCH_ALL_COMMITS_FAILURE
} from 'constants/commits';
import initial from './initial';

const commits = (state = initial.commits, action) => {
  switch (action.type) {
    case FETCH_COMMITS_REQUEST, FETCH_ALL_COMMITS_REQUEST:
      return {
        fetching: true,
        data: []
      }
    case FETCH_COMMITS_SUCCESS, FETCH_ALL_COMMITS_SUCCESS:
      return {
        fetching: false,
        data: action.payload
      }
    case FETCH_COMMITS_FAILURE, FETCH_ALL_COMMITS_FAILURE:
      return {
        fetching: false,
        data: []
      }
    default:
      return state
  }
}

export default commits
