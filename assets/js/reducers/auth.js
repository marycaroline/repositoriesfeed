import {
    FETCH_TOKEN_SUCCESS,
    FETCH_TOKEN_FAILURE
} from 'constants/auth';
import initial from './initial';

const auth = (state = initial.auth, action) => {
    switch (action.type) {
        case FETCH_TOKEN_SUCCESS:
            return {
                email: '',
                token: action.payload
            }
        case FETCH_TOKEN_FAILURE:
            return {
                email: '',
                token: null
            }
        default:
            return state
    }
}

export default auth;
