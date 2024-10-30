document.getElementById("send-button").addEventListener("click", sendMessage);
document.getElementById("chat-input").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {
    const inputBox = document.getElementById("chat-input");
    const message = inputBox.value.trim();

    if (message === "") return;

    displayMessage(message, "user-message");
    inputBox.value = "";

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

            // Log the error to the console for further inspection
            console.error("Es gab einen Fehler:", error);
        });
}

function displayMessage(text, className) {
    const chatBox = document.getElementById("chat-box");
    const messageElement = document.createElement("div");
    messageElement.className = `message ${className}`;
    messageElement.textContent = text;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
