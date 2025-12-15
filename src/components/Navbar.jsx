import React from 'react';
import { Link, NavLink } from 'react-router';
import { BookOpen, Contact, GraduationCap, House, Info, LayoutDashboard, LogOut, Settings, UserRound } from 'lucide-react';
import Logo from './Logo';
import useAuth from './../hooks/useAuth';
import { toast } from 'react-toastify';
import useAxiosSecure from './../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Navbar = () => {
    const { user, logout } = useAuth()
    const instanceSecure = useAxiosSecure()
    const { data } = useQuery({
        queryKey: ["user", user?.email],
        queryFn: async () => {
            const res = await instanceSecure.get(`/users/${user?.email}`)
            return res.data
        },
        enabled: !!user?.email
    })
    // console.log(data);

    const handleLogout = () => {
        logout()
            .then(() => toast.success('Logout successfully !!'))
            .catch(err => toast.error(err.code))
    }

    const navlinks = <>
        <li><NavLink to={'/'}><House className='size-4 opacity-60' /> Home</NavLink></li>
        <li><NavLink to={'/tuitions'}><BookOpen className='size-4 opacity-60' />Tuitions</NavLink></li>
        <li><NavLink to={'/tutors'}><UserRound className='size-4 opacity-60' />Tutor</NavLink></li>
        <li><NavLink to={'/about'}><Info className='size-4 opacity-60' />About</NavLink></li>
        <li><NavLink to={'/contact'}><Contact className='size-4 opacity-60' />Contact</NavLink></li>
    </>

    return (
        <div className="fixed left-0 right-0 z-50 navbar bg-base-100 shadow-sm md:px-5 lg:px-16">
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
                <Logo />
            </div>
            <div className="navbar-center hidden lg:flex navbar-ac">
                <ul className="*:hover:text-indigo-600 menu menu-horizontal px-1">
                    {
                        navlinks
                    }
                </ul>
            </div>
            <div className="navbar-end">
                {
                    !user ? <Link to={'/login'} className="btn text-white primary-clr btn-sm md:btn-md rounded-lg shadow-lg hover:scale-105 transition-all duration-300">Login / Sign up</Link> :
                        <div className="flex gap-2">
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-12 border border-black/20 rounded-full">
                                        <img
                                            alt="Profile picture"
                                            src={user.photoURL ? user?.photoURL : 'https://img.icons8.com/3d-fluent/100/user-2.png'} />
                                    </div>
                                </div>
                                <ul
                                    tabIndex="-1"
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                    <li className='px-2 font-medium text-[16px]'>{user?.displayName}</li>
                                    <li className='px-2 text-sm my-1 opacity-70'>{user?.email}</li>
                                    <div className='my-1 px-2 flex items-center gap-2 text-blue-600'>
                                        <span className='bg-blue-600 size-2 rounded-full animate-pulse'></span>
                                        <span className='font-medium'>{data?.role}</span>
                                    </div>
                                    <div className='h-0.5 m-2 bg-black/10'></div>
                                    <li><Link to={'/dashboard'} className='text-[16px]'><LayoutDashboard className='opacity-60 size-4' /> Dashboard</Link></li>
                                    <li><Link to={'/settings'} className='text-[16px]'><Settings className='opacity-60 size-4' /> Settings</Link></li>
                                    <li><button onClick={handleLogout} className='text-[16px]'><LogOut className='opacity-60 size-4' /> Logout</button></li>
                                </ul>
                            </div>
                        </div>
                }
            </div>
        </div>
    );
};

export default Navbar;