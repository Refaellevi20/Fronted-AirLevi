import { useNavigate } from 'react-router-dom'
import { AppLogo } from '../app-logo'

export function HostHeader({ currentStep, totalSteps }) {
    const navigate = useNavigate()

    return (
        <header className="host-header">
            <div className="header-content">
                <button style={{border:'none',background: 'transparent'}} className="logo-btn" onClick={() => navigate('/')}>
                    <AppLogo />
                </button>
               
                <div className="step-indicator">
                    <div className="progress-container">
                        <div
                            className="progress-bar"
                            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                        ></div>
                    </div>
                </div>
                {/* <button className="exit-btn" onClick={() => navigate('/stay')}>
                    Exit
                </button> */}
            </div>
        </header>
    )
}