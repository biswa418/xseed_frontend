import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { getContent } from '../api';
import { toast } from 'react-hot-toast';
import InfiniteScroll from 'react-infinite-scroll-component'
import { useAuth } from '../hooks';

const Math = () => {
    const [page, setPage] = useState(0);
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [end, setEnd] = useState(true);
    const auth = useAuth();

    async function callContent(page) {
        const currentContent = await getContent(page)

        if (currentContent.success) {
            setContent([...content, currentContent?.data])
        } else if (currentContent.message === 'Token is required for accessing.') {
            toast.error('Login required to the page.');
        } else if (currentContent.message === 'Invalid request, data not found') {
            setEnd(false);
        }
        else {
            toast.error(currentContent.message);
        }

        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        callContent(page);
    }, [])

    if (loading) {
        return (
            <div className='main'>
                <Loader />
            </div>
        )
    }

    return (
        <div>
            <InfiniteScroll
                dataLength={content.length}
                next={() => callContent(page)}
                hasMore={end}
                loader={<Loader />}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                {content.map((chapter) => {
                    return (
                        <p>
                            {chapter.data?.title}
                        </p>
                    )
                })}
            </InfiniteScroll>

        </div>
    )
}

export default Math