import React, { useEffect, useState, Suspense } from 'react'
import { useParams } from 'react-router-dom'
import { subjects } from '../utils'
import Page404 from './Page404';
import Coming from './Coming';
import { Loader } from '../components';
import { useAuth } from '../hooks';
import Chatbot from '../components/Chatbot';

const Math = React.lazy(() => import("../components/Math"));

const Home = () => {
    const [loading, setLoading] = useState(true);
    const { name, sub } = useParams();
    const [returnPage, setreturnPage] = useState(2);
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
            <Loader />
        )
    }

    if (returnPage === -1) {
        return <Page404 />
    } else if (returnPage === 0) {
        return <Coming />
    }

    return (
        <div className='main'>
            <Suspense fallback={
                <div className='main'>
                    <Loader />
                </div>
            }>
                <Math />
                {/* <Chatbot /> */}
            </Suspense>
        </div>
    )
}

export default Home