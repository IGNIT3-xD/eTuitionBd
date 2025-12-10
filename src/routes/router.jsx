import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from './../pages/Home/Home';
import Tutors from './../pages/Tutors/Tutors';
import About from './../pages/About/About';
import Contact from './../pages/Contact/Contact';
import Tuitions from './../pages/Tuitions/Tuitions';
import TuitionDetails from "../pages/Tuitions/TuitionDetails";
import TutorDetails from './../pages/Tutors/TutorDetails';
import AuthLayout from './../layouts/AuthLayout';
import Login from './../pages/Auth/Login';
import Register from './../pages/Auth/Register';
import PublicRoute from "./PublicRoute";
import PrivateRoute from './PrivateRoute';
import Settings from "../pages/Settings/Settings";
import DashboardLayout from "../layouts/DashboardLayout";
import MyTuitions from "../pages/Dashboard/MyTuitions";
import Homepage from "../pages/Dashboard/Homepage";
import PostTuitions from './../pages/Dashboard/PostTuitions';

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/tuitions',
                Component: Tuitions
            },
            {
                path: '/tuitions/:id',
                Component: TuitionDetails
            },
            {
                path: '/tutors',
                Component: Tutors
            },
            {
                path: '/tutors/:id',
                Component: TutorDetails
            },
            {
                path: '/about',
                Component: About
            },
            {
                path: '/contact',
                Component: Contact
            },
            {
                path: '/settings',
                element: <PrivateRoute><Settings /></PrivateRoute>
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: '/login',
                element: <PublicRoute><Login /></PublicRoute>
            },
            {
                path: '/registation',
                element: <PublicRoute><Register /></PublicRoute>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                index: true,
                element: <Homepage />
            },
            {
                path: '/dashboard/my-tuitions',
                element: <MyTuitions />
            },
            {
                path: '/dashboard/post-tuitions',
                element: <PostTuitions />
            },
        ]
    }
]);