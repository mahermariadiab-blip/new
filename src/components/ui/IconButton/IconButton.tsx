import React from "react";
import './IconButton.scss';

type SvgIcon = React.FC<React.SVGProps<SVGSVGElement>>;

interface IconButtonProps {
    icon: SvgIcon;
    onClick?: () => void;
    disabled?: boolean;
    ariaLabel: string;
    className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
    icon: Icon,
    onClick,
    disabled = false,
    ariaLabel,
    className = "",
}) => {
    return (
        <button
            type="button"
            aria-label={ariaLabel}
            onClick={onClick}
            disabled={disabled}
            className={`icon-button ${className}`}
        >
            <Icon />
        </button>
    );
};

export default IconButton;