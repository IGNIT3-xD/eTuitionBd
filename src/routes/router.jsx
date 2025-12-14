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
import StudentRoute from "./StudentRoute";
import TutorRoute from "./TutorRoute";
import MyApplication from "../pages/Dashboard/MyApplication";
import AppliedTutors from "../pages/Dashboard/AppliedTutors";
import PaymentSuccess from './../components/PaymentSuccess';
import PaymentCancel from './../components/PaymentCancel';
import PaymentHistory from './../pages/Dashboard/PaymentHistory';
import OnGoingTuitions from "../pages/Dashboard/OnGoingTuitions";
import TutorStats from './../pages/Dashboard/TutorStats';
import AdminRoute from './AdminRoute';
import AdminStats from "../pages/Dashboard/AdminStats";
import DashboardHomepage from "../pages/Dashboard/DashboardHomepage";
import UserManagment from './../pages/Dashboard/UserManagment';
import TuitionManagment from './../pages/Dashboard/TuitionManagment';

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
                element: <DashboardHomepage />
            },
            {
                path: '/dashboard/my-tuitions',
                element: <StudentRoute><MyTuitions /></StudentRoute>
            },
            {
                path: '/dashboard/post-tuitions',
                element: <StudentRoute><PostTuitions /></StudentRoute>
            },
            {
                path: '/dashboard/applied-tutors',
                element: <StudentRoute><AppliedTutors /></StudentRoute>
            },
            {
                path: '/dashboard/payment-history',
                element: <StudentRoute><PaymentHistory /></StudentRoute>
            },
            {
                path: '/dashboard/my-applications',
                element: <TutorRoute><MyApplication /></TutorRoute>
            },
            {
                path: '/dashboard/ongoing-tuitions',
                element: <TutorRoute><OnGoingTuitions /></TutorRoute>
            },
            {
                path: '/dashboard/payment-success',
                Component: PaymentSuccess
            },
            {
                path: '/dashboard/payment-cancel',
                Component: PaymentCancel
            },
            {
                path: '/dashboard/user-managment',
                element: <AdminRoute><UserManagment /></AdminRoute>
            },
            {
                path: '/dashboard/tuition-management',
                element: <AdminRoute><TuitionManagment /></AdminRoute>
            },
        ]
    }
]);