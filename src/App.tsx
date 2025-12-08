import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { VideoSection } from './components/VideoSection';
import { WelcomeMessage } from './components/WelcomeMessage';
import { ActionButtons } from './components/ActionButtons';
import { OnScreenKeyboard } from './components/OnScreenKeyboard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { generateAIResponse } from './services/mockApi';

interface Message {
  id: string;
  text: string;
  isResponse: boolean;
}



function App() {
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false);



  const handleTextSubmit = async (text: string) => {
    if (text.trim()) {
      const userMessageId = `user-${Date.now()}`;
      setMessages((prev) => [
        ...prev,
        { id: userMessageId, text, isResponse: false },
      ]);

      setShowKeyboard(false);
      setIsGeneratingResponse(true);

      try {
        // Use the mock API to generate a response
        const responseText = await generateAIResponse(text);
        const responseId = `response-${Date.now()}`;

        setMessages((prev) => [
          ...prev,
          { id: responseId, text: responseText, isResponse: true },
        ]);
      } catch (error) {
        console.error('Error generating response:', error);
        // Fallback to a default response in case of error
        const fallbackResponse = 'Entschuldigung, es gab einen Fehler. Bitte versuchen Sie es erneut.';
        const responseId = `response-${Date.now()}`;

        setMessages((prev) => [
          ...prev,
          { id: responseId, text: fallbackResponse, isResponse: true },
        ]);
      } finally {
        setIsGeneratingResponse(false);
      }
    }
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

                {isGeneratingResponse && (
                  <LoadingSpinner />
                )}
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
