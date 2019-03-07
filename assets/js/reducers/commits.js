import {
  FETCH_COMMITS_REQUEST,
  FETCH_COMMITS_SUCCESS,
  FETCH_COMMITS_FAILURE,
  FETCH_COMMITS_BY_REPOSITORY_REQUEST,
} from 'constants/commits';
import initial from './initial';

const commits = (state = initial.commits, action) => {
  switch (action.type) {
    case FETCH_COMMITS_REQUEST || FETCH_COMMITS_FAILURE || FETCH_COMMITS_BY_REPOSITORY_REQUEST:
    console.log(action);
      return {
        fetching: true,
        next: null,
        previous: null,
        count: null,
        current: 1,
        results: [],
      };
    case FETCH_COMMITS_SUCCESS:
      return {
        fetching: false,
        next: action.payload.next,
        previous: action.payload.previous,
        count: action.payload.count,
        current: action.payload.current,
        results: action.payload.results,
      };
    default:
      return state;
  }
};

export default commits;
