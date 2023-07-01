import React from 'react'
import { useState } from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

const Chatbot = () => {
    const [messages, setMessages] = useState([
        {
            message: "This chat app is in dev.. and can only give limited responses, but you can ask for addition/substraction right away!",
            sentTime: "just now",
            sender: "MyAI"
        },
        {
            message: "Hello, I'm Botie!!",
            sentTime: "just now",
            sender: "MyAI"
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = async (message) => {
        const newMessage = {
            message,
            direction: 'outgoing',
            sender: "user"
        };

        const newMessages = [...messages, newMessage];

        setMessages(newMessages);
        setIsTyping(true);
        await processToChat(newMessages);
    };

    // async function processToChat(chatMessages) {
    //     let apiMessages = chatMessages.map((messageObject) => {
    //         let role = "";
    //         if (messageObject.sender === "MyAI") {
    //             role = "assistant";
    //         } else {
    //             role = "user";
    //         }
    //         return { role: role, content: messageObject.message }
    //     });

    //     const apiRequestBody = {
    //         "model": "gpt-3.5-turbo",
    //         "messages": [
    //             systemMessage,
    //             ...apiMessages //incoming
    //         ]
    //     }

    //     // await fetch("https://api.openai.com/v1/chat/completions",
    //     //     {
    //     //         method: "POST",
    //     //         headers: {
    //     //             "Authorization": "Bearer " + API_KEY,
    //     //             "Content-Type": "application/json"
    //     //         },
    //     //         body: JSON.stringify(apiRequestBody)
    //     //     }).then((data) => {
    //     //         return data.json();
    //     //     }).then((data) => {
    //     //         console.log(data);
    //     //         setMessages([...chatMessages, {
    //     //             message: data.choices[0].message.content,
    //     //             sender: "MyAI"
    //     //         }]);
    //     //         setIsTyping(false);
    //     //     });
    // }

    return (
        <div className="Chatbot">
            <div style={{ position: "absolute", left: "1rem", bottom: "5rem", height: "400px", width: "300px" }}>
                <MainContainer className='rounded-lg' >
                    <ChatContainer>
                        <MessageList
                            scrollBehavior="smooth"
                            typingIndicator={isTyping ? <TypingIndicator content="MyAI is typing" /> : null}
                        >
                            {messages.map((message, i) => {
                                return <Message key={i} model={message} />
                            })}
                        </MessageList>
                        <MessageInput placeholder="Type message here" onSend={handleSend} />
                    </ChatContainer>
                </MainContainer>
            </div>
        </div >
    )
}

export default Chatbot