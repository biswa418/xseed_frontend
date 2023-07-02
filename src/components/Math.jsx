import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import Quizerr from './Quizerr';
import { getContent } from '../api';
import { useAuth } from '../hooks'
import { toast } from 'react-hot-toast';
import InfiniteScroll from 'react-infinite-scroll-component'
import Result from './Result';

const Math = () => {
    const auth = useAuth();
    const [page, setPage] = useState(0);
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [end, setEnd] = useState(true);
    const [ans, setAns] = useState([]); //actual answer from backend
    const [currentAns, setCurrentAns] = useState([]); //user selected answers
    const [showResults, setShowResults] = useState({ state: false, result: 0 });

    async function callContent(page) {
        const currentContent = await getContent(page)

        if (currentContent.success) {
            setContent([...content, currentContent?.data])

            if (currentContent?.data?.name === 'Quiz') {
                setAns([...ans, currentContent.data?.data?.ans]);
            }
        } else if (currentContent.message === 'Token is required for accessing.') {
            setContent([...content, {
                name: 'Quiz',
                continue: false,
                data: {
                    about: "....You need to login, to access the quiz section.....",
                    title: "",
                    ans: "",
                    section: []
                }
            }])
            auth.logout();
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

    function checkAns() {
        let count = 0;

        currentAns.map((answer, id) => {
            if (answer == ans[id]) {
                count++
            }
        })

        setShowResults({ state: true, result: (count / (ans.length)) * 100 });
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

    if (showResults.state) {
        return (
            <div className='main'>
                <Result mark={showResults.result} back={setShowResults} result={showResults} />
            </div>
        )
    }

    return (
        <div className='w-full min-h-full max-w-[90vw] md:max-w-[65vw] 3xl:max-w-[50vw]'>
            <InfiniteScroll
                dataLength={content.length}
                next={() => callContent(page)}
                hasMore={end}
                loader={<div className='w-full py-2 min-h-max flex justify-center overflow-y-hidden'>
                    <Loader />
                </div>
                }
                endMessage={
                    <p className='flex flex-col mt-5' style={{ textAlign: 'center' }}>
                        <b>Yay! You have reached the end.</b>

                        {
                            auth.user &&
                            <button className='p-3 px-4 my-5 bg-cyan-800 text-white rounded-lg' onClick={checkAns}>
                                Evaluate the quiz!
                            </button>
                        }
                    </p>
                }
                className='mt-6'
            >
                {content.map((chapter, index) => {
                    return (
                        <div key={index}>
                            {
                                !chapter?.continue &&
                                chapter?.name !== 'Quiz' &&
                                <>
                                    <h2 className='text-xl tracking-wide my-2 md:my-6 md:text-3xl font-bold text-cyan-700'>
                                        {chapter?.name}
                                        {
                                            chapter?.lastMod &&
                                            <p className='text-xs p-2 max-w-max rounded-md bg-gray-200 md:text-xs text-gray-400 my-3'>
                                                Last modified : {`${new Date(chapter?.lastMod).getFullYear()}-0${new Date(chapter?.lastMod).getMonth() + 1}-0${new Date(chapter?.lastMod).getDate()}`}
                                            </p>
                                        }
                                    </h2>
                                    <hr />

                                    <h3 className='text-lg md:text-2xl font-bold text-gray-600 my-4 md:mt-8'>
                                        {chapter.data?.title}
                                    </h3>
                                    <p className='text-sm md:text-lg text-gray-600 my-4'>
                                        {chapter.data?.about}
                                    </p>

                                    {
                                        chapter.data?.video &&
                                        <div className='flex justify-center rounded-2xl overflow-hidden my-4 3xl:my-8 3xl:w-[70%] mx-auto'>
                                            <iframe width="100%"
                                                height="450"
                                                src={chapter.data?.video}
                                                frameBorder={0}
                                                type='text/plain'
                                                allowFullScreen>
                                            </iframe>
                                        </div>
                                    }
                                    {
                                        chapter.data?.section?.map((sec, id) => {
                                            return (
                                                <div key={`section-${id}`} className='my-8 md:my-14'>
                                                    <h4 className='text-base md:text-xl font-semibold text-gray-600'>
                                                        {sec.title}
                                                    </h4>
                                                    <p className='text-gray-500 my-3 md:my-4'>
                                                        {sec.content}
                                                    </p>

                                                    {
                                                        sec.media &&
                                                        <div className='flex justify-center rounded-2xl overflow-hidden my-4 3xl:my-8 3xl:w-[70%] mx-auto'>
                                                            <img className='rounded-2xl' src={sec.media} alt='gif' />
                                                        </div>
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                    < hr />
                                </>
                            }

                            {
                                !chapter?.continue &&
                                chapter?.name === 'Quiz' &&
                                <>
                                    <Quizerr chapter={chapter} setans={setCurrentAns} answers={currentAns} />
                                </>
                            }

                            {
                                chapter?.continue &&
                                <>
                                    <h3 className='text-lg md:text-2xl font-bold text-gray-600 my-4 md:mt-8'>
                                        {chapter.data?.title}
                                    </h3>
                                    <p className='text-sm md:text-lg text-gray-600'>
                                        {chapter.data?.about}
                                    </p>

                                    {
                                        chapter.data?.video &&
                                        <div className='flex justify-center rounded-2xl overflow-hidden my-4 mb-8 3xl:mb-32 3xl:w-[70%] mx-auto'>
                                            <iframe width="100%"
                                                height="480"
                                                src={chapter.data?.video}
                                                frameBorder={0}
                                                type='text/plain'
                                                allowFullScreen>
                                            </iframe>
                                        </div>
                                    }
                                    {
                                        chapter.data?.section?.map((sec, id) => {
                                            return (
                                                <div key={`section-${id}`} className='my-8 md:my-14'>
                                                    <h4 className='text-base md:text-xl font-semibold text-gray-600'>
                                                        {sec.title}
                                                    </h4>
                                                    <p className='text-gray-500 my-3 md:my-4'>
                                                        {sec.content}
                                                    </p>

                                                    {
                                                        sec.media &&
                                                        <div className='flex justify-center rounded-2xl overflow-hidden my-4 3xl:my-8 3xl:w-[70%] mx-auto'>
                                                            <img className='rounded-2xl' src={sec.media} alt='gif' />
                                                        </div>
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                </>
                            }
                        </div>
                    )
                })}
            </InfiniteScroll>

        </div>
    )
}

export default Math