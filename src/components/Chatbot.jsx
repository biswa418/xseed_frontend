import React from 'react'
import { useState } from 'react'
import ChatBot from 'react-simple-chatbot';
import { Segment } from 'semantic-ui-react';


const Chatbot = () => {
    const step = [
        {
            id: 'Greet',
            message: 'Aloha and Welcome to our site (this bot is in dev and can give limited response)',
            trigger: 'Ask name'
        },
        {
            id: 'Ask name',
            message: 'Please enter your name!',
            trigger: 'waiting'
        },
        {
            id: 'waiting',
            user: true,
            trigger: 'Name'
        },
        {
            id: 'Name',
            message: 'Hi {previousValue}, how do you feel the website is? Please give any feedback.',
            trigger: 'issues'
        },
        {
            id: 'issues',
            options: [
                { value: "Great", label: "Awesome", trigger: "thanks" },
                { value: "Not good", label: "Average", trigger: "okay" }
            ]
        },
        {
            id: "thanks",
            message: "Thanks for believing in us.",
            trigger: 'next'
        },
        {
            id: "okay",
            message: "Sad to hear that! Will try to improve.",
            trigger: 'next'
        },
        {
            id: 'next',
            message: 'Please give any additional feedback.',
            trigger: 'waiting1'
        },
        {
            id: 'waiting1',
            user: true,
            trigger: 'Eval'
        },
        {
            id: 'Eval',
            message: 'Thanks, response is recorded',
            end: true
        }
    ]

    return (
        <div className="Chatbot">
            <div className='text-cyan-700' style={{ position: "fixed", left: "1rem", bottom: "13rem", height: "400px", width: "300px" }}>
                <Segment floated='left'>
                    <ChatBot steps={step} />
                </Segment>
            </div>
        </div >
    )
}

export default Chatbot