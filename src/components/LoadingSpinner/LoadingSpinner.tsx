import React from 'react';
import './LoadingSpinner.scss';

interface LoadingSpinnerProps {
    size?: 'small' | 'medium' | 'large';
    showText?: boolean;
    text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 'medium',
    showText = true,
    text = 'Antwort wird generiert...',
}) => {
    return (
        <div className="spinner-container typing">
            <div className={`spinner ${size} color`}></div>
            {showText && <span className="spinner-text">{text}</span>}
        </div>
    );
};

export default LoadingSpinner;
