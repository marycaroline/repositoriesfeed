import axios from 'axios';

const URL = Urls.commits_list();

export function fetchCommits() {
    return axios(URL)
}


