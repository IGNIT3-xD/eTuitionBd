import React from 'react';
import Navbar from './../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const Root = () => {
    return (
        <div>
            <Navbar />
            <div className=''>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Root;