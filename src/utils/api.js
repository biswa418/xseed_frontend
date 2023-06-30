const API_ROOT = 'http://localhost:8000';

export const API_URLS = {
    login: () => `${API_ROOT}/signin`,
    signup: () => `${API_ROOT}/signup`,
    posts: (page, limit) => `${API_ROOT}/posts?page=${page}&limit=${limit}`,
    userInfo: (userId) => `${API_ROOT}/users/${userId}`,
};


export const LOCALSTORAGE_TOKEN_KEY = '__creativ_token__'; 