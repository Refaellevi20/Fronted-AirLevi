

import { useEffect, useState } from 'react'
import { IoPersonCircle } from 'react-icons/io5'
import { RiRobot2Fill } from 'react-icons/ri'
import { TbPointFilled } from "react-icons/tb";


export function ChatMessage({ message }) {
    function formatTime(timestamp) {
        if (!timestamp) return ''
        
        if (timestamp instanceof Date) {
            return timestamp.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
            })
        }
        
        return new Date(timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
        })
    }
    return (
        <div className={`message ${message.isBot ? 'bot' : 'user'}`}>
           <div className='flex1 sds'>
             <div className="message-avatar ">
                {message.isBot ? (
                    <RiRobot2Fill className="bot-avatar" />
                ) : (
                    <IoPersonCircle className="user-avatar" />
                )}
            </div>
            <div className="message-content ">
                {message.text}
                <p></p>
               {/* <p>{'\u200B'}</p> */}
                {message.timestamp ? formatTime(message.timestamp) : formatTime(new Date())}
                </div>
                </div>
        </div>
    )
}