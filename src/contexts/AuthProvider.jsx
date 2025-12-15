import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, deleteUser, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from '../firebase.config';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const provider = new GoogleAuthProvider()

    const signup = (email, pass) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, pass)
    }

    const login = (email, pass) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, pass)
    }

    const logout = () => {
        return signOut(auth)
    }

    const gooleLogin = () => {
        return signInWithPopup(auth, provider)
    }

    const updateUser = (profile) => {
        return updateProfile(auth.currentUser, profile)
    }

    const deleteProfile = (profile) => {
        return deleteUser(auth.currentUser, profile)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currUser) => {
            setUser(currUser)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    // console.log(user);

    const authInfo = {
        loading,
        signup,
        login,
        logout,
        gooleLogin,
        updateUser,
        deleteProfile,
        user,
        setUser,
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;