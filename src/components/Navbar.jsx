import React, { useState } from 'react'
import { IoMenuOutline } from 'react-icons/io5'
import { GrClose } from 'react-icons/gr';


const Navbar = () => {
    const [openMenu, setOpenmenu] = useState(false);

    function handleChangeMenu() {
        setOpenmenu(!openMenu);
    }

    return (
        <nav className='bg-gray-100 h-16 px-4 flex justify-between items-center'>
            <div className='logo flex justify-center items-center'>
                <img src='./logo.png' className='w-12' alt='logo' />
                <h1 className='hidden md:block text-3xl tracking-tight font-mono font-semibold m-4 text-blue-600'>CreatiV</h1>
            </div>


            <div className='md:block hidden'>
                <a href='/login' className='mx-3 text-blue-600'>Sign in</a>
                <a href='/register' className='mx-3 px-3 py-2 bg-blue-600 text-white rounded-full'>Sign up</a>
            </div>

            <div className='md:hidden flex items-center'>
                <button className='text-3xl text-gray-600' onClick={handleChangeMenu}>
                    {
                        !openMenu &&
                        <IoMenuOutline />
                    }

                    {
                        openMenu &&
                        <>
                            <GrClose />
                            <div className='side_menu relative'>
                                <div className='flex flex-col items-center bg-slate-300 backdrop-blur-lg rounded-lg text-base absolute right-0 top-5 z-50 w-[92vw] h-[50vh]'>
                                    <div className='w-3/4 bg-slate-500 text-white rounded-full flex justify-around p-2 mt-4'>
                                        <a href='/login' className='mx-1 whitespace-nowrap'>Sign in</a>
                                        |
                                        <a href='/register' className='mx-1 whitespace-nowrap'>Sign up</a>
                                    </div>

                                    <ul>
                                        {/* to be added later */}
                                    </ul>
                                </div>
                            </div>
                        </>
                    }
                </button>
            </div>

        </nav>
    )
}

export default Navbar