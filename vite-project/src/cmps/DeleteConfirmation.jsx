import { useState, useEffect } from 'react'

export function DeleteConfirmation({ onConfirm, onCancel }) {
    const [step, setStep] = useState(1)
    const [answer, setAnswer] = useState('')
    const [confirmPhrase, setConfirmPhrase] = useState('')
    const [error, setError] = useState('')
    const [mathProblem, setMathProblem] = useState({
        num1: 0,
        num2: 0,
        operation: '+',
        correctAnswer: 0
    })

    useEffect(() => {
        const num1 = Math.floor(Math.random() * 20) + 10
        const num2 = Math.floor(Math.random() * 20) + 10
        const operation = ['×', '+', '-'][Math.floor(Math.random() * 3)]
       
        let correctAnswer
        switch(operation) {
            case '×': correctAnswer = num1 * num2; break
            case '+': correctAnswer = num1 + num2; break
            case '-': correctAnswer = num1 - num2; break
            default: correctAnswer = 0
        }

        setMathProblem({ num1, num2, operation, correctAnswer })
    }, [])

   function handleSubmit(ev) {
        ev.preventDefault()
        ev.stopPropagation()
       
        if (step === 1) {
            if (parseInt(answer) === mathProblem.correctAnswer) {
                setStep(2)
                setAnswer('')
                setError('')
            } else {
                setError('Wrong answer! Please try again.')
                setAnswer('')
            }
        } else {
            if (confirmPhrase.toLowerCase() === 'yes i love u') {
                onConfirm()
            } else {
                setError('do u love me?')
                setConfirmPhrase('')
            }
        }
    }

   function handleModalClick(ev) {
        ev.preventDefault()
        ev.stopPropagation()
    }

    return (
        <div
            className="delete-confirmation-overlay"
            onClick={handleModalClick}
        >
            <div
                className="delete-confirmation-modal"
                onClick={handleModalClick}
            >
                <h2>Confirm Deletion</h2>
                {step === 1 ? (
                    <>
                        <p>To delete this stay, please solve this math problem:</p>
                        <div className="math-problem">
                            <span>{mathProblem.num1} {mathProblem.operation} {mathProblem.num2} = ?</span>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="number"
                                value={answer}
                                onChange={(ev) => {
                                    setAnswer(ev.target.value)
                                    setError('')
                                }}
                                placeholder="Enter your answer"
                                autoFocus
                                onClick={(ev) => ev.stopPropagation()}
                            />
                            {error && <div className="error-message">{error}</div>}
                            <div className="button-group">
                                <button
                                    type="submit"
                                    className="confirm-btn"
                                    onClick={(ev) => ev.stopPropagation()}
                                >
                                    Next Step
                                </button>
                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={(ev) => {
                                        ev.stopPropagation()
                                        onCancel()
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </>
                ) : (
                    <>
                        <p>Final step! do u love codding?</p>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={confirmPhrase}
                                onChange={(ev) => {
                                    setConfirmPhrase(ev.target.value)
                                    setError('')
                                }}
                                placeholder="Type the phrase"
                                autoFocus
                                onClick={(ev) => ev.stopPropagation()}
                            />
                            {error && <div className="error-message">{error}</div>}
                            <div className="button-group">
                                <button
                                    type="submit"
                                    className="confirm-btn"
                                    onClick={(ev) => ev.stopPropagation()}
                                >
                                    Confirm Delete
                                </button>
                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={(ev) => {
                                        ev.stopPropagation()
                                        onCancel()
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    )
}