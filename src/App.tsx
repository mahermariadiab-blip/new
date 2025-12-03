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
    <div className="app-container">
      <Navigation />

      <div className="flex-container">
        <div className="flex-item">
          <VideoSection showCamera={true} />
        </div>

        <div className="chat-container">
          <div className="chat-inner">
            <WelcomeMessage />

            {messages.length > 0 && (
              <div className="messages-container">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`${message.isResponse
                        ? 'message message-response'
                        : 'message message-user'
                      }`}
                  >
                    <p>{message.text}</p>
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
