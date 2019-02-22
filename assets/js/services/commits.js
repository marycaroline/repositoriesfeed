import axios from 'axios';

const URL = 'http://localhost:8000/api/repositories/';

export function fetchCommits(repository) {
    console.log(repository);
    
    return axios(`${URL}${repository}/commits`)
}


