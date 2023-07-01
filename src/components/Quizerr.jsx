import React, { useState } from 'react'

const Quizerr = (props) => {
    const chapter = props.chapter;
    const { setans, answers } = props;
    const [chosen, setChosen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [confirm, setConfirm] = useState(false);
    let answer;

    function handleClick(value, ques) {
        if (!answer) {
            answer = ques;
            value.target.classList.toggle('selected');
            setSelected(value.target.value);
            setConfirm(true);
        }

        if (answer !== ques) {
            value.target.classList.toggle('selected');
            setSelected(value.target.value);
            setConfirm(true);
        }
        setChosen(true);
    }

    function cancelValue() {
        setSelected(null);
        setChosen(false);
        setConfirm(false);
    }

    function confirmValue(ques) {
        setConfirm(false);

        let newAnsSet = [...answers]
        newAnsSet[ques] = selected;

        setans(newAnsSet);
    }

    return (
        <div className='bg-gray-200 px-4 md:px-10 rounded-lg'>
            <hr className='bg-cyan-900 mb-4' />

            <h2 className='text-xl tracking-wide my-2 md:my-6 md:text-3xl font-bold text-cyan-700'>
                {chapter?.name}
                {
                    chapter?.lastMod &&
                    <p className='text-xs p-2 max-w-max rounded-md bg-gray-100 md:text-xs text-gray-400 my-3 mb-0'>
                        Last modified : {`${new Date(chapter?.lastMod).getFullYear()}-0${new Date(chapter?.lastMod).getMonth() + 1}-0${new Date(chapter?.lastMod).getDate()}`}
                    </p>
                }
            </h2>
            <hr />

            <h3 className='text-lg md:text-2xl font-bold text-gray-600 my-4 md:mt-2'>
                {chapter.data?.title}
            </h3>
            <p className='text-sm md:text-lg text-gray-600 my-4'>
                {chapter.data?.about}
            </p>
            {
                chapter.data?.section.length > 0 &&
                <p className='text-gray-500 text-xs'>
                    [Click on the options A,B,C to select the answer and
                    evaluation is done in end of page.]
                </p>
            }

            {
                chapter.data?.section?.map((sec, id) => {
                    if (!chosen) {
                        return (
                            <div key={`section-${id}`} className='my-8 flex md:my-14'>
                                <button value={sec.content} onClick={(e) => handleClick(e, chapter?.question)} className='text-base hover:text-cyan-500 items-center flex md:text-xl font-semibold text-gray-600'>
                                    {sec.title}.
                                </button>
                                <p className='text-gray-500 w-full font-normal m-2 md:my-4'>
                                    &nbsp;
                                    {sec.content}
                                </p>
                            </div>
                        )
                    }
                })
            }

            {
                chosen &&
                <>
                    <div className='my-8 min-w-max md:my-14'>
                        <p className='text-gray-500 bg-gray-300 p-2 px-4 rounded-lg w-full font-normal m-2 md:my-4'>
                            Selected -
                            &nbsp;
                            {selected}
                        </p>
                    </div>
                </>
            }
            {
                confirm &&
                <>
                    <button className='p-2 px-4 text-white mb-8 rounded-full bg-cyan-800' onClick={() => confirmValue(chapter.question)}>
                        Confirm
                    </button>
                    <button className='p-2 px-4' onClick={cancelValue}>
                        Cancel
                    </button>
                </>
            }
            < hr />
        </div>
    )
}

export default Quizerr