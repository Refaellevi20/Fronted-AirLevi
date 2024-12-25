import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FlowersAnimation } from '../cmps/FlowersAnimation'
import { AppLogo } from '../cmps/app-logo'
import { NavMenu } from './nav-menu'

export default function GamesPage() {
    const navigate = useNavigate()
    const canvasRef = useRef(null)
    const [gameOver, setGameOver] = useState(false)
    const [currentScore, setCurrentScore] = useState(0)
    const [bestScore, setBestScore] = useState(() => {
        return parseInt(localStorage.getItem('snakeGameBestScore')) || 0
    })
    const loggedInUser = useSelector((state) => state.userModule.user)
    const orders = useSelector((state) => state.orderModule.orders)
    const scoreRef = useRef({ current: 0, best: parseInt(localStorage.getItem('snakeGameBestScore')) || 0 })

    const FOOD_EMOJIS = [
        '🍎', '🍏', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑',
        '🥭', '🍍', '🥥', '🥝', '🍅', '🍋', '🍑', '🍉', '🍇', '🍊', '🍓', '🍍',
        '🥭', '🥥', '🥝', '🍎', '🍏', '🍐', '🍊', '🍋', '🍌', '🍒', '🍈', '🍑',
        '🍓', '🍇', '🍉', '🍍', '🍒', '🥝', '🥭', '🍎', '🍏', '🍐', '🍊', '🍋',
        '🍌', '🍇', '🍉', '🍓', '🍍', '🍑', '🥭', '🥥', '🥝', '🍈', '🍒', '🍇',
        '🍉', '🍊', '🍋', '🍌', '🍏', '🍐', '🍎', '🍇', '🍉', '🍓', '🍍', '🥝',
        '🥥', '🥭', '🍑', '🍒', '🍇', '🍊', '🍌', '🍋'
    ]

    useEffect(() => {
        setCurrentScore(0)

        const BLOCK_SIZE = 25
        const ROWS = 20
        const COLS = 20
        let snakeX = BLOCK_SIZE * 8
        let snakeY = BLOCK_SIZE * 8
        let velocityX = 0
        let velocityY = 0
        let snakeBody = []
        let foodX
        let foodY
        let gameInterval
        let currentFoodEmoji = FOOD_EMOJIS[Math.floor(Math.random() * FOOD_EMOJIS.length)]

        const canvas = canvasRef.current
        if (!canvas) return

        const context = canvas.getContext('2d')
        canvas.height = ROWS * BLOCK_SIZE
        canvas.width = COLS * BLOCK_SIZE

        const placeFood = () => {
            foodX = Math.floor(Math.random() * COLS) * BLOCK_SIZE
            foodY = Math.floor(Math.random() * ROWS) * BLOCK_SIZE
            currentFoodEmoji = FOOD_EMOJIS[Math.floor(Math.random() * FOOD_EMOJIS.length)]
        }

        const update = () => {
            if (gameOver) return

            context.fillStyle = "black"
            context.fillRect(0, 0, canvas.width, canvas.height)

            context.font = `${BLOCK_SIZE}px Arial`
            context.textAlign = 'center'
            context.textBaseline = 'middle'
            context.fillText(currentFoodEmoji, foodX + BLOCK_SIZE / 2, foodY + BLOCK_SIZE / 2)

            if (snakeX === foodX && snakeY === foodY) {
                snakeBody.push([foodX, foodY])
                placeFood()

                scoreRef.current.current += 10
                if (scoreRef.current.current > scoreRef.current.best) {
                    scoreRef.current.best = scoreRef.current.current
                    localStorage.setItem('snakeGameBestScore', scoreRef.current.best.toString())
                    showNewRecordMessage()
                }

                setCurrentScore(scoreRef.current.current)
                setBestScore(scoreRef.current.best)
            }

            for (let i = snakeBody.length - 1; i > 0; i--) {
                snakeBody[i] = snakeBody[i - 1]
            }
            if (snakeBody.length) {
                snakeBody[0] = [snakeX, snakeY]
            }

            context.fillStyle = "lime"
            snakeX += velocityX * BLOCK_SIZE
            snakeY += velocityY * BLOCK_SIZE
            context.fillRect(snakeX, snakeY, BLOCK_SIZE, BLOCK_SIZE)

            for (let i = 0; i < snakeBody.length; i++) {
                context.fillRect(snakeBody[i][0], snakeBody[i][1], BLOCK_SIZE, BLOCK_SIZE)
            }

            if (snakeX < 0 || snakeX >= COLS * BLOCK_SIZE ||
                snakeY < 0 || snakeY >= ROWS * BLOCK_SIZE) {
                setGameOver(true)
                clearInterval(gameInterval)
            }

            for (let i = 0; i < snakeBody.length; i++) {
                if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
                    setGameOver(true)
                    clearInterval(gameInterval)
                }
            }
        }

        const showNewRecordMessage = () => {
            const message = document.createElement('div')
            message.className = 'new-record-popup'

            // Create inner elements for better styling
            const trophy = document.createElement('span')
            trophy.className = 'trophy-icon'
            trophy.textContent = '🏆'

            const textContent = document.createElement('div')
            textContent.className = 'record-text'
            textContent.innerHTML = `
                <span class="record-title">New Record!</span>
                <span class="player-name">${loggedInUser.fullname}</span>
            `

            message.appendChild(trophy)
            message.appendChild(textContent)
            document.body.appendChild(message)

            setTimeout(() => {
                message.classList.add('fade-out')
                setTimeout(() => message.remove(), 500)
            }, 2000)
        }

        const changeDirection = (ev) => {
            if (ev.key === 'ArrowUp' && velocityY !== 1) {
                velocityX = 0
                velocityY = -1
            } else if (ev.key === 'ArrowDown' && velocityY !== -1) {
                velocityX = 0
                velocityY = 1
            } else if (ev.key === 'ArrowRight' && velocityX !== -1) {
                velocityX = 1
                velocityY = 0
            } else if (ev.key === 'ArrowLeft' && velocityX !== 1) {
                velocityX = -1
                velocityY = 0
            }
        }

        placeFood()
        document.addEventListener('keydown', changeDirection)
        gameInterval = setInterval(update, 1000 / 10)

        return () => {
            document.removeEventListener('keydown', changeDirection)
            clearInterval(gameInterval)
        }
    }, [gameOver])

    function resetGame() {
        setGameOver(false)
        scoreRef.current.current = 0
        setCurrentScore(0)
    }

    return (
        <div>
            <header className='app-header secondary-layout flex' style={{ justifyContent: 'space-between' }}>
                <div className='header-logo-container'>
                    <AppLogo />
                </div>
                <div className='spacer'></div>
                <div className='header-menu-container'>
                    <NavMenu />
                </div>
            </header>
            <div className="game-container">
                <h1>Snake Game</h1>
                <FlowersAnimation />
                <div className="score-board">
                    <div className="current-score">Score: {currentScore}</div>
                    <div className="best-score">Best: {bestScore}</div>
                </div>
                <canvas ref={canvasRef} className="game-board" />
                {gameOver && (
                    <div style={{ zIndex: '1000' }} className="game-over">
                        <h2>Game Over!</h2>
                        {currentScore === bestScore && (
                            <div className="best-score-holder">
                                {/* <span className="crown">👑</span> */}
                                <span className="player-name">{loggedInUser.fullname}</span>

                                <span className="title">New Champion! </span>
                            </div>
                        )}
                        <button onClick={resetGame}>Play Again</button>
                    </div>
                )}
            </div>
        </div>
    )
}