import { eventBus, showSuccessMsg  } from '../services/event-bus.service.js'
import { useState, useEffect, useRef } from 'react'
import { socketService, SOCKET_EVENT_NEW_MESSAGE, SOCKET_EVENT_ORDER_FOR_YOU, SOCKET_EVENT_ORDER_UPDATED } from "../services/socket.service.js"
import { useDispatch, useSelector } from "react-redux"


export function UserMsg() {

  const [msg, setMsg] = useState(null)
  const timeoutIdRef = useRef()
  const dispatch = useDispatch()
  console.log(msg)
  

  useEffect(() => {
    const unsubscribe = eventBus.on('show-msg', (msg) => {
      setMsg(msg)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      if (timeoutIdRef.current) {
        timeoutIdRef.current = null
        clearTimeout(timeoutIdRef.current)
      }
      timeoutIdRef.current = setTimeout(closeMsg, 3000)
    })

    socketService.on(SOCKET_EVENT_ORDER_FOR_YOU, (data) => {
      console.log(data)
      const notification = {'type': 'order', 'data': data}
      dispatch({type: 'NOTIFY', notification})
      showSuccessMsg(`New order about for you`)
    })

    socketService.on(SOCKET_EVENT_NEW_MESSAGE, (data) => {
      showSuccessMsg(`New message from ${data}`)
    })

    socketService.on(SOCKET_EVENT_ORDER_UPDATED, (data)=>{
      const notification = {'type': 'order', 'data': data}
      dispatch({type: 'NOTIFY', notification})
      showSuccessMsg(`Order status has been updated to ${data.status}`)
    })

    return () => {
      unsubscribe()
      socketService.off(SOCKET_EVENT_ORDER_FOR_YOU)
      socketService.off(SOCKET_EVENT_NEW_MESSAGE)
      socketService.off(SOCKET_EVENT_ORDER_UPDATED)
    }
  }, [])

  function closeMsg() {
    setMsg(null)
  }
  function onSetNotificaitons(notificaitons) {
    console.log(notificaitons)
  }

  if (!msg) return <span></span>
  return (
    <section className={`user-msg ${msg.type}`}>
      {msg.txt}
    </section>
  )
}