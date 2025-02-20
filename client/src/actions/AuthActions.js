// this is where my blog function is called
import axios from "axios"

const apiUrl = axios.create({
    baseURL: `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api`,
    withCredentials: true
})


export const register = async(userData) => {
    try {
        const response = await apiUrl.post('/user/register', userData)
        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.error);
    }
}

export const login = async(userData) => {
    try {
        const response = await apiUrl.post('/user/login', userData)
        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.error);
    }
}

export const logout = async() => {
    try {
        const response = await apiUrl.post('/user/logout')
        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.error);
    }
}

export const checkAuth = async() => {
    try {
        const response = await apiUrl.get('/user/check', {
            withCredentials: true
        })
        
        return response.data
    } catch (error) {
        return { authenticated: false };
    }
}