import React from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Loading from './../components/Loading';
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = AuthContext()

    if (loading) return <Loading />
    if (!user) return <Navigate to={'/auth/login'} />

    return children
};

export default PrivateRoute;