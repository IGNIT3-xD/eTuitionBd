import { GraduationCap } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to={'/'} className='flex items-center gap-2 hover:scale-110 transition-all duration-300'>
            <div className='primary-clr p-2 rounded-xl shadow-lg text-white'>
                <GraduationCap className='w-5 h-5 md:w-6 md:h-6' />
            </div>
            <span className='hidden md:inline primary-clr bg-clip-text text-transparent text-xl'>e-TuitionBD</span>
        </Link>
    );
};

export default Logo;