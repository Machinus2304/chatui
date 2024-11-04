const chatContainer = document.getElementById("chatContainer");
const chatIcon = document.getElementById("chatIcon");

function toggleChat() {
  if (chatContainer.style.display === "none" || chatContainer.style.display === "") {
    chatContainer.style.display = "flex";
    chatIcon.classList.add("hidden");
  } else {
    chatContainer.style.display = "none";
    chatIcon.classList.remove("hidden");
  }
}

window.onload = () => {
  chatContainer.style.display = "flex";
  chatIcon.classList.add("hidden");

  setTimeout(() => {
    chatContainer.style.display = "none";
    chatIcon.classList.remove("hidden");
    chatIcon.classList.add("blink");

    setInterval(() => {
      if (chatContainer.style.display === "none") {
        chatIcon.classList.toggle("blink");
      }
    }, 5000);
  }, 2000);
};

document.getElementById("send-button").addEventListener("click", sendMessage);

function sendMessage() {
  const input = document.getElementById("chat-input").value;
  if (input.trim() === "") return;

  const userMessage = document.createElement("div");
  userMessage.className = "message user-message";
  userMessage.textContent = input;
  document.getElementById("chatBox").appendChild(userMessage);
  document.getElementById("chat-input").value = "";

  const botReply = document.createElement("div");
  botReply.className = "message bot-message";
  botReply.textContent = "Ihre Frage wird bearbeitet...";
  document.getElementById("chatBox").appendChild(botReply);
}
