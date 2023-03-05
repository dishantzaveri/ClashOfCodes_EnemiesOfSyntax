import React from 'react';
import SignIn from '../components/SignIn'
import LogOut from './LogOut'
import Chating from './Chat';
import { auth } from './firebase'

import { useAuthState } from 'react-firebase-hooks/auth'
const style = {
  nav: `h-20 flex justify-between items-center p-4`,
  heading: `text-white text-3xl`,
  // appContainer: `max-w-[728px] mx-auto text-center`,

}

const NavbarFire = () => {
  const [user] = useAuthState(auth)
  console.log(user)
  return (
    // <div className={style.nav}>
    // <h1 className={style.heading}>Chat App</h1>
    <>
      {user ? <LogOut /> : <SignIn />}
    </>


    // </div>
  );
};

export default NavbarFire;
