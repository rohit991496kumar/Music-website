import React, { useState } from 'react'

import { FaCrown } from 'react-icons/fa'
import { NavLink, useNavigate } from 'react-router-dom'
import { Logo } from '../assets/img'
import { useStateValue } from '../context/StateProvider'
import { isActiveStyles, isNotActiveStyles } from '../utils/styles'

import { getAuth } from 'firebase/auth'
import { app } from '../config/firebase.config'

import { motion } from 'framer-motion'
const Header = () => {
    const [{ user }, dispatch] = useStateValue();
    const [isMenu, setIsMenu] = useState(false);

    const navigate = useNavigate()

    const logOut = () => {


        const firebaseAuth = getAuth(app);
        firebaseAuth.signOut().then(() => {
            window.localStorage.setItem("auth", "false");
        }).catch((e) => console.log(e));

        navigate("/login", { replace: true })
    }


    return (
        <header className="w-full min-w-[750px] flex items-center justify-evenly p-4 md:py-2 md:px-6
        bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600 drop-shadow">

            <NavLink to={"/"}>
                <img src={Logo} alt="Logo" className='w-14' />
            </NavLink>

            <ul className='flex items-center justify-center ml-7'>
                <li className='mx-5 text-lg'> <NavLink to={'/home'} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>Home</NavLink> </li>
                <li className='mx-5 text-lg'> <NavLink to={'/musics'} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>Musics</NavLink> </li>
                <li className='mx-5 text-lg'> <NavLink to={'/premium'} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>Premium</NavLink> </li>
                <li className='mx-5 text-lg'> <NavLink to={'/contact'} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>Contact us</NavLink> </li>

            </ul>

            <div
                onMouseEnter={() => setIsMenu(true)}
                onMouseLeave={() => setIsMenu(false)}

                className='flex items-center justify-evenly ml-auto cursor-pointer gap-2 relative '>
                <img src={user?.user.imageURL} className='w-12 min-w-[44px] object-cover rounded-full shadow-lg' alt="" />
                <div className='flex flex-col'>
                    <p className='text-textcolor text-lg hover:text-headingcolor font-semibold'>{user?.user.name}</p>
                    <p className='flex items-center gap-2 text-xs text-black-500 font-normal'>Premium Member. <FaCrown className='text-sm -ml-1 text-yellow-500 ' /> </p>
                </div>

                {isMenu && (

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className='absolute z-10 top-12 p-4 right-0 w-275 gap-2 bg-yellow-600 shadow-lg rounded-lg backdrop-blur-sm flex flex-col'>
                        <NavLink to={'/userProfile'}>
                            <p className='text-base text-white hover:font-semibold duration-150 transition-150 ease-in-out'> Profile</p>
                        </NavLink>


                        <p className='text-base text-white hover:font-semibold duration-150 transition-150 ease-in-out'> My Favourities</p>

                        <p className='text-base text-white hover:font-semibold duration-150 transition-150 ease-in-out'> My Playlist</p>

                        <hr />
                        {
                            user?.user?.role === "admin" && (
                                <>
                                    <NavLink to={"/dashboard/home"}>
                                        <p className='text-base text-white hover:font-semibold duration-150 transition-all ease-in-out'> Dashboard</p>
                                    </NavLink>
                                    <hr />
                                </>

                            )}

                        <p className='text-base text-white hover:font-semibold duration-150 transition-150 ease-in-out' onClick={logOut}> Sign out</p>

                    </motion.div>
                )}
            </div>
        </header >
    )
}

export default Header