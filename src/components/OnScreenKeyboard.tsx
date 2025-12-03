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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Texteingabe</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6">
          <div className="bg-gray-100 rounded-lg p-4 min-h-[80px] text-xl text-gray-800 break-words">
            {text || <span className="text-gray-400">Geben Sie Ihre Nachricht ein...</span>}
          </div>
        </div>

        <div className="space-y-2 mb-4">
          {keys.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-2">
              {row.map((key) => (
                <button
                  key={key}
                  onClick={() => handleKeyPress(key)}
                  className="bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-gray-800 font-semibold py-3 px-4 rounded-lg min-w-[50px] transition-colors"
                >
                  {key}
                </button>
              ))}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleBackspace}
            className="bg-gray-300 hover:bg-gray-400 active:bg-gray-500 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            ← Löschen
          </button>
          <button
            onClick={handleSpace}
            className="bg-gray-300 hover:bg-gray-400 active:bg-gray-500 text-gray-800 font-semibold py-3 px-8 rounded-lg flex-1 transition-colors"
          >
            Leertaste
          </button>
          <button
            onClick={handleSubmit}
            className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Senden
          </button>
        </div>
      </div>
    </div>
  );
}
