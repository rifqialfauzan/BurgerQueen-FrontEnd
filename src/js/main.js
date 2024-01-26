function getTokenFromCookie(cookie) {
    // console.log(document.cookie);
    if (cookie){
        return cookie.split("; ")
            .find((row) => row.startsWith("token="))
            .split("=")[1];
    }

    return null;
}

function isTokenExpired(tokenFromCookie) {
    const base64Url = tokenFromCookie.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const payload = JSON.parse(jsonPayload);
    const tokenExp = payload.exp * 1000;

    return Date.now() >= tokenExp;
}

function isAuthenticated() {
    const tokenFromCookie = getTokenFromCookie(document.cookie);
    // console.info(tokenFromCookie);
    if (tokenFromCookie !== null) {
        if (!isTokenExpired(tokenFromCookie)){
            return true;
        }
    }
    return false;
}

function setCookie(name, value) {
    document.cookie = name +'='+ value +'; Path=/;';
}
function deleteCookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


export {isAuthenticated, setCookie, deleteCookie};

