import {
    FETCH_TOKEN_SUCCESS,
    FETCH_TOKEN_FAILURE
} from 'constants/auth';
import initial from './initial';

const auth = (state = initial.auth, action) => {
    console.log(action);
    switch (action.type) {
        case FETCH_TOKEN_SUCCESS:
            return {
                email: action.payload.email,
                token: action.payload.token,
                id: action.payload.id
            }
        case FETCH_TOKEN_FAILURE:
            return {
                email: '',
                token: null,
                id: 0
            }
        default:
            return state
    }
}

export default auth;
