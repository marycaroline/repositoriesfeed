import { takeLatest, call, put } from "redux-saga/effects";
import { FETCH_COMMITS_REQUEST, FETCH_COMMITS_SUCCESS, FETCH_COMMITS_FAILURE } from 'constants/commits';
import { fetchCommits } from 'services';

export function* commitsSaga() {
    yield takeLatest(FETCH_COMMITS_REQUEST, getRepositories);
}

function* getRepositories(params) {
    try {
        let response = yield call(fetchCommits, params.repository);
        yield put({ type: FETCH_COMMITS_SUCCESS, payload: response.data });
    } catch (error) {
        yield put({ type: FETCH_COMMITS_FAILURE, error });
    }
}
