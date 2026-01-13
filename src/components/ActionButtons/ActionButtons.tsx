import React from 'react';
import { Keyboard, Hand } from 'lucide-react';
import './ActionButtons.scss';

interface ActionButtonsProps {
  onTextInputClick: () => void;
  onSignLanguageClick: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onTextInputClick,
  onSignLanguageClick,
}) => {
  return (
    <div className="actions-container">
      <button
        onClick={onTextInputClick}
        className="action-button"
      >
        <Keyboard className="button-icon" />
        <span className="button-text">Texteingabe</span>
      </button>

      <button
        onClick={onSignLanguageClick}
        className="action-button"
      >
        <Hand className="button-icon" />
        <span className="button-text">Gebärde starten</span>
      </button>
    </div>
  );
};

export default ActionButtons;