import React from "react";

type SvgIcon = React.FC<React.SVGProps<SVGSVGElement>>;

interface IconButtonProps {
    icon: SvgIcon;
    onClick?: () => void;
    disabled?: boolean;
    ariaLabel: string;
    size?: number;
    className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
    icon: Icon,
    onClick,
    disabled = false,
    ariaLabel,
    size = 20,
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
            <Icon width={size} height={size} />
        </button>
    );
};

export default IconButton;