import { useState, useEffect } from 'react'

export function TitleStep({ stayData, setStayData }) {
    const [title, setTitle] = useState(stayData.name || '')
    const maxLength = 50

    const handleTitleChange = (ev) => {
        const newTitle = ev.target.value
        if (newTitle.length <= maxLength) {
            setTitle(newTitle)
            setStayData({
                ...stayData,
                name: newTitle
            })
        }
    }

    return (
        <div className="title-step">
            <div className="title-container">
                <h2>Now, let's give your place a title</h2>
                <p>Short titles work best. Have fun with it—you can always change it later.</p>

                <div className="title-input-container">
                    <textarea
                        value={title}
                        onChange={handleTitleChange}
                        placeholder="Enter your title"
                        maxLength={maxLength}
                        rows={3}
                    />
                    <div className="character-count">
                        <span>{title.length}</span>/<span>{maxLength}</span>
                    </div>

                    <div className="title-preview">
                        <h3>Preview</h3>
                        <div className="preview-card">
                            {stayData.imgUrls && stayData.imgUrls[0] && (
                                <img src={stayData.imgUrls[0]} alt="Property" />
                            )}
                            <div className="preview-content">
                                <h4>{title || 'Your title will appear here'}</h4>
                                <p>Entire place · {stayData.type || 'Home'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="title-tips">
                        <h3>Listing title tips</h3>
                        <ul>
                            <li>
                                <span className="tip-icon">💡</span>
                                <span>Keep it short and catchy</span>
                            </li>
                            <li>
                                <span className="tip-icon">🏠</span>
                                <span>Highlight what makes your place unique</span>
                            </li>
                            <li>
                                <span className="tip-icon">📍</span>
                                <span>Include notable nearby locations</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}