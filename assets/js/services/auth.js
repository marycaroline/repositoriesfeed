import { apiCall } from "utils";


export function postLogout(){
  return axios.post(Urls.logout(), {}, {headers: {
    "X-CSRFToken": Cookies.get('csrftoken')
  }})
}
