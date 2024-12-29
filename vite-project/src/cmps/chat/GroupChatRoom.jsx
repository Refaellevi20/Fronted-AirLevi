import { useState, useEffect, useRef } from 'react'
import { socketService,
    SOCKET_EVENT_GROUP_MSG,
    SOCKET_EVENT_GROUP_MSG_REMOVE,
    SOCKET_EVENT_USER_TYPING_GROUP,
    SOCKET_EMIT_GROUP_MSG,
    SOCKET_EMIT_JOIN_GROUP,
    SOCKET_EMIT_LEAVE_GROUP,
} from '../../services/socket.service'
import { groupService } from '../../services/group.service' 
import { utilService } from '../../services/util.service'

export function GroupChatRoom({ group, loggedInUser }) {
    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState(group?.msgs || [])
    const [typingUser, setTypingUser] = useState(null)
    const chatRoomRef = useRef()

    useEffect(() => {
        if (!group) return
       
        // Set initial messages from group
        setMsgs(group.msgs || [])
       
        // Join the group chat room
        socketService.emit(SOCKET_EMIT_JOIN_GROUP, group._id)

        // Listen for socket events
        socketService.on(SOCKET_EVENT_GROUP_MSG, handleNewMessage)
        socketService.on(SOCKET_EVENT_GROUP_MSG_REMOVE, handleRemoveMessage)
        socketService.on(SOCKET_EVENT_USER_TYPING_GROUP, handleUserTyping)

        return () => {
            socketService.emit(SOCKET_EMIT_LEAVE_GROUP, group._id)
            socketService.off(SOCKET_EVENT_GROUP_MSG, handleNewMessage)
            socketService.off(SOCKET_EVENT_GROUP_MSG_REMOVE, handleRemoveMessage)
            socketService.off(SOCKET_EVENT_USER_TYPING_GROUP, handleUserTyping)
        }
    }, [group])

    useEffect(() => {
        if (chatRoomRef.current) {
            scrollToBottom(chatRoomRef.current)
        }
    }, [msgs])

    function handleNewMessage(data) {
        if (data.groupId === group._id) {
            addMsg(data.msg)
        }
    }

    function handleRemoveMessage(data) {
        if (data.groupId === group._id) {
            handleRemoveSocketMsg(data)
        }
    }

    function handleUserTyping(data) {
        if (data.groupId === group._id && data.user._id !== loggedInUser._id) {
            onSetTypingUser(data.user.fullname)
        }
    }

    function scrollToBottom(element) {
        element.scrollTop = element.scrollHeight
    }

    function handleChange(ev) {
        const { value } = ev.target
        setMsg({ txt: value })
        socketService.emit(SOCKET_EVENT_USER_TYPING_GROUP, {
            groupId: group._id,
            user: {
                _id: loggedInUser._id,
                fullname: loggedInUser.fullname
            }
        })
    }

    const handleRemoveSocketMsg = ({ msgId }) => {
        setMsgs(prevMsgs => prevMsgs.filter(msg => msg._id !== msgId))
    }

    function addMsg(newMsg) {
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
    }

    function onSetTypingUser(fullname) {
        setTypingUser(fullname)
        setTimeout(() => setTypingUser(null), 1500)
    }

    async function sendMsg(ev) {
        ev.preventDefault()
        if (!msg.txt.trim()) return

        try {
            const newMsg = {
                _id: utilService.makeId(),
                txt: msg.txt,
                by: {
                    _id: loggedInUser._id,
                    fullname: loggedInUser.fullname,
                    imgUrl: loggedInUser.imgUrl
                },
                createdAt: Date.now()
            }

            setMsg({ txt: '' })
            addMsg(newMsg)

            // Save to backend and emit to socket
            await groupService.addGroupMsg(group._id, newMsg)
            socketService.emit(SOCKET_EMIT_GROUP_MSG, {
                groupId: group._id,
                msg: newMsg
            })
        } catch (err) {
            console.error('Failed to send message:', err)
        }
    }

    async function onRemoveMsg(msgId) {
        try {
            await groupService.removeGroupMsg(group._id, msgId)
            socketService.emit(SOCKET_EVENT_GROUP_MSG_REMOVE, {
                groupId: group._id,
                msgId
            })
            handleRemoveSocketMsg({ msgId })
        } catch (err) {
            console.error('Failed to remove message:', err)
        }
    }

    if (!group) return <div>Select a group to start chatting</div>

    return (
        <section className="group-chat-room">
            <div className="group-chat-header">
                <h3>{group.name}</h3>
                <div className="member-count">
                    {group.members.length} members
                </div>
            </div>

            <div className="chat-messages" ref={chatRoomRef}>
                {msgs.map(msg => (
                    <div key={msg._id}
                         className={`msg-container ${msg.by._id === loggedInUser._id ? 'my-msg' : ''}`}>
                        <div className="msg-content">
                            <div className="msg-header">
                                <span className="msg-author">{msg.by.fullname}</span>
                                <span className="msg-time">
                                    {utilService.timeAgo(msg.createdAt)}
                                </span>
                            </div>
                            <div className="msg-text">{msg.txt}</div>
                            {msg.by._id === loggedInUser._id && (
                                <button
                                    className="remove-msg-btn"
                                    onClick={() => onRemoveMsg(msg._id)}>
                                    ×
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {typingUser && (
                <div className="typing-indicator">
                    {typingUser} is typing...
                </div>
            )}

            <form className="chat-input-form" onSubmit={sendMsg}>
                <input
                    type="text"
                    value={msg.txt}
                    onChange={handleChange}
                    placeholder="Type a message..."
                />
                <button disabled={!msg.txt.trim()} type="submit">
                    Send
                </button>
            </form>
        </section>
    )
}