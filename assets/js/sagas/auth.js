import Cookies from 'js-cookie';
import { Urls, history } from '../utils';

export function logout() {
  console.log('out');
  
  Cookies.remove('rfeedtoken');
  history.push(Urls.logout());
}