function getTokenFromCookie(cookie) {
    return undefined;
}

function isTokenExpired(tokenFromCookie) {
    // Use jwt decode to decode jwt to get the payload. And then grab the expiration from the payload
    // and check if it expired or not
    return false;
}

export function isAuthenticated() {
    const tokenFromCookie = getTokenFromCookie(document.cookie);
    if (tokenFromCookie !== null) {
        if (!isTokenExpired(tokenFromCookie)){
            return true;
        }
    }

    return false;
}

