import { takeLatest, call, put } from "redux-saga/effects";
import { FETCH_TOKEN_REQUEST, FETCH_TOKEN_SUCCESS, FETCH_TOKEN_FAILURE } from 'constants/auth';
import { fetchToken } from 'services/auth';
import Cookies from 'js-cookie';

export function* authSaga() {
    yield takeLatest(FETCH_TOKEN_REQUEST, getToken);
}

function* getToken() {
    try {
        const csrf = Cookies.get('csrftoken');
        if (csrf){
            let response = yield call(fetchToken, 'tJEvzyEKmMVP5w7v3QmY65V7rty25VqzSGx3WnQQTYwr0tiUktbE');
            if (response.status == 200) {
                const res = yield response.json();
                yield put({ type: FETCH_TOKEN_SUCCESS, payload: res.message });
            }
            else throw response;
        }
        else yield logout('');
    } catch (error) {
        yield logout(error);
    }
}

function logout(error){
    return put({ type: FETCH_TOKEN_FAILURE, error });
}