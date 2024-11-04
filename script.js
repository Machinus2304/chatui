document.getElementById("chat-icon").addEventListener("click", () => {
  document.getElementById("chat-container").classList.toggle("hidden");
});

document.getElementById("close-chat").addEventListener("click", () => {
  document.getElementById("chat-container").classList.add("hidden");
});

document.getElementById("send-button").addEventListener("click", sendMessage);

document.getElementById("chat-input").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});

window.onload = function () {
  displayMessage("Hallo, ich bin Jora, Ihr KI-Chatbot. Wie kann ich Ihnen helfen?", "bot-message");
};

async function sendMessage() {
  const inputBox = document.getElementById("chat-input");
  const message = inputBox.value.trim();

  if (message === "") return;

  displayMessage(message, "user-message");
  inputBox.value = "";

  try {
    const response = await fetch("https://n8n.ai-solution.org/webhook/28b891e3-bfc8-49ca-b59c-359997074752", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: message })
    });

    const data = await response.json();
    const botMessage = data.response.text || "Sorry, something went wrong.";
    displayMessage(botMessage, "bot-message");
  } catch (error) {
    displayMessage("Error: Could not reach the server.", "bot-message");
    console.error("Error:", error);
  }
}

function displayMessage(text, className) {
  const chatBox = document.getElementById("chat-box");
  const messageElement = document.createElement("div");
  messageElement.className = `message ${className}`;
  messageElement.textContent = text;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}
