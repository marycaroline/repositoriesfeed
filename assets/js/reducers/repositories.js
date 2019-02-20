import {
  FOLLOW_REPOSITORY_REQUEST,
  FOLLOW_REPOSITORY_SUCCESS,
  FOLLOW_REPOSITORY_FAILURE
} from '../constants';
import initial from './initial';

const repositories = (state = initial.repositories, action) => {
  switch (action.type) {
    case FOLLOW_REPOSITORY_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        data: []
      })
    case FOLLOW_REPOSITORY_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        data: [
          ...state.data,
          {
            id: action.payload.id,
            name: action.payload.name,
            description: action.payload.description,
            owner: action.payload.owner,
            user: action.payload.user
          }
        ]
      })
    case FOLLOW_REPOSITORY_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
      })
    default:
      return state
  }
}

export default repositories
