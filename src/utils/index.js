export * from './constants';
export * from './api';

//get and set localstorage with user --
export const getFromLocalStorage = (key) => {
    if (!key) {
        return console.error('No key given to extract');
    }

    return localStorage.getItem(key);
}

export const getFormBody = (params) => {
    let formBody = [];

    for (let prop in params) {
        let encodedKey = encodeURIComponent(prop); //removes spaces with url friendly string
        let encodedValue = encodeURIComponent(params[prop]);

        formBody.push(encodedKey + '=' + encodedValue);
    }

    return formBody.join('&');
}

export const setInLocalStorage = (key, value) => {
    if (!key || !value) {
        return console.error('Error in key or value');
    }

    const strValue = typeof value === 'string' ? value : JSON.stringify(value);

    localStorage.setItem(key, strValue);
}

export const removeFromLocalStorage = async (key) => {
    if (!key) {
        return console.error('No key given to remove');
    }

    await localStorage.removeItem(key);
}