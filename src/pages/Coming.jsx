import React, { Suspense, useEffect, useState } from 'react'
import { Loader } from '../components';

const Soon = React.lazy(() => import("./Soon"));

const Coming = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <Loader />
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