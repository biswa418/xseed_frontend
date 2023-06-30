import { useContext, useEffect, useState } from "react"
import jwt_decode from 'jwt-decode';
import { AuthContext } from '../providers/AuthProvider';
import { login as userLogin, signup as userSignup } from '../api';
import { setInLocalStorage, LOCALSTORAGE_TOKEN_KEY, removeFromLocalStorage, getFromLocalStorage } from '../utils'

export const useAuth = () => {
    return useContext(AuthContext);
}

export const useProvideAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUser(false);
    }, []);

    const getUser = async (newToken) => {
        const token = !newToken ? getFromLocalStorage(LOCALSTORAGE_TOKEN_KEY) : newToken

        if (token) {
            const decodedUser = await jwt_decode(token);
            setUser(decodedUser);
        }
    }

    const login = async (email, password) => {
        const response = await userLogin(email, password);

        if (response.success) {
            setUser(response.data.user);
            setInLocalStorage(LOCALSTORAGE_TOKEN_KEY, response.data.token ? response.data.token : null);
            await getUser(response.data.token);

            return {
                success: true,
            }
        } else {
            return {
                success: false,
                message: response.message
            }
        }
    }

    const signup = async (name, email, password) => {
        const response = await userSignup(email, name, password);

        if (response.success) {
            return {
                success: true,
            }
        } else {
            return {
                success: false,
                message: response.message
            }
        }
    }

    const logout = () => {
        setUser({ currUser: null, loading: true });
        removeFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    }

    return {
        user,
        login,
        signup,
        logout,
        loading,
    }
}