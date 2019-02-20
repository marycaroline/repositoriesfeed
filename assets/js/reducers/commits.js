import initial from './initial';

const commits = (state = initial.commits, action) => {
  switch (action.type) {
    case 'FETCH_COMMITS_REQUEST':
      return Object.assign({}, state, {
        isFetching: true,
        data: []
      })
    case 'FETCH_COMMITS_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        data: action.payload
      })
      case 'FETCH_COMMITS_FAILURE':
      return Object.assign({}, state, {
        isFetching: false,
        data: []
      })
    default:
      return state
  }
}

export default commits
