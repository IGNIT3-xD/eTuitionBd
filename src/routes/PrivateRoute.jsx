import React from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Loading from './../components/Loading';
import { Navigate } from 'react-router';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()

    if (loading) return <Loading />
    if (!user) return <Navigate to={'/login'} />

    return children
};

export default PrivateRoute;