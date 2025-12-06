import React from 'react';
import { Link, NavLink } from 'react-router';
import { GraduationCap } from 'lucide-react';

const Navbar = () => {
    const navlinks = <>
        <li><NavLink>Home</NavLink></li>
        <li><NavLink>Tuitions</NavLink></li>
        <li><NavLink>Tutor</NavLink></li>
        <li><NavLink>About</NavLink></li>
        <li><NavLink>Contact</NavLink></li>
    </>

    return (
        <div className="fixed left-0 right-0 z-50 navbar bg-base-100 shadow-sm md:px-6 lg:px-12">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {
                            navlinks
                        }
                    </ul>
                </div>
                <Link to={'/'} className='flex items-center gap-2 hover:scale-110 transition-all duration-300'>
                    <div className='primary-clr p-2 rounded-xl shadow-lg text-white'>
                        <GraduationCap className='w-5 h-5 md:w-6 md:h-6' />
                    </div>
                    <span className='hidden md:inline primary-clr bg-clip-text text-transparent text-xl'>e-TuitionBD</span>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="*:hover:text-indigo-600 menu menu-horizontal px-1">
                    {
                        navlinks
                    }
                </ul>
            </div>
            <div className="navbar-end">
                <Link className="btn text-white primary-clr btn-sm md:btn-md rounded-xl shadow-lg hover:scale-105 transition-all duration-300">Login / Sign up</Link>
            </div>
        </div>
    );
};

export default Navbar;