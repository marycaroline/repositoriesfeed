import {
  FETCH_USER_REPOSITORIES_REQUEST,
  FETCH_USER_REPOSITORIES_SUCCESS,
  FETCH_USER_REPOSITORIES_FAILURE,
} from 'constants/repositories';
import initial from './initial';

const userRepositories = (state = initial.userRepositories, action) => {
  switch (action.type) {
    case FETCH_USER_REPOSITORIES_REQUEST || FETCH_USER_REPOSITORIES_FAILURE:
      return {
        results: [],
      };
    case FETCH_USER_REPOSITORIES_SUCCESS:
      return {
        results: action.payload,
      };
    default:
      return state;
  }
};

export default userRepositories;
