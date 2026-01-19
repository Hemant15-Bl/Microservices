import React, { useEffect, useState } from 'react'
import UserContext from './UserContext';
import { loadUserByAuth } from '../services/User-service';

function UserProvider({ children }) {

    const [user, setUser] = useState({
        data: {},
        login: false,
        loading: true
    });

    useEffect(() => {

        const token = localStorage.getItem("access_token");

        if (!token) {
            setUser((prev) => ({ ...prev, loading: false }));
            return;
        }

        loadUserByAuth().then(userData => {
            console.log(userData);

            setUser({ data: userData, login: true, loading: false });

        }).catch(err => {
            console.log("Session is expire or invalid token!!");
            localStorage.removeItem("access_token");
            setUser({ data: null, login: false, loading: true });
        })
    }, []);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider