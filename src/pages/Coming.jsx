import React, { Suspense, useEffect, useState } from 'react'
import { Loader } from '../components';

const Soon = React.lazy(() => import("../components/Soon"));

const Coming = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className='main'>
                <Loader />
            </div>
        )
    }

    return (
        <>
            <Suspense fallback={<Loader />}>
                <Soon />
            </Suspense>
        </>
    )
}

export default Coming