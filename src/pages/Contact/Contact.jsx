import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    return (
        <div className='bg-gray-50 py-16'>
            <div className="primary-clr text-white py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-white my-3 text-2xl md:text-3xl font-medium">Get In Touch</h1>
                    <p className="text-xl text-blue-100">
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>
            </div>
            <div className='layout py-16'>
                <div className='grid lg:grid-cols-3 gap-8'>
                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm p-8">
                            <h2 className="text-gray-900 mb-6 text-xl md:text-2xl">Send us a message</h2>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm text-gray-700 mb-2">First Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Mohmammed"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-700 mb-2">Last Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Ali"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="your_mail@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-700 mb-2">Subject</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="How can we help?"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-700 mb-2">Message</label>
                                    <textarea
                                        rows={6}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                        placeholder="Tell us more about your inquiry..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Send className="size-4" />
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                    {/* Contact info */}
                    <div className='space-y-6'>
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="inline-flex items-center justify-center size-12 bg-blue-100 rounded-lg mb-4">
                                <Mail className="size-6 text-blue-600" />
                            </div>
                            <h3 className="text-gray-900 mb-2 text-lg md:text-xl">Email</h3>
                            <p className="text-gray-600">md.imranali2046@gmail.com</p>
                            <p className="text-gray-600">info@etuitionbd.com</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="inline-flex items-center justify-center size-12 bg-blue-100 rounded-lg mb-4">
                                <Phone className="size-6 text-blue-600" />
                            </div>
                            <h3 className="text-gray-900 mb-2 text-lg md:text-xl">Phone</h3>
                            <p className="text-gray-600">+1 (555) 123-4567</p>
                            <p className="text-gray-600">Mon-Fri 9am-6pm BDT</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="inline-flex items-center justify-center size-12 bg-blue-100 rounded-lg mb-4">
                                <MapPin className="size-6 text-blue-600" />
                            </div>
                            <h3 className="text-gray-900 mb-2 text-lg md:text-xl">Office</h3>
                            <p className="text-gray-600">
                                1231 Narayanganj<br />
                                Dhaka<br />
                                Bangladesh
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;