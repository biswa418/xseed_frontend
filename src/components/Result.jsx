import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../hooks';

const Result = (props) => {
    const { mark, result, back } = props;
    const auth = useAuth();
    const progress = useRef(null);
    const [image, setImage] = useState('');

    useEffect(() => {
        progress.current.style.width = `${mark}%`;

        if (mark > 60) {
            setImage('https://media.tenor.com/P2DSN8uUoCIAAAAC/friends-joey.gif');
        } else {
            setImage('https://media.tenor.com/BTeSyQlKLfwAAAAd/try-one-more-time-alex.gif');
        }
    }, []);

    return (
        <div className='w-full min-h-full min-w-[60vw] max-w-[90vw] md:max-w-[65vw] 3xl:max-w-[50vw]'>
            <div className='flex w-full mt-8 flex-col min-h-[50vh] max-w-[90vw] md:max-w-[65vw] 3xl:max-w-[50vw]'>

                <h1 className='text-2xl md:text-3xl text-gray-600 font-semibold'>
                    Hi {auth?.user?.name}
                </h1>

                <p className='text-gray-500'>
                    Your score in the quiz is {mark}%
                </p>

                {/* progress bar */}
                <div className='bg-slate-300 my-2 w-full h-[5px] rounded-full'>
                    <div ref={progress} className='bg-cyan-700 rounded-full z-10 h-[5px]'>

                    </div>
                </div>

                <div className='flex justify-center min-w-[50vw] rounded-2xl overflow-hidden my-4 3xl:my-8 3xl:w-[70%] mx-auto'>
                    <img className='rounded-2xl min-w-[70vw] md:min-w-[40vw]' src={image} alt='gif' />
                </div>
            </div>
            <button className='p-2 px-4 text-white mb-8 rounded-full bg-cyan-800' onClick={() => back({ ...result, state: false })}>
                Go back
            </button>
        </div>
    )
}

export default Result