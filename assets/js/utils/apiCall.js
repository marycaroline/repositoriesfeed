import axios from "axios";
import Cookies from 'js-cookie';

export default function* apiCall (url, method='GET', body=null) {
  console.log('====================================');
  console.log(url, method, body);
  console.log('====================================');
    const token = Cookies.get('rfeedtoken');
    if (token) {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization':  `Token ${token}`,
        'X-CSRFToken': method.toLowerCase() === 'post'? Cookies.get('csrftoken'): ''
      }
      const response = yield(call(axios({
          method: method,
          url: url,
          headers: headers,
          data: body
        })));
      if(response.error){
        if(response.error.status == 401){
          yield put({ type: LOGOUT });
        }
      }
      return response;
    } else {
      yield put({ type: LOGOUT });
    }
}
