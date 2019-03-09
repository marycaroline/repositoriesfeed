
import axios from 'axios';
import { Urls } from 'utils';

export function fetchRepositories() {
  const URL = Urls.repositories_list();
  return axios(URL);
}

export function followRepository(fullName) {
  const URL = Urls.repositories_list();
  return axios(URL, {
    method: 'POST',
    data: {
      full_name: fullName,
    },
  });
}

export function fetchUserRepositories() {
  const URL = Urls.userRepositories();
  return axios(URL, {
    method: 'GET',
  });
}
