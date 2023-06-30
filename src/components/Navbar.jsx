import React, { useEffect, useState } from 'react'
import { IoMenuOutline } from 'react-icons/io5'
import { GrClose } from 'react-icons/gr';
import { subjects } from '../utils/constants'
import { Fade, Slide } from 'react-awesome-reveal'
import { Toaster } from 'react-hot-toast';
import { useAuth } from '../hooks';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [openMenu, setOpenmenu] = useState(false);
    const [openSubMenu, setSubOpenmenu] = useState(false);
    const [signedIn, setsignIn] = useState(false);
    const navigate = useNavigate();
    const auth = useAuth();

    function handleChangeMenu() {
        setOpenmenu(!openMenu);
    }

    function handleSubChangeMenu(e) {
        setSubOpenmenu(!openSubMenu);
        e.classList.toggle('animateHeight');
    }

    function showContent(listtoShow, parentElement) {
        listtoShow.classList.toggle('active');
        parentElement.classList.toggle('animateHeight');
    }

    async function handleLogout() {
        auth.logout();
        setsignIn(false);

        setTimeout(() => {
            navigate('/login');
        }, 100);
    }

    useEffect(() => {
        if (auth.user) {
            setsignIn(true);
        } else {
            setsignIn(false);
        }
    }, [auth.user])

    return (
        <nav className='bg-gray-100 h-16 px-4 flex justify-between items-center'>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />

            <a href='/'>
                <div className='logo flex justify-center items-center'>
                    <img src='../logo.png' className='w-12' alt='logo' />
                    <h1 className='hidden md:block text-3xl tracking-tight font-mono font-semibold m-4 text-blue-600'>CreatiV</h1>
                </div>
            </a>

            <div className='md:flex items-center hidden'>
                <>
                    <div onClick={(e) => handleSubChangeMenu(e.target)} className='rounded-full cursor-pointer active px-4 py-2'>
                        Subjects
                    </div>

                    {
                        openSubMenu &&
                        <Fade triggerOnce className='side_menu z-20'>
                            <div className='flex flex-col items-center bg-opacity-70 bg-slate-300 backdrop-blur-lg rounded-lg text-base absolute right-10 top-16 z-50 w-[92vw] min-h-[50vh] pb-8 h-max'>
                                <ul className='w-3/4 mt-4'>
                                    {
                                        subjects.map((sub) => {
                                            return (
                                                <li key={sub.id} value={sub.id} className='my-2 flex flex-col cursor-pointer w-full rounded-md bg-slate-50'>
                                                    <div direction='right' className='w-full py-2 px-4 hover:text-white hover:bg-slate-400' onClick={(e) => showContent(e.target.nextSibling, e.target)}>
                                                        {sub.name}
                                                    </div>

                                                    <Slide direction='right'>
                                                        <ul className='text-left w-3/4 content'>
                                                            {
                                                                sub.sub.map((eachSub, id) => {
                                                                    return (
                                                                        <a key={id} href={`/${sub.name}/${eachSub}`}>
                                                                            <li className='my-1 text-slate-400 hover:text-blue-600 text-sm'>
                                                                                {eachSub}
                                                                            </li>
                                                                        </a>
                                                                    )
                                                                })
                                                            }
                                                        </ul>
                                                    </Slide>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </Fade>
                    }
                </>
                {
                    !signedIn &&
                    <>
                        <a href='/login' className='mx-3 text-blue-600'>Sign in</a>
                        <a href='/register' className='mx-3 px-3 py-2 bg-blue-600 text-white rounded-full'>Sign up</a>
                    </>
                }
                {
                    signedIn &&
                    <>
                        <div className='uppercase flex justify-center items-center mr-5'>
                            <img className='h-12 ml-5 mr-2' src='./man.png' alt='display_pic' />
                            {auth.user?.name}
                        </div>
                        <a className='mx-1 whitespace-nowrap cursor-pointer' onClick={(e) => { handleLogout() }}>Sign Out</a>
                    </>
                }
            </div>

            <div className='md:hidden flex items-center'>
                <button className='text-3xl text-gray-600'>
                    {
                        !openMenu &&
                        <IoMenuOutline onClick={handleChangeMenu} />
                    }

                    {
                        openMenu &&
                        <>
                            <GrClose onClick={handleChangeMenu} />
                            <Fade triggerOnce className='side_menu relative z-20'>
                                <div className='flex flex-col items-center bg-slate-300 backdrop-blur-lg rounded-lg text-base absolute right-0 top-5 z-50 w-[92vw] min-h-[50vh] pb-8 h-max'>
                                    <div className='w-3/4 bg-slate-500 text-white rounded-full flex justify-around p-2 mt-4'>
                                        {
                                            !signedIn &&
                                            <>
                                                <a href='/login' className='mx-1 whitespace-nowrap'>Sign in</a>
                                                |
                                                <a href='/register' className='mx-1 whitespace-nowrap'>Sign up</a>
                                            </>
                                        }

                                        {
                                            signedIn &&
                                            <>
                                                <a className='mx-1 whitespace-nowrap cursor-pointer' onClick={(e) => auth.logout()}>Sign Out</a>
                                            </>
                                        }
                                    </div>

                                    <ul className='w-3/4 mt-4'>
                                        {
                                            subjects.map((sub) => {
                                                return (
                                                    <li key={sub.id} value={sub.id} className='my-2 flex flex-col items-center  w-full rounded-md bg-slate-50'>
                                                        <div className='w-full py-2 hover:text-white hover:bg-slate-400' onClick={(e) => showContent(e.target.nextSibling, e.target)}>
                                                            {sub.name}
                                                        </div>

                                                        <ul className='text-left w-3/4 p-2 content'>
                                                            {
                                                                sub.sub.map((eachSub, id) => {
                                                                    return (
                                                                        <li key={id} className='my-1 text-slate-400 hover:text-blue-600 text-sm'>
                                                                            <a href={`/${sub.name}/${eachSub}`}>
                                                                                {eachSub}
                                                                            </a>
                                                                        </li>
                                                                    )
                                                                })
                                                            }
                                                        </ul>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>

                            </Fade>
                        </>
                    }
                </button>
            </div>

        </nav>
    )
}

export default Navbar