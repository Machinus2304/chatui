// Event Listener für den "Send"-Button
document.getElementById("send-button").addEventListener("click", () => {
    console.log("Send-Button wurde geklickt");
    sendMessage();
});

// Event Listener für die Enter-Taste im Eingabefeld
document.getElementById("chat-input").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        console.log("Enter-Taste gedrückt");
        sendMessage();
    }
});

function sendMessage() {
    console.log("sendMessage function gestartet");  // Debugging Log

    const inputBox = document.getElementById("chat-input");
    const message = inputBox.value.trim();

    if (message === "") {
        console.log("Leere Nachricht, nichts zu senden");  // Debugging Log
        return;
    }

    displayMessage(message, "user-message");
    inputBox.value = "";
    console.log("Nachricht an displayMessage gesendet:", message);  // Debugging Log

    // API Call to n8n Webhook
    axios.post("https://n8n.ai-solution.org/webhook/28b891e3-bfc8-49ca-b59c-359997074752", { message })
        .then(response => {
            // Log the full response to see what we get back
            console.log("API Antwort:", response);

            // Extract the message from the response data and display it
            const botMessage = response.data.answer || "Sorry, something went wrong.";
            displayMessage(botMessage, "bot-message");
        })
        .catch(error => {
            // Display a user-friendly error message
            displayMessage("Error: Could not reach the server.", "bot-message");

            // Log detailed error information
            console.error("Es gab einen Fehler:", error);
            if (error.response) {
                console.error("Status Code:", error.response.status);
                console.error("Headers:", error.response.headers);
                console.error("Data:", error.response.data);
            } else if (error.request) {
                console.error("Die Anfrage wurde gesendet, aber keine Antwort erhalten:", error.request);
            } else {
                console.error("Fehler beim Anfragenaufbau:", error.message);
            }
        });
}

function displayMessage(text, className) {
    console.log("displayMessage aufgerufen mit Text:", text);  // Debugging Log
    const chatBox = document.getElementById("chat-box");
    const messageElement = document.createElement("div");
    messageElement.className = `message ${className}`;
    messageElement.textContent = text;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
