import { takeLatest, call, put } from "redux-saga/effects";
import { 
    FETCH_COMMITS_REQUEST, FETCH_COMMITS_SUCCESS, FETCH_COMMITS_FAILURE,
    FETCH_ALL_COMMITS_REQUEST, FETCH_ALL_COMMITS_SUCCESS, FETCH_ALL_COMMITS_FAILURE 
} from 'constants/commits';
import { fetchCommits, fetchAllCommits } from 'services';

export function* commitsSaga() {
    yield takeLatest(FETCH_COMMITS_REQUEST, getCommits);
    yield takeLatest(FETCH_ALL_COMMITS_REQUEST, getAllCommits);
}

function* getCommits(params) {
    try {
        let response = yield call(fetchCommits, params.repository );
        yield put({ type: FETCH_COMMITS_SUCCESS, payload: response.data });
    } catch (error) {
        yield put({ type: FETCH_COMMITS_FAILURE, error });
    }
}

function* getAllCommits() {
    try {
        let response = yield call(fetchAllCommits);
        yield put({ type: FETCH_ALL_COMMITS_SUCCESS, payload: response.data });
    } catch (error) {
        yield put({ type: FETCH_ALL_COMMITS_FAILURE, error });
    }
}
