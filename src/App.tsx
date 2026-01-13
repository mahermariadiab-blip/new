/* useEffect not needed */
import VideoSection from './components/videoSection/VideoSection';
import WelcomeMessage from './components/welcomeMessage/WelcomeMessage';
import ActionButtons from './components/actionButtons/ActionButtons';
import OnScreenKeyboard from './components/onScreenKeyboard/OnScreenKeyboard';
import LoadingSpinner from './components/loadingSpinner/LoadingSpinner';
import Navigation from './components/navigation/Navigation';
import { generateAIResponse } from './services/mockApi';
import { useAppDispatch, useAppSelector } from './store';
import { uiActions, messagesActions } from './store';

function App() {
  const dispatch = useAppDispatch();
  const showKeyboard = useAppSelector((state) => state.ui.showKeyboard);
  const messages = useAppSelector((state) => state.messages);
  const isGeneratingResponse = useAppSelector((state) => state.ui.isGeneratingResponse);



  const handleTextSubmit = async (text: string) => {
    if (!text.trim()) return;
    const userMessageId = `user-${Date.now()}`;
    dispatch(messagesActions.addMessage({ id: userMessageId, text, isResponse: false }));

    dispatch(uiActions.setShowKeyboard(false));
    dispatch(uiActions.setIsGeneratingResponse(true));

    try {
      const responseText = await generateAIResponse(text);
      const responseId = `response-${Date.now()}`;
      dispatch(messagesActions.addMessage({ id: responseId, text: responseText, isResponse: true }));
    } catch (error) {
      console.error('Error generating response:', error);
      const fallbackResponse = 'Entschuldigung, es gab einen Fehler. Bitte versuchen Sie es erneut.';
      const responseId = `response-${Date.now()}`;
      dispatch(messagesActions.addMessage({ id: responseId, text: fallbackResponse, isResponse: true }));
    } finally {
      dispatch(uiActions.setIsGeneratingResponse(false));
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
          <VideoSection />
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
              onTextInputClick={() => dispatch(uiActions.setShowKeyboard(true))}
              onSignLanguageClick={handleStartSignLanguage}
            />
          </div>
        </div>
      </div>

      {showKeyboard && (
        <OnScreenKeyboard
          onClose={() => dispatch(uiActions.setShowKeyboard(false))}
          onTextSubmit={handleTextSubmit}
        />
      )}
    </div>
  );
}

export default App;
