import axios from 'axios';

const URL = 'http://localhost:8000/api/';

export function fetchCommits() {
    return axios(`${URL}commits/`)
}


