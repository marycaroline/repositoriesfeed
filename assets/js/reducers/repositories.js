import {
  FETCH_REPOSITORIES_REQUEST,
  FETCH_REPOSITORIES_SUCCESS,
  FETCH_REPOSITORIES_FAILURE,
  FOLLOW_REPOSITORY_SUCCESS,
  FOLLOW_REPOSITORY_FAILURE,
  FOLLOW_REPOSITORY_REQUEST,
} from 'constants/repositories';
import initial from './initial';

const repositories = (state = initial.repositories, action) => {
  switch (action.type) {
    case FETCH_REPOSITORIES_REQUEST || FETCH_REPOSITORIES_FAILURE:
      return {
        fetching: true,
        next: null,
        previous: null,
        count: null,
        current: 1,
        results: [],
      };
    case FETCH_REPOSITORIES_SUCCESS:
      return {
        fetching: false,
        next: action.payload.next,
        previous: action.payload.previous,
        count: action.payload.count,
        current: action.payload.count,
        results: action.payload.results,
      };
    case FOLLOW_REPOSITORY_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case FOLLOW_REPOSITORY_SUCCESS:
      return {
        ...state,
        fetching: false,
        count: state.count + 1,
        results: [...state.results, action.payload],
      };
    case FOLLOW_REPOSITORY_FAILURE:
      return {
        ...state,
        fetching: false,
      };
    default:
      return state;
  }
};

export default repositories;
