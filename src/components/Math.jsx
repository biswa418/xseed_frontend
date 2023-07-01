import React, { useEffect, useState } from 'react'
import Loader from './Loader';

const Math = () => {
    const [page, setPage] = useState(0);
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {




        setLoading(false);
    }, [])

    if (loading) {
        return (
            <Loader />
        )
    }

    return (
        <div>


        </div>
    )
}

export default Math