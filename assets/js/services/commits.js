import axios from 'axios';

const URL = 'http://localhost:8000/api/';

export function fetchCommits(repository) {
    return axios(`${URL}repositories/${repository}/commits`)
}
export function fetchAllCommits() {
    return axios(`${URL}commits/`)
}


