// authService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/users/'

const register = async (userData) => {
    try {
        // Clear any existing large data before making request
        localStorage.removeItem('user')
        
        const response = await axios.post(API_URL, userData);
        
        if(response.data) {
            // Only store essential user info to avoid large localStorage
            const userInfo = {
                id: response.data.id,
                name: response.data.name,
                email: response.data.email,
                token: response.data.token
            }
            localStorage.setItem('user', JSON.stringify(userInfo));
        }

        return response.data;
    } catch (error) {
        console.error('Registration error:', error)
        throw error
    }
}
const login = async (userData) => {
    try {
        // Clear any existing large data before making request
        localStorage.removeItem('user')
        
        const response = await axios.post(API_URL + 'login', userData);
        
        if(response.data) {
            // Only store essential user info to avoid large localStorage
            const userInfo = {
                id: response.data.id,
                name: response.data.name,
                email: response.data.email,
                token: response.data.token
            }
            localStorage.setItem('user', JSON.stringify(userInfo));
        }

        return response.data;
    } catch (error) {
        console.error('Registration error:', error)
        throw error
    }
}
const logout = () => {
    localStorage.removeItem('user');
}
const authService = {
    register,
    logout,
    login
}

export default authService;