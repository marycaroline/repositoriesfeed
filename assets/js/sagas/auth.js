import { takeLatest, call, put } from "redux-saga/effects";
import { FETCH_TOKEN_REQUEST, FETCH_TOKEN_SUCCESS, FETCH_TOKEN_FAILURE } from 'constants/auth';
import Cookies from 'js-cookie';
import { Urls } from "../utils";

export function* authSaga() {
    yield takeLatest(FETCH_TOKEN_REQUEST, getToken);
    yield takeLatest(FETCH_TOKEN_FAILURE, logout);
}

function* getToken() {
    const token = Cookies.get('rfeedtoken');
    if (token){
        yield put({ type: FETCH_TOKEN_SUCCESS, payload: token });
    } else yield put({ type: FETCH_TOKEN_FAILURE, error: '' });
}

function* logout() {
    Cookies.remove('rfeedtoken');
    axios.get(Urls.logout());
}

export const logoutAction = () => {
    return dispatch =>
        axios.post(Urls.logout()).then(res => dispatch({ type: FETCH_TOKEN_FAILURE }));
};