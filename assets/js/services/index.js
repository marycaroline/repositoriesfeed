import axios from 'axios';
import Cookies from 'js-cookie';
import { fetchRepositories } from './repositories';
import { fetchCommits, fetchAllCommits } from './commits';

axios.interceptors.request.use(function (config) {
    const token = Cookies.get('rfeedtoken');
    if (token != null) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
}, function (err) {
    return Promise.reject(err);
});

export {
    fetchRepositories,
    fetchCommits,
    fetchAllCommits,
}