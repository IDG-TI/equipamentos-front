import { destroyCookie } from 'nookies';

export default async function logout() {
    destroyCookie({}, 'auth-token')
    location.reload();
}
