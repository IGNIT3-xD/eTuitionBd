import React from 'react';
import useRole from './../hooks/useRole';
import useAuth from '../hooks/useAuth';
import Loading from './../components/Loading';
import Error from './../components/Error';

const TutorRoute = ({ children }) => {
    const { role, isLoading } = useRole()
    const { user, loading } = useAuth()

    if (loading || isLoading) return <Loading />
    if (role !== 'Tutor' || !user) return <Error />
    return children
};

export default TutorRoute;