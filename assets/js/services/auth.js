import axios from 'axios';
import Cookies from 'js-cookie';

export function postLogout(){
  return axios.post(Urls.logout(), {}, {headers: {
    "X-CSRFToken": Cookies.get('csrftoken')
  }})
}
