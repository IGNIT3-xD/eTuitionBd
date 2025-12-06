import React from 'react';
import Navbar from './../components/Navbar';
import { Outlet } from 'react-router';

const Root = () => {
    return (
        <div>
            <div className=''>
                <Navbar />
            </div>
            <div className=''>
                <Outlet />
            </div>
        </div>
    );
};

export default Root;