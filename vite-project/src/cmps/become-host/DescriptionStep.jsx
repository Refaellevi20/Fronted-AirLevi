export function DescriptionStep({ stayData, setStayData }) {
    // Initialize summary if it doesn't exist
    const summary = stayData.summary || ''

    const handleDescriptionChange = (e) => {
        setStayData({
            ...stayData,
            summary: e.target.value // Using 'summary' to match your stay data structure
        })
    }

    return (
        <div className="step-content description-step">
            <div className="description-input-container">
                <h3>Create your description</h3>
                <p>Share what makes your place special.</p>
               
                <textarea
                    value={summary}
                    onChange={handleDescriptionChange}
                    placeholder="Tell guests what you love about your space and what they can expect during their stay..."
                    rows={6}
                    maxLength={500}
                    className="description-input"
                />
               
                <div className="char-counter">
                    {summary.length}/500
                </div>

                <div className="description-tips">
                    <h4>Tips for a great description:</h4>
                    <ul>
                        <li>Describe the atmosphere and style</li>
                        <li>Mention unique amenities and features</li>
                        <li>Share what's available in the neighborhood</li>
                        <li>Let guests know if you'll be available to help</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}