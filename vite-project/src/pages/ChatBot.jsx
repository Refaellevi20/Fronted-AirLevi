
import { useState, useRef, useEffect } from 'react'
import { ChatMessage } from '../cmps/chat bot/ChatMessage'
import { ChatInput } from '../cmps/chat bot/ChatInput'
import { IoClose } from 'react-icons/io5'
import { IoChatbubbleEllipses } from 'react-icons/io5'
import { chatbotService } from '../services/ChatBot.service'
import { useWaitingCursor } from '../CustomHook/useWaitingCursor'

export function ChatBot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        {
            text: "Hello! I'm your booking assistant. How can I help you today?",
            isBot: true
        }
    ])
    const messagesEndRef = useRef(null)
    const { setIsWaiting } = useWaitingCursor()  
    const [isLoading, setIsLoading] = useState(false)

    function scrollToBottom() {
        const chatMessages = document.querySelector('.chat-messages')
        if (chatMessages) {
            chatMessages.scrollTop = chatMessages.scrollHeight
        }
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isLoading])

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))


    async function handleSendMessage(message){
        if (!message.trim() || isLoading) return

        try {
            setIsLoading(true)
            setIsWaiting(true)
            setMessages(prev => [...prev, { text: message, isBot: false }])
            const response = await chatbotService.getChatResponse(message)
          
            await delay(2000)
            //^ another way
            // await new Promise(resolve => setTimeout(resolve, 2000))
            setMessages(prev => [...prev, { text: response, isBot: true }])

        } catch (error) {
            console.error('Chat error:', error)
            //^ another way
            // await new Promise(resolve => setTimeout(resolve, 2000))
            setMessages(prev => [...prev, {
                text: "I'm here to help! Feel free to ask any questions about booking.",
                isBot: true,
                timestamp: new Date()
            }])
        } finally {
            setIsLoading(false)
            setIsWaiting(false)
        }
    }

    return (
        <div className="chatbot-container secondary-layout">
            {!isOpen ? (
                <button
                    className="chat-toggle-btn"
                    onClick={() => setIsOpen(true)}
                >
                    <IoChatbubbleEllipses />
                    <span>Need Help?</span>
                </button>
            ) : (
                <div className=''>
                <div className="chatbot-window ">
                    <div className="chat-header">
                        <h3>Booking Assistant</h3>
                        <button
                            className="close-btn"
                            onClick={() => setIsOpen(false)}
                        >
                            <IoClose />
                        </button>
                    </div>
                    <div className="chat-messages">
                        {messages.map((msg, idx) => (
                            <ChatMessage key={idx} message={msg} />
                        ))}
                        {isLoading && (
                            <div className="typing-indicator-container">
                            <div className="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <ChatInput
                        onSendMessage={handleSendMessage}
                        isLoading={isLoading}
                    />
                </div>
                </div>
            )}
             {/* <div ref={messagesEndRef} /> */} //^ moved to line 100
        </div>
    )
}