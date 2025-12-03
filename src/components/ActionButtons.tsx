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
    <div className="flex items-center justify-center gap-6">
      <button
        onClick={onTextInputClick}
        className="flex items-center gap-3 bg-white hover:bg-gray-50 border-2 border-gray-300 text-gray-800 font-bold py-4 px-8 rounded-lg shadow-lg transition-all hover:shadow-xl"
      >
        <Keyboard className="w-6 h-6" />
        <span className="text-lg">Texteingabe</span>
      </button>

      <button
        onClick={onSignLanguageClick}
        className="flex items-center gap-3 bg-white hover:bg-gray-50 border-2 border-gray-300 text-gray-800 font-bold py-4 px-8 rounded-lg shadow-lg transition-all hover:shadow-xl"
      >
        <Hand className="w-6 h-6" />
        <span className="text-lg">Gebärde starten</span>
      </button>
    </div>
  );
}
