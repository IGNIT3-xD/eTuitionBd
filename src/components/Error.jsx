import Lottie from 'lottie-react';
import React from 'react';
import error from '../assets/404 not found.json';
import { Link } from 'react-router';

const Error = () => {
    return (
        <div className='min-h-screen flex flex-col items-center justify-center gap-4'>
            <Lottie className='w-[450px] md:w-4xl lg:w-xl' animationData={error} loop={true} />
            <Link to={'/'} className='btn btn-primary rounded-xl hover:bg-indigo-400'>Go back to home</Link>
        </div>
    );
};

export default Error;