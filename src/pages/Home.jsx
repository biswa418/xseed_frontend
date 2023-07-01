import React, { useEffect, useState, Suspense } from 'react'
import { useParams } from 'react-router-dom'
import { subjects } from '../utils'
import Page404 from './Page404';
import Coming from './Coming';
import { Loader } from '../components';
import { useAuth } from '../hooks';
import Chatbot from '../components/Chatbot';
import { BsRobot } from 'react-icons/bs';

const Math = React.lazy(() => import("../components/Math"));

const Home = () => {
    const [loading, setLoading] = useState(true);
    const { name, sub } = useParams();
    const [returnPage, setreturnPage] = useState(2);
    const [bot, showBot] = useState(false);
    const auth = useAuth();

    useEffect(() => {
        let found = subjects.filter((eachTopic) => {
            return eachTopic.name === name;
        })[0]

        setLoading(false);

        if (found) {
            let index = found["sub"].indexOf(sub);

            if (index === -1) {
                setreturnPage(-1);
            } else if (name !== 'Interactive Math' || index > 0) {
                setreturnPage(0);
            }
        } else {
            if (!name && !sub) {
                setreturnPage(1);
            } else {
                setreturnPage(-1);
            }
        }
    }, [])

    if (loading) {
        return (
            <div className='main'>
                <Loader />
            </div>
        )
    }

    if (returnPage === -1) {
        return <Page404 />
    } else if (returnPage === 0) {
        return <Coming />
    }

    return (
        <div className='min-h-[90vh] mx-auto flex flex-col items-center'>
            <Suspense fallback={
                <div className='main'>
                    <Loader />
                </div>
            }>

                <h1 className='text-lg font-medium min-w-max w-full text-center p-4 bg-gradient-to-tr from-blue-700 to-cyan-700  text-white whitespace-nowrap md:text-3xl'>
                    Chapter 4 - Addition and Subtraction
                </h1>
                {
                    bot &&
                    <Chatbot />
                }

                <button onClick={() => showBot(!bot)} className='fixed left-2 bottom-2 p-4 z-30 m-2 text-2xl bg-cyan-700 text-white rounded-full'>
                    <BsRobot />
                </button>
                <Math />
            </Suspense>
        </div>
    )
}

export default Home