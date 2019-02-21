const URL = 'http://localhost:8000/token/';

export function fetchToken(csrf) {
    return fetch(URL, {
        headers: { 'Content-Type': 'application/json', 'X-CSRFTOKEN': '', 'Cookie':''}
    })
}


