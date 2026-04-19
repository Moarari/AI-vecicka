async function sendMessage() {
    const input = document.getElementById("input");
    const chat = document.getElementById("chat");

    const text = input.value;
    if (!text) return;

    chat.innerHTML += `<p><b>Ty:</b> ${text}</p>`;
    input.value = "";

    const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
    });

    const data = await response.json();
    chat.innerHTML += `<p><b>AI:</b> ${data.reply}</p>`;
}
