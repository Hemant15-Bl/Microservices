
//------ check log in status ---------
export const isLogIn = () => {
    let data = localStorage.getItem("data");
    if (data != null) {
        return true;
    } else {
        return false;
    }
};

//------ set user data in local storage ---------
export const doLoggedIn = (data, next) => {
    localStorage.setItem("data", JSON.stringify(data));
    next();
};

//------ remove user data from local storage ---------
export const doLoggedOut = (next) => {
    localStorage.removeItem("data");
    next();
};

//------ get current or login user details ---------
export const getCurrentUserDetails = () => {
    if (isLogIn()) {
        return JSON.parse(localStorage.getItem("data")).userDto;
    } else {
        return undefined;
    }
};

//----- get token ------------------
export const getToken = () => {
    if (isLogIn()) {
        return JSON.parse(localStorage.getItem("data")).token;
    } else {
        return null;
    }
};