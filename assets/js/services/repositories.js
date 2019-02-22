
import axios from 'axios';

const URL = 'http://localhost:8000/api/repositories/';

export function fetchRepositories(){
    return axios(URL)
}


