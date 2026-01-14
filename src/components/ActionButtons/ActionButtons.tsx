import React from 'react';
import './ActionButtons.scss';
import Button from '../ui/Button/Button';
import { KeyboardIcon } from '../../assets/icons/KeyboardIcon';
import { SignIcon } from '../../assets/icons/SignIcon';

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
      <Button
        text="Texteingabe"
        onClick={onTextInputClick}
        icon={<KeyboardIcon className="text-input-icon" />}
        variant="secondary"
      />
      <Button
        text="Gebärde starten"
        onClick={onSignLanguageClick}
        icon={<SignIcon className="text-input-icon" />}
        variant="primary"
      />
    </div>
  );
};

export default ActionButtons;