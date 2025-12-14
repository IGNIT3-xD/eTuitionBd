import React from 'react';
import Logo from './../components/Logo';
import useRole from '../hooks/useRole';
import Loading from './../components/Loading';
import { Outlet, Link, NavLink } from 'react-router';
import { Book, BookOpenCheck, ChartNoAxesCombined, Landmark, ListCheck, PencilRuler, Plus, UserRoundCog } from 'lucide-react';

const DashboardLayout = () => {
    const { role, isLoading } = useRole()
    // console.log(role);

    if (isLoading) return <Loading />

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <nav className="navbar w-full bg-base-300">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost lg:hidden">
                        {/* Sidebar toggle icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                    </label>
                    <div className="px-4"><Logo /></div>
                </nav>
                {/* Page content here */}
                <div className=''>
                    <Outlet />
                </div>
            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                    {/* Sidebar content here */}
                    <ul className="menu w-full grow dash-nav space-y-2">
                        {/* List item */}
                        <li>
                            <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                {/* Sidebar toggle icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                            </label>
                        </li>
                        {
                            role === 'Student' && <>
                                <li>
                                    <NavLink to={'/dashboard/my-tuitions'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Tuitions">
                                        <Book className='size-4' />
                                        <span className="is-drawer-close:hidden">My Tuitions</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/dashboard/post-tuitions'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Post A Tuition">
                                        <Plus className='size-4' />
                                        <span className="is-drawer-close:hidden">Post A Tuition</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/dashboard/applied-tutors'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Applied Tutors">
                                        <ListCheck className='size-4' />
                                        <span className="is-drawer-close:hidden">Applied Tutors</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/dashboard/payment-history'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Payment History">
                                        <Landmark className='size-4' />
                                        <span className="is-drawer-close:hidden">Payment History</span>
                                    </NavLink>
                                </li>
                            </>
                        }
                        {
                            role === 'Tutor' && <>
                                <li>
                                    <NavLink to={'/dashboard'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Tutor Stats">
                                        {/* Home icon */}
                                        <ChartNoAxesCombined className='size-4' />
                                        <span className="is-drawer-close:hidden">Tutor Stats</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to={'/dashboard/my-applications'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Applications">
                                        <BookOpenCheck className='size-4' />
                                        <span className="is-drawer-close:hidden">My Applications</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/dashboard/ongoing-tuitions'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Ongoing Tuitions">
                                        <PencilRuler className='size-4' />
                                        <span className="is-drawer-close:hidden">Ongoing Tuitions</span>
                                    </NavLink>
                                </li>
                            </>
                        }

                        {
                            role === 'Admin' && <>
                                <li>
                                    <NavLink to={'/dashboard'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Report & Stats">
                                        <ChartNoAxesCombined className='size-4' />
                                        <span className="is-drawer-close:hidden">Report & Stats</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to={'/dashboard/user-managment'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Users managment">
                                        <UserRoundCog className='size-4' />
                                        <span className="is-drawer-close:hidden">Users managment</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to={'/dashboard/tuition-management'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Tuition Management">
                                        {/* Home icon */}
                                        <BookOpenCheck className='size-4' />
                                        <span className="is-drawer-close:hidden">Tuition Management</span>
                                    </NavLink>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;