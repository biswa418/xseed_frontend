const API_ROOT = 'https://xceed-backend.vercel.app';

export const API_URLS = {
    login: () => `${API_ROOT}/signin`,
    signup: () => `${API_ROOT}/signup`,
    posts: (page) => `${API_ROOT}/posts?page=${page}`,
};


export const LOCALSTORAGE_TOKEN_KEY = '__creativ_token__'; 