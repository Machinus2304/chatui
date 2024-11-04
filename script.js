document.addEventListener("DOMContentLoaded", function () {
    const chatIcon = document.getElementById("chat-icon");
    const chatContainer = document.getElementById("chat-container");
    const closeChat = document.getElementById("close-chat");
    const chatBox = document.getElementById("chat-box");
    const chatInput = document.getElementById("chat-input");
    const sendButton = document.getElementById("send-button");

    // Open chat after animation
    setTimeout(() => {
        chatContainer.style.display = "block";
        chatIcon.style.display = "none";
    }, 2000); // Adjusted to delay opening for a pop-in effect

    // Show chat box on icon click and hide icon
    chatIcon.addEventListener("click", () => {
        chatContainer.style.display = "block";
        chatIcon.style.display = "none";
    });

    // Close chat box and show icon
    closeChat.addEventListener("click", () => {
        chatContainer.style.display = "none";
        chatIcon.style.display = "block";
    });

    // Send message function
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message === "") return;

        displayMessage(message, "user-message");
        chatInput.value = "";

        // Simulate bot response for demonstration
        setTimeout(() => {
            displayMessage("Hier ist eine Antwort von Jora.", "bot-message");
        }, 1000);
    }

    // Display message in chat box
    function displayMessage(text, className) {
        const messageElement = document.createElement("div");
        messageElement.className = `message ${className}`;
        messageElement.textContent = text;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Event listeners for sending messages
    sendButton.addEventListener("click", sendMessage);
    chatInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});
