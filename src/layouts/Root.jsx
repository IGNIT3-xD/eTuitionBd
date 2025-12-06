import React from 'react';
import Navbar from './../components/Navbar';
import { Outlet } from 'react-router';

const Root = () => {
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto'>
                <Outlet />
            </div>
        </div>
    );
};

export default Root;