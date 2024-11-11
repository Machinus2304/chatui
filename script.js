document.addEventListener("DOMContentLoaded", function () {
  const chatIcon = document.getElementById("chat-icon");
  const chatContainer = document.getElementById("chat-container");
  const closeChat = document.getElementById("close-chat");
  const chatBox = document.getElementById("chat-box");
  const chatInput = document.getElementById("chat-input");
  const sendButton = document.getElementById("send-button");

  // Öffnet den Chat nach der Animation
  setTimeout(() => {
    chatContainer.classList.add("open");
    chatIcon.style.display = "none";
  }, 2000); // Wartezeit für den Pop-in-Effekt

  // Zeigt den Chat an, wenn auf das Symbol geklickt wird, und versteckt das Symbol
  chatIcon.addEventListener("click", () => {
    chatContainer.classList.add("open");
    chatIcon.style.display = "none";
  });

  // Schließt den Chat und zeigt das Symbol an
  closeChat.addEventListener("click", () => {
    chatContainer.classList.remove("open");
    chatIcon.style.display = "block";
  });

  // Event Listener für den "Send"-Button
  sendButton.addEventListener("click", sendMessage);

  // Event Listener für die Enter-Taste im Eingabefeld
  chatInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });

  async function sendMessage() {
    const message = chatInput.value.trim();

    if (message === "") return;

    displayMessage(message, "user-message");
    chatInput.value = "";

    try {
      const response = await fetch("https://n8n.ai-solution.org/webhook/28b891e3-bfc8-49ca-b59c-359997074752", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message })
      });

      const data = await response.json();
      const botMessage = data.response.text || "Entschuldigung, etwas ist schiefgelaufen.";
      displayMessage(botMessage, "bot-message");
    } catch (error) {
      displayMessage("Fehler: Konnte keine Verbindung zum Server herstellen.", "bot-message");
      console.error("Fehler:", error);
    }
  }

  function displayMessage(text, className) {
    const messageElement = document.createElement("div");
    messageElement.className = `message ${className}`;
    
    // Extrahiere den Text und die Quelle (Link) aus der Antwort
    const linkRegex = /Source Link:\s*```json\s*{.*?"source":\s*"(.*?)"\s*}```/;
    const match = text.match(linkRegex);

    if (match) {
        // Entferne den Link-Text aus der Hauptnachricht
        text = text.replace(linkRegex, "").trim();

        // Erstelle den Text-Teil der Nachricht
        const textNode = document.createTextNode(text);
        messageElement.appendChild(textNode);

        // Erstelle die Fußnote mit dem Link
        const linkElement = document.createElement("a");
        linkElement.href = match[1];
        linkElement.textContent = "Quelle";
        linkElement.target = "_blank"; // Öffne den Link in einem neuen Tab
        linkElement.className = "footnote-link";

        // Füge die Fußnote unterhalb des Textes hinzu
        const footnoteElement = document.createElement("div");
        footnoteElement.className = "footnote";
        footnoteElement.appendChild(linkElement);

        messageElement.appendChild(footnoteElement);
    } else {
        // Wenn kein Link gefunden wird, füge nur den Text hinzu
        messageElement.textContent = text;
    }

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
});
