import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from './../pages/Home/Home';
import Tutors from './../pages/Tutors/Tutors';
import About from './../pages/About/About';
import Contact from './../pages/Contact/Contact';
import Tuitions from './../pages/Tuitions/Tuitions';

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
                path: '/tutors',
                Component: Tutors
            },
            {
                path: '/about',
                Component: About
            },
            {
                path: '/contact',
                Component: Contact
            },
        ]
    },
]);