import React from 'react';
import { Link } from 'react-router';
import { GraduationCap, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, X, Github } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-linear-to-br from-gray-900 via-blue-900 to-indigo-900 text-white">
            <div className="layout py-15">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <div className="bg-blue-500 p-2 rounded-lg">
                                <GraduationCap className="size-6 text-white" />
                            </div>
                            <span className="text-xl">e-TuitionBD</span>
                        </Link>
                        <p className="text-blue-200 mb-4">
                            Connecting passionate educators with eager learners to create meaningful learning experiences.
                        </p>
                        <div className="flex gap-3">
                            <a href="https://www.facebook.com/IGNIT3" target='_blank' className="size-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                                <Facebook className="size-5" />
                            </a>
                            <a href="https://x.com/Mimran65789385" target='_blank' className="size-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                                <X className="size-5" />
                            </a>
                            <a href="https://github.com/IGNIT3-xD" target='_blank' className="size-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                                <Github className="size-5" />
                            </a>
                            <a href="https://www.linkedin.com/in/imran-ali-mern/" target='_blank' className="size-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                                <Linkedin className="size-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-blue-200 hover:text-white transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/tuitions" className="text-blue-200 hover:text-white transition-colors">
                                    Browse Tuitions
                                </Link>
                            </li>
                            <li>
                                <Link to="/tutors" className="text-blue-200 hover:text-white transition-colors">
                                    Find Tutors
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-blue-200 hover:text-white transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-blue-200 hover:text-white transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* For Tutors */}
                    <div>
                        <h3 className="text-lg mb-4">For Tutors</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link className="text-blue-200 hover:text-white transition-colors">
                                    Become a Tutor
                                </Link>
                            </li>
                            <li>
                                <Link className="text-blue-200 hover:text-white transition-colors">
                                    Tutor Resources
                                </Link>
                            </li>
                            <li>
                                <Link className="text-blue-200 hover:text-white transition-colors">
                                    Success Stories
                                </Link>
                            </li>
                            <li>
                                <Link className="text-blue-200 hover:text-white transition-colors">
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 text-blue-200">
                                <Mail className="size-4 shrink-0" />
                                <span className="text-sm">md.imranali@gmail.com</span>
                            </li>
                            <li className="flex items-center gap-2 text-blue-200">
                                <Phone className="size-4 shrink-0" />
                                <span className="text-sm">+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-start gap-2 text-blue-200">
                                <MapPin className="size-4 shrink-0 mt-1" />
                                <span className="text-sm">1231, Narayanganj<br />Dhaka, Bangladesh</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-blue-200 text-sm">
                            © 2025 e-TuitionBD. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <a href="#" className="text-blue-200 hover:text-white transition-colors">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-blue-200 hover:text-white transition-colors">
                                Terms of Service
                            </a>
                            <a href="#" className="text-blue-200 hover:text-white transition-colors">
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Background */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        </footer>
    );
};

export default Footer;