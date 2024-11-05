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

    // Funktion zum Senden von Nachrichten
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message === "") return;

        displayMessage(message, "user-message");
        chatInput.value = "";

        // Simuliert eine Bot-Antwort zur Demonstration
        setTimeout(() => {
            displayMessage("Hier ist eine Antwort von Jora.", "bot-message");
        }, 1000);
    }

    // Zeigt eine Nachricht im Chatfenster an
    function displayMessage(text, className) {
        const messageElement = document.createElement("div");
        messageElement.className = `message ${className}`;
        messageElement.textContent = text;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Event-Listener für das Senden von Nachrichten
    sendButton.addEventListener("click", sendMessage);
    chatInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});
