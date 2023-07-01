import React from 'react'

const Soon = () => {
    return (
        <>
            <div className='relative bg main min-h-screen min-w-full bg-gradient-to-b from-pink-300 to-cyan-500'>
                <h1 className='text-4xl text-pink-700 font-bold uppercase'>
                    Coming soon!
                </h1>

            </div>
            <p className='absolute mt-24 text-slate-500 -ml-40 top-1/2 left-1/2'>
                Meanwhile you can go to ... &nbsp;
                <a href='/Interactive%20Math/Math%204' className='text-sm text-pink-600'>
                    Math 4 Section
                </a>
            </p>

            <div className="ocean">
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
            </div>
        </>
    )
}

export default Soon