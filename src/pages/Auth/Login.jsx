import React, { useState } from 'react';
import { Link } from 'react-router';
import { Eye, EyeClosed, Lock } from 'lucide-react';
import { useForm } from "react-hook-form"
import useAuth from './../../hooks/useAuth';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Login = () => {
    const { login, gooleLogin } = useAuth()
    const [showPass, setShowPass] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const instanceSecure = useAxiosSecure()

    const handleShowPass = (e) => {
        e.preventDefault()
        setShowPass(!showPass)
    }

    const handleLogin = (data) => {
        // console.log(data);
        login(data.email, data.pass)
            .then(() => {
                // console.log(res.user);
                toast.success("Login successfully !!")
            })
            .catch(err => toast.error(err.code))
    }

    const handleGoogleLogin = () => {
        gooleLogin()
            .then((res) => {
                const user = {
                    name: res.user.displayName,
                    email: res.user.email,
                    role: 'Student',
                    createdAt: new Date()
                }
                instanceSecure.post('/users', user)
                    .then(res => {
                        if (res.data.insertedId)
                            toast.success("Login successfully")
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => toast.error(err.code))
    }

    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
            <fieldset className="card-body">
                <div className='text-center my-4 space-y-2'>
                    <h1 className='text-xl md:text-2xl font-medium'>Welcome to <span className='primary-clr bg-clip-text text-transparent'>e-TuitionBD</span></h1>
                    <p className='text-lg md:text-xl'>Login to continue</p>
                </div>
                <form onSubmit={handleSubmit(handleLogin)} className="fieldset">
                    <label className="label">Email</label>
                    <input {...register('email', { required: true })} type="email" className="input w-full" placeholder="Email" />
                    {
                        errors.email?.type === 'required' && <p className='text-red-600'>*Email is required</p>
                    }

                    <label className="label">Password</label>
                    <div className='relative'>
                        <input {...register('pass', { required: true })} type={showPass ? "text" : "password"} className="input w-full" placeholder="Password" />
                        <button onClick={handleShowPass}>{showPass ? <EyeClosed className='opacity-70 cursor-pointer size-5 absolute right-4 top-2.5' /> : <Eye className='opacity-70 cursor-pointer size-5 absolute right-4 top-2.5' />}</button>
                    </div>
                    {
                        errors.pass?.type === 'required' && <p className='text-red-600'>*Password is required</p>
                    }

                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn primary-clr text-white on-hover mt-4">Login</button>
                </form>
                <div className='divider'>or</div>
                <button onClick={handleGoogleLogin} className="btn bg-white text-black border-[#e5e5e5]">
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                    Login with Google
                </button>
                <p className='text-indigo-500 font-medium text-center py-3'>Didn't have an account <Link to={'/registation'} className='hover:underline underline-offset-4'>Create Now !!</Link></p>
            </fieldset>
        </div>
    );
};

export default Login;