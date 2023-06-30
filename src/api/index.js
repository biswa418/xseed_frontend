import { API_URLS, LOCALSTORAGE_TOKEN_KEY } from "../utils/api";
import { getFromLocalStorage, getFormBody } from '../utils';
import toast from 'react-hot-toast';

const customFetch = async (url, { body, ...customConfig }) => {
    const token = getFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);

    const headers = {
        'content-type': 'application/x-www-form-urlencoded',
    }

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const config = {
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers
        }
    }

    if (body) {
        config.body = getFormBody(body);
    }

    try {
        const response = await fetch(url, config);
        const data = await response.json();

        if (data.success) {
            return {
                data: data.data,
                success: true
            }
        }

        //if success is not true
        throw new Error(data.message);

    } catch (err) {
        return {
            message: err.message,
            success: false
        }
    }
}

async function login(name, password) {
    return await customFetch(API_URLS.login(), {
        method: 'POST',
        body: { name, password }
    });
}



export {
    login,

}