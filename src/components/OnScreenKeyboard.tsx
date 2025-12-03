import { useState } from 'react';
import { X } from 'lucide-react';

interface OnScreenKeyboardProps {
  onClose: () => void;
  onTextSubmit: (text: string) => void;
}

export function OnScreenKeyboard({ onClose, onTextSubmit }: OnScreenKeyboardProps) {
  const [text, setText] = useState('');

  const keys = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P', 'Ü'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ö', 'Ä'],
    ['Y', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '-'],
  ];

  const handleKeyPress = (key: string) => {
    setText((prev) => prev + key);
  };

  const handleBackspace = () => {
    setText((prev) => prev.slice(0, -1));
  };

  const handleSpace = () => {
    setText((prev) => prev + ' ');
  };

  const handleSubmit = () => {
    onTextSubmit(text);
    setText('');
  };

  return (
    <div className="keyboard-modal">
      <div className="keyboard-container">
        <div className="keyboard-header">
          <h2 className="keyboard-title">Texteingabe</h2>
          <button
            onClick={onClose}
            className="close-button"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="text-display-container">
          <div className="text-display">
            {text || <span className="text-placeholder">Geben Sie Ihre Nachricht ein...</span>}
          </div>
        </div>

        <div className="keyboard-rows">
          {keys.map((row, rowIndex) => (
            <div key={rowIndex} className="keyboard-row">
              {row.map((key) => (
                <button
                  key={key}
                  onClick={() => handleKeyPress(key)}
                  className="key-button"
                >
                  {key}
                </button>
              ))}
            </div>
          ))}
        </div>

        <div className="keyboard-actions">
          <button
            onClick={handleBackspace}
            className="action-button-small"
          >
            ← Löschen
          </button>
          <button
            onClick={handleSpace}
            className="action-button-space"
          >
            Leertaste
          </button>
          <button
            onClick={handleSubmit}
            className="action-button-primary"
          >
            Senden
          </button>
        </div>
      </div>
    </div>
  );
}
