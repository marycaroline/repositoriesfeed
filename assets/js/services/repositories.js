
import axios from 'axios';
import { Urls } from 'utils';

const URL = Urls.repositories_list();

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


