
import axios from 'axios';
import { Urls } from 'utils';


export function fetchRepositories() {
    const URL = Urls.repositories_list();
    return axios(URL);
}

export function followRepository(full_name) {
    const URL = Urls.repositories_list();
    return axios(URL, {
        method: 'POST',
        data: {
            full_name: full_name,
        },
    });
}

export function fetchUserRepositories() {
    const URL = Urls.userRepositories();
    return axios(URL, {
        method: 'GET',
    });
}