import axios from 'axios';
import Cookies from 'js-cookie';
import { Urls } from 'utils';

export default function postLogout() {
  return axios.post(Urls.logout(), {}, {
    headers: {
      'X-CSRFToken': Cookies.get('csrftoken'),
    },
  });
}
