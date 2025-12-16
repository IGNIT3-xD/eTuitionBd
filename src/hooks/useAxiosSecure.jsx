import axios from 'axios';
import useAuth from './useAuth';
import { useEffect } from 'react';

const instance = axios.create({
    baseURL: 'https://e-tuition-bd-server-sigma.vercel.app'
})

const useAxiosSecure = () => {
    const { user, logout } = useAuth()

    useEffect(() => {
        const requestInterceptor = instance.interceptors.request.use(config => {
            config.headers.authorization = `Bearer ${user?.accessToken}`
            return config
        })

        const responseInerceptor = instance.interceptors.response.use(res => {
            return res;
        }, (err) => {
            if (err.status === 403 || err.status === 401) {
                return <p className='py-20 text-center font-bold'>Forbidden Access</p>
            }
        })

        return () => {
            instance.interceptors.request.eject(requestInterceptor)
            instance.interceptors.response.eject(responseInerceptor)
        }

    }, [user, logout])

    return instance;
};

export default useAxiosSecure;