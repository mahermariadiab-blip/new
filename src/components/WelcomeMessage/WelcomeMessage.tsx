import React from 'react';
import './WelcomeMessage.scss';

const WelcomeMessage: React.FC = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-message">
        <p className="welcome-text">
          Herzlich Willkommen im Video-Reisezentrum der Deutschen Bahn.
          Sie können mit Gebärdensprache oder Texteingabe kommunizieren.
          Wählen Sie entsprechend aus.
        </p>
      </div>
      <div className="welcome-arrow" />
    </div>
  );
};

export default WelcomeMessage;