
import axios from 'axios';

const URL = 'http://localhost:8000/api/repositories/';

export function fetchRepositories(){
    return axios(URL)
}

export function followRepository(params) {
    return axios(URL, {
        method: 'POST',
        data: {
            owner: params.owner, name: params.repository
        }
    })
}


