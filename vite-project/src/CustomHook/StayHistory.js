import { useState, useEffect } from 'react'

export function useHistory() {
  const [history, setHistory] = useState(() => {

    const savedHistory = localStorage.getItem('stayHistory')
    return savedHistory ? JSON.parse(savedHistory) : []
  })

  useEffect(() => {

    localStorage.setItem('stayHistory', JSON.stringify(history))
  }, [history])

  const addStayToHistory = (stay) => {
    setHistory((prevHistory) => {
      const newHistory = [...prevHistory, stay]
      return newHistory
    })
  }

  return {
    history,
    addStayToHistory,
  }
}
