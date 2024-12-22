import React, { useState } from 'react'
import axios from 'axios'

function ChatBot() {
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleAskQuestion = async () => {
        if (!question) return
        setIsLoading(true)

        try {
            // Make the request to your backend, not directly to OpenAI
            const response = await axios.post('http://localhost:5000/ask-ai', { question })
            setAnswer(response.data.answer)
        } catch (error) {
            // Log the error for debugging
            console.error("Error fetching AI response:", error)
            setAnswer('Sorry, I couldn’t get an answer. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="chatbot">
            <h2>Ask Your Question</h2>
            <textarea
                placeholder="Type your question here..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />
            <button onClick={handleAskQuestion} disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Ask'}
            </button>
            {answer && <div className="answer">{answer}</div>}
        </div>
    )
}

export default ChatBot
