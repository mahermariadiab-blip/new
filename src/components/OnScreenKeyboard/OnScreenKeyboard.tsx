import React from 'react';
import { useAppDispatch, useAppSelector, keyboardActions, uiActions } from '../../store';
import './OnScreenKeyboard.scss';
import IconButton from '../ui/IconButton/IconButton';
import { CloseIcon } from '../../assets/icons/CloseIcon';

interface OnScreenKeyboardProps {
  onClose: () => void;
  onTextSubmit: (text: string) => void;
}

const OnScreenKeyboard: React.FC<OnScreenKeyboardProps> = ({
  onClose,
  onTextSubmit,
}) => {
  const dispatch = useAppDispatch();
  const text = useAppSelector((state) => state.keyboard.text);

  const keys = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P', 'Ü'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ö', 'Ä'],
    ['Y', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '-'],
  ];

  const handleKeyPress = (key: string) => {
    dispatch(keyboardActions.appendKey(key));
  };

  const handleBackspace = () => {
    dispatch(keyboardActions.backspace());
  };

  const handleSpace = () => {
    dispatch(keyboardActions.addSpace());
  };

  const handleSubmit = () => {
    onTextSubmit(text);
    dispatch(keyboardActions.clearText());
    // close keyboard after submit
    dispatch(uiActions.setShowKeyboard(false));
  };

  return (
    <div className="keyboard-modal">
      <div className="keyboard-container">
        <div className="keyboard-header">
          <h2 className="keyboard-title">Texteingabe</h2>
          <IconButton
            icon={CloseIcon}
            ariaLabel="Edit message"
            onClick={onClose}
          />
        </div>

        <div className="text-display-container">
          <div className="text-display">
            {text || (
              <span className="text-placeholder">
                Geben Sie Ihre Nachricht ein...
              </span>
            )}
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
};

export default OnScreenKeyboard;