import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { VideoSection } from './components/VideoSection';
import { WelcomeMessage } from './components/WelcomeMessage';
import { ActionButtons } from './components/ActionButtons';
import { OnScreenKeyboard } from './components/OnScreenKeyboard';

interface Message {
  id: string;
  text: string;
  isResponse: boolean;
}

const RESPONSE_MESSAGES = [
  'Vielen Dank für Ihre Anfrage. Wie kann ich Ihnen heute helfen?',
  'Gerne unterstütze ich Sie bei Ihrer Reisebuchung.',
  'Ich schaue das für Sie nach. Einen Moment bitte.',
  'Haben Sie bereits eine bestimmte Route im Auge?',
  'Können Sie mir mehr Details zu Ihrer Reise geben?',
  'Die beste Verbindung würde ich für Sie recherchieren.',
  'Welcher Termin passt Ihnen am besten?',
  'Sehr gerne helfe ich Ihnen weiter.',
  'Wie kann ich Sie noch unterstützen?',
  'Das ist eine gute Wahl. Möchten Sie noch etwas buchen?',
];

function App() {
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const getRandomResponse = (): string => {
    return RESPONSE_MESSAGES[Math.floor(Math.random() * RESPONSE_MESSAGES.length)];
  };

  const handleTextSubmit = (text: string) => {
    if (text.trim()) {
      const userMessageId = `user-${Date.now()}`;
      setMessages((prev) => [
        ...prev,
        { id: userMessageId, text, isResponse: false },
      ]);

      setTimeout(() => {
        const responseText = getRandomResponse();
        const responseId = `response-${Date.now()}`;
        setMessages((prev) => [
          ...prev,
          { id: responseId, text: responseText, isResponse: true },
        ]);
      }, 500);
    }
    setShowKeyboard(false);
  };

  const handleStartSignLanguage = () => {
    console.log('Sign language started');
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      <Navigation />

      <div className="flex-1 relative flex flex-col">
        <div className="flex-1 relative">
          <VideoSection showCamera={true} />
        </div>

        <div className="bg-gradient-to-t from-black/80 to-black/40 px-6 py-8 overflow-y-auto max-h-1/2">
          <div className="container mx-auto space-y-6">
            <WelcomeMessage />

            {messages.length > 0 && (
              <div className="space-y-3 max-w-4xl mx-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`${
                      message.isResponse
                        ? 'bg-red-600'
                        : 'bg-blue-600'
                    } text-white px-6 py-4 rounded-2xl shadow-lg`}
                  >
                    <p className="text-base font-semibold">{message.text}</p>
                  </div>
                ))}
              </div>
            )}

            <ActionButtons
              onTextInputClick={() => setShowKeyboard(true)}
              onSignLanguageClick={handleStartSignLanguage}
            />
          </div>
        </div>
      </div>

      {showKeyboard && (
        <OnScreenKeyboard
          onClose={() => setShowKeyboard(false)}
          onTextSubmit={handleTextSubmit}
        />
      )}
    </div>
  );
}

export default App;
