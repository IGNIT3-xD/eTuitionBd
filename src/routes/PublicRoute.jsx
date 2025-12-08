import React from 'react';
import useAuth from './../hooks/useAuth';
import { Navigate } from 'react-router';
import Loading from './../components/Loading';

const PublicRoute = ({ children }) => {
    const { user, loading } = useAuth()

    if (loading) return <Loading />
    if (user) return <Navigate to={'/'} />
    return children
};

export default PublicRoute;