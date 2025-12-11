import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
    const { user } = useAuth()
    const instanceSecure = useAxiosSecure()
    const { data: role, isLoading } = useQuery({
        queryKey: ['role', user?.email],
        queryFn: async () => {
            const res = await instanceSecure.get(`users/${user?.email}`)
            return res.data.role
        },
        enabled: !!user?.email
    })

    // console.log(role);

    return { role, isLoading }
};

export default useRole;