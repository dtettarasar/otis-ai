import Cookies from 'js-cookie';

export function initLogout() {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    window.location.href = '/';
}