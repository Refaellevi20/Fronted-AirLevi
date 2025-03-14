import React, { useState, useEffect } from 'react'
import { orderService } from '../../services/order.service'
import { utilService } from '../../services/util.service'
import EmojiModal from '../Emojis'
import { socketService,SOCKET_EVENT_REMOVE_MSG, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC, SOCKET_EMIT_USER_IS_TYPING, SOCKET_EVENT_USER_IS_TYPING, SOCKET_EMIT_REMOVE_MSG, } from '../../services/socket.service'
import { EmojiSelector } from '../EmojiMsg'
import { RiDeleteBin6Line } from "react-icons/ri";

export function ChatRoom({ order, loggedInUser }) {
    // console.log('order',order)
    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState([])
    const [typingUser, setTypingUser] = useState()
    const [isEmojiPickerOpen, setEmojiPickerOpen] = useState(false)

    function handleAddLine(emoji) {
        setMsg((prevMsg) => ({ ...prevMsg, txt: prevMsg.txt + emoji }));
    }

    async function handleRemoveMsg(msgId){
        try {
            // console.log('Starting message removal, msgId:', msgId)
            
            setMsgs(prevMsgs => {
                // console.log('Current messages:', prevMsgs)
                return prevMsgs.filter(msg => msg._id !== msgId)
            })
            
            // console.log('Calling backend with orderId:', order._id, 'msgId:', msgId)
            await orderService.removeOrderMsg(order._id, msgId)
            
            // Emit socket event
            // console.log('Emitting socket event for message removal')
            socketService.emit(SOCKET_EMIT_REMOVE_MSG, { orderId: order._id, msgId })
        } catch (err) {
            // console.error('Failed to remove message:', err)
        }
    }

    useEffect(() => {
        if (!order) return
        console.log('First message in order:', order.msgs[0])
        setMsgs([...order.msgs])
        scrollToBottom(chatRoomRef.current)
        socketService.emit(SOCKET_EMIT_SET_TOPIC, order._id)
        socketService.on(SOCKET_EVENT_USER_IS_TYPING, onSetTypingUser)
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        socketService.on(SOCKET_EVENT_REMOVE_MSG, handleRemoveSocketMsg)  

        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
            socketService.off(SOCKET_EVENT_REMOVE_MSG, handleRemoveSocketMsg)
        }
    }, [order])

    const handleRemoveSocketMsg = ({ msgId }) => {
        console.log('Received remove message socket event for msgId:', msgId)
        setMsgs(prevMsgs => prevMsgs.filter(msg => msg._id !== msgId))
    }

    function addMsg(newMsg) {
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
    }

    function onSetTypingUser(fullname) {
        setTypingUser(fullname)
        //! here add debounce
        setTimeout(() => setTypingUser(null), 1500)
    }

      async function sendMsg(ev) {
        ev.preventDefault()
        scrollToBottom(chatRoomRef.current)
        try {
            const by = loggedInUser || 'Me'
            const newMsg = { 
                _id: utilService.makeId(),  
                by, 
                txt: msg.txt,
                createdAt: Date.now()
            }
            console.log('New message being sent:', newMsg)
            
            setMsg({ txt: '' })
            
            await orderService.addOrderMsg(order._id, newMsg)
            socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
        } catch (err) {
            console.log('err', err)
        }
    }

    useEffect(() => {
        if (!order) return
        // Add IDs to any messages that don't have them
        const msgsWithIds = order.msgs.map(msg => ({
            ...msg,
            _id: msg._id || utilService.makeId()
        }))
        setMsgs(msgsWithIds)
        // ... rest of your useEffect code
    }, [order])

    function handleFormChange(ev) {
        const { name, value } = ev.target
        setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
        socketService.emit(SOCKET_EMIT_USER_IS_TYPING, loggedInUser?.fullname || 'guest')
    }

    // function handleFormChange(ev){ //* only of textarae that is working but that is also coming with a lot of defulte style 
    //     const { value } = ev.target
    //     const MAX_WORDS_PER_LINE = 10
        
    //     const lines = value.split('\n')
        
    //     const formattedLines = lines.map(line => {
    //         const words = line.split(' ').filter(word => word.trim())
            
    //         return words.reduce((acc, word, index) => {
    //             if (index > 0 && index % MAX_WORDS_PER_LINE === 0) {
    //                 return acc + '\n' + word
    //             }
    //             return acc + (index === 0 ? '' : ' ') + word
    //         }, '')
    //     })
    
    //     const formattedText = formattedLines.join('\n')
    
    //     setMsg(prevState => ({
    //         ...prevState,
    //         txt: formattedText
    //     }))
    
    //     socketService.emit(SOCKET_EMIT_USER_IS_TYPING, loggedInUser.fullname)
    // }


    const chatRoomRef = React.createRef()

    function scrollToBottom(chatRoomRef) {
        chatRoomRef.scroll({ top: (chatRoomRef.scrollHeight - 100), behavior: 'smooth' })
        // console.log(chatRoomRef.scrollHeight)
        // console.log(chatRoomRef.scrollHeight - 100)
    }

    return (
    <>
        <section className="chat-room" ref={chatRoomRef}>
        {msgs.map((msg, idx) => (
    <div key={msg._id || idx}>
        {(msg.createdAt && (idx % 3 === 0)) && 
            <div className="msg-date">{utilService.formattedDate(msg.createdAt)}</div>
        }

        <div className={`${loggedInUser?.fullname === msg.by.fullname ? 'msg-full border-buttom outgoing-msg' : 'msg-full border-buttom incoming-msg'}`}>
            <div className="msg-avatar">
                <img src={msg.by.imgUrl} alt={'avatar'} className="mini-user-img" />
            </div>

            <div className="msg-name flex ">
                {msg.by.fullname}
                {loggedInUser?.fullname === msg.by.fullname && (
                    <button 
                        className="remove-msg-btn"
                        onClick={() => {
                            handleRemoveMsg(msg._id)
                        }}
                    >
                       <RiDeleteBin6Line />
                    </button>
                )}
            </div>
            <div className="msg-txt">{msg.txt}</div>
        </div>
    </div>
))}
            {typingUser && <p>{typingUser} is typing...</p>}


        </section>
            {/* {isEmojiPickerOpen && <EmojiSelector onAddLine={handleAddLine} />} */}
        <div className='chat-input'>
            
            <form onSubmit={sendMsg} className="chat-input-form flex">
<EmojiSelector onAddLine={handleAddLine} type="bottom"/>
                <input
                    type="text" value={msg.txt} onChange={handleFormChange}
                    name="txt" autoComplete="off" className="chat-txt-input" />
                <button className='send-btn '>
                    <svg width='38' height='32' style={{ display: 'block' }}>
                        <path d='M29.3864 22.7101C29.2429 22.3073 29.0752 21.9176 28.9157 21.5565C28.6701 21.0011 28.4129 20.4446 28.1641 19.9067L28.1444 19.864C25.9255 15.0589 23.5439 10.1881 21.0659 5.38701L20.9607 5.18316C20.7079 4.69289 20.4466 4.18596 20.1784 3.68786C19.8604 3.0575 19.4745 2.4636 19.0276 1.91668C18.5245 1.31651 17.8956 0.833822 17.1853 0.502654C16.475 0.171486 15.7005 -9.83959e-05 14.9165 4.23317e-08C14.1325 9.84805e-05 13.3581 0.171877 12.6478 0.503224C11.9376 0.834571 11.3088 1.31742 10.8059 1.91771C10.3595 2.46476 9.97383 3.05853 9.65572 3.68858C9.38521 4.19115 9.12145 4.70278 8.8664 5.19757L8.76872 5.38696C6.29061 10.1884 3.90903 15.0592 1.69015 19.8639L1.65782 19.9338C1.41334 20.463 1.16057 21.0102 0.919073 21.5563C0.75949 21.9171 0.592009 22.3065 0.448355 22.7103C0.0369063 23.8104 -0.094204 24.9953 0.0668098 26.1585C0.237562 27.334 0.713008 28.4447 1.44606 29.3804C2.17911 30.3161 3.14434 31.0444 4.24614 31.4932C5.07835 31.8299 5.96818 32.002 6.86616 32C7.14824 31.9999 7.43008 31.9835 7.71027 31.9509C8.846 31.8062 9.94136 31.4366 10.9321 30.8639C12.2317 30.1338 13.5152 29.0638 14.9173 27.5348C16.3194 29.0638 17.6029 30.1338 18.9025 30.8639C19.8932 31.4367 20.9886 31.8062 22.1243 31.9509C22.4045 31.9835 22.6864 31.9999 22.9685 32C23.8664 32.002 24.7561 31.8299 25.5883 31.4932C26.6901 31.0444 27.6554 30.3161 28.3885 29.3804C29.1216 28.4447 29.5971 27.3341 29.7679 26.1585C29.9287 24.9952 29.7976 23.8103 29.3864 22.7101ZM14.9173 24.377C13.1816 22.1769 12.0678 20.1338 11.677 18.421C11.5169 17.7792 11.4791 17.1131 11.5656 16.4573C11.6339 15.9766 11.8105 15.5176 12.0821 15.1148C12.4163 14.6814 12.8458 14.3304 13.3374 14.0889C13.829 13.8475 14.3696 13.7219 14.9175 13.7219C15.4655 13.722 16.006 13.8476 16.4976 14.0892C16.9892 14.3307 17.4186 14.6817 17.7528 15.1151C18.0244 15.5181 18.201 15.9771 18.2693 16.4579C18.3556 17.114 18.3177 17.7803 18.1573 18.4223C17.7661 20.1349 16.6526 22.1774 14.9173 24.377ZM27.7406 25.8689C27.6212 26.6908 27.2887 27.4674 26.7762 28.1216C26.2636 28.7759 25.5887 29.2852 24.8183 29.599C24.0393 29.9111 23.1939 30.0217 22.3607 29.9205C21.4946 29.8089 20.6599 29.5239 19.9069 29.0824C18.7501 28.4325 17.5791 27.4348 16.2614 25.9712C18.3591 23.3846 19.669 21.0005 20.154 18.877C20.3723 17.984 20.4196 17.0579 20.2935 16.1475C20.1791 15.3632 19.8879 14.615 19.4419 13.9593C18.9194 13.2519 18.2378 12.6768 17.452 12.2805C16.6661 11.8842 15.798 11.6777 14.9175 11.6777C14.0371 11.6777 13.1689 11.8841 12.383 12.2803C11.5971 12.6765 10.9155 13.2515 10.393 13.9589C9.94707 14.6144 9.65591 15.3624 9.5414 16.1465C9.41524 17.0566 9.4623 17.9822 9.68011 18.8749C10.1648 20.9993 11.4748 23.384 13.5732 25.9714C12.2555 27.4348 11.0845 28.4325 9.92769 29.0825C9.17468 29.5239 8.34007 29.809 7.47395 29.9205C6.64065 30.0217 5.79525 29.9111 5.0162 29.599C4.24581 29.2852 3.57092 28.7759 3.05838 28.1217C2.54585 27.4674 2.21345 26.6908 2.09411 25.8689C1.97932 25.0334 2.07701 24.1825 2.37818 23.3946C2.49266 23.0728 2.62663 22.757 2.7926 22.3818C3.0274 21.851 3.27657 21.3115 3.51759 20.7898L3.54996 20.7197C5.75643 15.9419 8.12481 11.0982 10.5894 6.32294L10.6875 6.13283C10.9384 5.64601 11.1979 5.14267 11.4597 4.6563C11.7101 4.15501 12.0132 3.68171 12.3639 3.2444C12.6746 2.86903 13.0646 2.56681 13.5059 2.35934C13.9473 2.15186 14.4291 2.04426 14.9169 2.04422C15.4047 2.04418 15.8866 2.15171 16.3279 2.35911C16.7693 2.56651 17.1593 2.86867 17.4701 3.24399C17.821 3.68097 18.1242 4.15411 18.3744 4.65538C18.6338 5.13742 18.891 5.63623 19.1398 6.11858L19.2452 6.32315C21.7097 11.0979 24.078 15.9415 26.2847 20.7201L26.3046 20.7631C26.5498 21.2936 26.8033 21.8419 27.042 22.382C27.2082 22.7577 27.3424 23.0738 27.4566 23.3944C27.7576 24.1824 27.8553 25.0333 27.7406 25.8689Z'
                            fill='currentcolor'></path>
                    </svg>
                </button>
                     </form>
        </div>
    </>
    )
}

 //! update msg