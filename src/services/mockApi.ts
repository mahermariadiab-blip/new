// Mock API service for generating responses
export const generateAIResponse = async (
  userMessage: string
): Promise<string> => {
  // Add delay to simulate API call - increased for better visibility
  await new Promise(
    (resolve) => setTimeout(resolve, 3000) // 3 seconds minimum
  );

  // More sophisticated mock that could analyze the user message
  const message = userMessage.toLowerCase();

  if (message.includes("zug") || message.includes("verbindung")) {
    return "Ich prüfe gerne die aktuellen Zugverbindungen für Sie. Von welchem Bahnhof möchten Sie fahren?";
  } else if (message.includes("ticket") || message.includes("karte")) {
    return "Für die Ticketbuchung benötige ich noch einige Informationen. Haben Sie bereits ein Reisedatum im Kopf?";
  } else if (message.includes("preis") || message.includes("kosten")) {
    return "Die Preise variieren je nach Verbindung und Buchungszeitpunkt. Lassen Sie mich das für Sie kalkulieren.";
  } else if (message.includes("zeit") || message.includes("wann")) {
    return "Die Fahrzeiten können je nach Verbindung variieren. Ich zeige Ihnen die schnellsten Optionen.";
  } else {
    return "Vielen Dank für Ihre Nachricht. Wie kann ich Ihnen bei Ihrer Reiseplanung konkret helfen?";
  }
};
