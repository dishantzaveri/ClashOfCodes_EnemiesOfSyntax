import React from 'react';
import NavbarFire from './Navbar';
import Chating from './Chat';

import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navbar } from '../../../components/Navbar';

const style = {
  appContainer: `max-w-[728px] mx-auto text-center shadow-4`,
  sectionContainer: `flex flex-col h-[90vh] bg-gray-100 mt-10 shadow-xl border relative`,
};

function Forum() {
  const [user] = useAuthState(auth);
  //  console.log(user)
  return (
    <>
    <Navbar/>
    <div className={style.appContainer}>
      <section className='{style.sectionContainer}'>
        {/* Navbar */}
        <NavbarFire />
        {user ? <Chating /> : null}
      </section>
    </div>
    </>
  );
}

export default Forum;
