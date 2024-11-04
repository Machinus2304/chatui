document.addEventListener("DOMContentLoaded", function () {
  const chatIcon = document.getElementById("chat-icon");
  const chatContainer = document.getElementById("chat-container");
  const closeChat = document.getElementById("close-chat");

  // Öffne den Chat nach der Animation
  setTimeout(() => {
    chatContainer.style.display = "block";
    chatIcon.style.display = "none";
    displayWelcomeMessage();
  }, 2000); // 2 Sekunden Verzögerung nach dem "Pop-in"

  // Begrüßungsnachricht von Jora anzeigen
  function displayWelcomeMessage() {
    const chatBox = document.getElementById("chat-box");
    const messageElement = document.createElement("div");
    messageElement.className = "message bot-message";
    messageElement.textContent = "Hallo, ich bin Jora, Ihr KI-Chatbot. Wie kann ich Ihnen helfen?";
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  // Chat schließen
  closeChat.addEventListener("click", () => {
    chatContainer.style.display = "none";
    chatIcon.style.display = "block";
  });
});
