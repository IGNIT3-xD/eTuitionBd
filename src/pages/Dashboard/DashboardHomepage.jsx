import React from 'react';
import useRole from '../../hooks/useRole';
import Loading from './../../components/Loading';
import AdminStats from './AdminStats';
import TutorStats from './TutorStats';
import { Link } from 'react-router';

const DashboardHomepage = () => {
    const { role, isLoading } = useRole();
    if (isLoading) return <Loading />;

    if (role === 'Admin') return <AdminStats />
    if (role === 'Tutor') return <TutorStats />

    return (
        <div className='bg-gray-50 min-h-[calc(100vh-64px)] flex items-center justify-center'>
            <div className='text-center'>
                <h2 className='text-2xl md:text-4xl font-medium text-gray-700'>Welcome to e-TuitionBD</h2>
                <p className='text-gray-500 mt-2'>See your <Link className='text-indigo-400 underline' to={'/dashboard/my-tuitions'}>tuitions</Link> </p>
            </div>
        </div>
    );
};

export default DashboardHomepage;