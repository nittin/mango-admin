import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK, AUTH_ERROR, AUTH_GET_PERMISSIONS } from 'react-admin';

export default (type, params) => {
    if (type === AUTH_LOGIN) {
        const { username, password } = params;
        const request = new Request('https://tinmango.com/back/auth/fb', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password,
             }),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(({id_token}) => {
                sessionStorage.setItem('token', id_token);
                sessionStorage.setItem('userDetails', JSON.stringify({
                    username: username,
                }))
            });
    }
    if (type === AUTH_LOGOUT) {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userDetails');
        return Promise.resolve();

    }
    if (type === AUTH_ERROR) {
        const { status } = params;
        return status === 401 || status === 403
            ? Promise.reject('Authenticate Fail')
            : Promise.resolve();

    }
    if (type === AUTH_CHECK) {
        return sessionStorage.getItem('token')
        ? Promise.resolve()
        : Promise.reject('Authenticate Fail');
    }
    if (type === AUTH_GET_PERMISSIONS) {
        return Promise.resolve();
    }
    return Promise.reject('Unkown method');
}
