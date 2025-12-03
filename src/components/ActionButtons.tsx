import { Keyboard, Hand } from 'lucide-react';

interface ActionButtonsProps {
  onTextInputClick: () => void;
  onSignLanguageClick: () => void;
}

export function ActionButtons({
  onTextInputClick,
  onSignLanguageClick,
}: ActionButtonsProps) {
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
}
