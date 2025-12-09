import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Lottie from "lottie-react";
import animationData from '../assets/Welcome.json'
import { ToastContainer } from 'react-toastify';

const AuthLayout = () => {
    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <div className='bg-gray-50 flex-1'>
                <div className='grid lg:grid-cols-2 gap-6 items-center max-w-5xl mx-auto py-25 px-4 md:px-8'>
                    <div>
                        <Lottie className='md:h-[350px] md:w-[350px] lg:h-auto lg:w-auto mx-auto' animationData={animationData} loop={true} />
                    </div>
                    <Outlet />
                </div>
            </div>
            <Footer />

            <ToastContainer
                position="top-center"
                autoClose={3000} />
        </div>
    );
};

export default AuthLayout;