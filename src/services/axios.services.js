import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
BaseURL = process.env.REACT_APP_BACKEND_URL;

const axiosInstance = axios.create({
    baseURL: "http://192.168.1.9:3000/api",//BaseURL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        "Allow-Control-Allow-Origin": "*",
    }
});


axiosInstance.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


export default axiosInstance;
