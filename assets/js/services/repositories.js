
import { CALL_API } from 'redux-api-middleware';
import {
    FOLLOW_REPOSITORY_REQUEST,
    FOLLOW_REPOSITORY_SUCCESS,
    FOLLOW_REPOSITORY_FAILURE
} from '../constants';

const URL = 'http://localhost:8000/api/repositories/';

export const login = () => ({
    [CALL_API]: {
        types: [FOLLOW_REPOSITORY_REQUEST, FOLLOW_REPOSITORY_SUCCESS, FOLLOW_REPOSITORY_FAILURE],
        endpoint: `http://localhost:8000/token`,
        method: 'GET',
    }
});