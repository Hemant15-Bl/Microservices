import React, { useEffect, useState } from 'react'
import { getCurrentUserDetails, isLogIn } from '../auth/Index';
import UserContext from './UserContext';

function UserProvider({children}) {

    const [user, setUser] = useState({
        data:{},
        login: false
    });

    useEffect(()=>{
        setUser({
            data:getCurrentUserDetails(),
            login:isLogIn()
        });
    },[]);
  return (
    <UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>
  )
}

export default UserProvider