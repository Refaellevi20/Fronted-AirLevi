export function HostFooter({ currentStep, totalSteps, onBack, onNext }) {
    return (
        <footer className="host-footer">
            <div className="footer-content">
                <button
                    className="btn-back"
                    onClick={onBack}
                    style={{ visibility: currentStep === 1 ? 'hidden' : 'visible' }}
                >
                    Back
                </button>

                <button
                    className="btn-next"
                    onClick={onNext}
                >
                    {currentStep === totalSteps ? 'Publish' : 'Next'}
                </button>
            </div>
        </footer>
    )
}