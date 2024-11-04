alert("script.js wurde geladen");
console.log("script.js wurde geladen");

console.log("script.js geladen");
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

async function sendMessage() {
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

    try {
        console.log("Vor dem API-Aufruf mit Fetch");  // Debugging Log
        const response = await fetch("https://n8n.ai-solution.org/webhook/28b891e3-bfc8-49ca-b59c-359997074752", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: message })
        });
        
        if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Antwort:", data);  // Debugging Log
        displayMessage(data.answer || "Sorry, something went wrong.", "bot-message");
    } catch (error) {
        displayMessage("Error: Could not reach the server.", "bot-message");
        console.error("Es gab einen Fehler:", error);  // Debugging Log für Fehlerdetails
    }
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
