import React from 'react';
import './Button.scss';

interface ButtonProps {
    text: string;
    icon?: React.ReactNode;
    variant?: 'primary' | 'secondary';
    onClick?: () => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
    text,
    icon,
    variant = 'primary',
    onClick,
    className = '',
    type = 'button',
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`button ${variant} ${className}`}
        >
            {icon && <div className="button-icon">{icon}</div>}
            {text}
        </button>
    );
};

export default Button;