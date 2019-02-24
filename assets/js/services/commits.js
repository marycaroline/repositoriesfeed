import axios from 'axios';


export function fetchCommits(filterUrl) {
    const URL = Urls.commits_list();
    return axios(filterUrl || URL);
}

export function fetchCommitsByRepository(id, filterUrl) {
    const URL = Urls.repositories_list();
    
    if (filterUrl){  
        return axios(filterUrl)
    }
    return axios(`${URL}${id}/commits`);
}

