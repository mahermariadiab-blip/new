export function WelcomeMessage() {
  return (
    <div className="relative">
      <div className="bg-red-600 text-white px-8 py-6 rounded-2xl shadow-xl max-w-4xl mx-auto">
        <p className="text-lg font-bold leading-relaxed">
          Herzlich Willkommen im Video-Reisezentrum der Deutschen Bahn.
          <br />
          Sie können mit Gebärdensprache oder Texteingabe kommunizieren.
          <br />
          Wählen Sie entsprechend aus.
        </p>
      </div>
      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] border-t-red-600"></div>
    </div>
  );
}
