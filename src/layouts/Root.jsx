import React from 'react';
import Navbar from './../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import { ToastContainer } from 'react-toastify';

const Root = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            <div className='flex-1'>
                <Outlet />
            </div>
            <Footer />

            <ToastContainer position='top-left'/>
        </div>
    );
};

export default Root;